import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/user.js";
import nodemailer from "nodemailer";
import otpModel from "../models/otp.js";


export const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            // 404 Not Found: User not found
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // 401 Unauthorized: Invalid credentials
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        
        const token = createToken(user._id);
        // 200 OK: Successful login
        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error, "error check");
        // 500 Internal Server Error: General server error
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const allowedDomains = ["gmail.com", "yahoo.com", "ymail.com"];

// Signup function
export const signup = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const domain = email.split("@")[1];
        if (!allowedDomains.includes(domain)) {
            return res.status(400).json({ success: false, message: "Only Gmail, Yahoo, or Ymail addresses are allowed" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPass });
        const user = await newUser.save();

        const token = createToken(user._id);
        return res.status(201).json({ success: true, token });

    } catch (error) {
        console.error(error, "error check");
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const requestOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        await otpModel.findOneAndUpdate(
            { email },
            { otp, expiresAt },
            { upsert: true, new: true }
          );
        // ✅ Replace this with your actual SMTP credentials
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "diksha2000may@gmail.com", // your Gmail
                pass: "kplqxveeqlkeybpj", // app password
            },
        });

        console.log(transporter, "transportertransporter")

        await transporter.sendMail({
            to: email,
            subject: "Your OTP",
            html: `<h3>Your OTP is: ${otp}</h3>`,
        });

        res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
};


// In /controllers/auth.js
export const verifyOtp = async (req, res) => {
    console.log(req.body.otp, "checking otp ")

    const { name, email, password, otp } = req.body;

    // Check stored OTP
    const record = await otpModel.findOne({ email });
    console.log(record, "record check", req.body.otp, String(req.body.otp))

    if (!record || String(record.otp) !== String(req.body.otp)) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  
    if (record.expiresAt < new Date()) {
        return res.status(400).json({ success: false, message: "OTP expired" });
    }
  
  // Proceed with user creation
  await otpModel.deleteOne({ email }); // Optional: clean up

    const domain = email.split("@")[1];
        if (!allowedDomains.includes(domain)) {
            return res.status(400).json({ success: false, message: "Only Gmail, Yahoo, or Ymail addresses are allowed" });
        }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Weak password" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPass });
        const user = await newUser.save();
        const token = createToken(user._id);

        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const verifyResetOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const record = await otpModel.findOne({ email });
  
      if (!record || String(record.otp) !== String(otp)) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }
  
      if (record.expiresAt < new Date()) {
        return res.status(400).json({ success: false, message: "OTP expired" });
      }
  
      // OTP verified successfully
      return res.status(200).json({ success: true, message: "OTP verified" });
    } catch (err) {
      console.error("OTP verification failed:", err);
      return res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };
  


export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    console.log(email, newPassword, "email, newPassword")
    try {
      const user = await userModel.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(newPassword, salt);
      await userModel.updateOne({ email }, { password: hashedPass });
  
      await otpModel.deleteOne({ email }); // clean up
  
      res.json({ success: true, message: "Password reset successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to reset password" });
    }
  };
  
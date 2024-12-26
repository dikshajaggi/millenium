import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/user.js";

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

export const signup = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            // 409 Conflict: User already exists
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            // 400 Bad Request: Invalid email format
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            console.log("Weak password - Setting status to 400");
            // 400 Bad Request: Weak password
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);

            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPass,
            });

            const user = await newUser.save();
            const token = createToken(user._id);
            console.log("Weak password -");

            // 201 Created: User successfully created
            return res.status(201).json({ success: true, token });
        }
    } catch (error) {
        console.error(error, "error check");
        // 500 Internal Server Error: General server error
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

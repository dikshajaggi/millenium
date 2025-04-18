import orderModel from "../models/order.js";
import userModel from "../models/user.js";
import nodemailer from "nodemailer";


export const placeOrder = async (req, res) => {
  const { userid, items, amount, address } = req.body
  try {
    const user = await userModel.findById(userid);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const customerName = user.name;
    const customerEmail = user.email;

    const order = new orderModel({
      userid,
      items,
      amount,
      address,
    })

    await order.save()
    await userModel.findByIdAndUpdate(userid, { cartData: {} })

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "diksha2000may@gmail.com", // Replace with your admin Gmail
    //     pass: process.env.GMAIL_APP_PASS,  // Use app-specific password
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465, // Use 587 if 465 doesn't work
      secure: true, // true for port 465, false for 587
      auth: {
        user: "info@dwarkaorthodontics.com", // your Hostinger email
        pass: process.env.HOSTINGER_APP_PASS, // the password you set for that email
      },
    });

    // Prepare email content
    const orderSummary = `
            <h2>Order Confirmation</h2>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Amount:</strong> ₹${amount}</p>
            <h4>Shipping Address:</h4>
            <p>
                ${address.firstName} ${address.lastName}<br>
                ${address.street}<br>
                ${address.city}, ${address.state} - ${address.pincode}<br>
                Phone: ${address.phone}<br>
                Email: ${address.email}
            </p>
            <h4>Items:</h4>
            <ul>
              ${items.map((item) => `<li>${item.name} - Qty: ${item.qty}</li>`).join("")}
            </ul>
          `;

    // Send email to Admin
    await transporter.sendMail({
      from: "info@dwarkaorthodontics.com",
      to: "info@dwarkaorthodontics.com", // Replace with your admin's email
      subject: `New Order Placed ${customerName}`,
      html: orderSummary,
    });

    //  email to Customer
    await transporter.sendMail({
      from: "info@dwarkaorthodontics.com",
      to: customerEmail,
      subject: "Your Order Confirmation",
      html: `<p>Hi ${user.name},</p>` + orderSummary + `<p>Thank you for your order!</p>`,
    });


    return res.json({ success: true, message: "order placed successfully" })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: "error" })
  }
}


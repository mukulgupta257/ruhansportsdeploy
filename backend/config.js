import dotenv from 'dotenv'

dotenv.config();

export default {
    PORT:process.env.port||8080,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    mail_auth: process.env.mail_auth,
    Razorpay_KEY_ID:process.env.Razorpay_KEY_ID,
    Razorpay_KEY_SECRET:process.env.Razorpay_KEY_SECRET,
}

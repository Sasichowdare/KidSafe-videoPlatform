import pool from "../configs/database.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js"; // Assuming you have a utility function to send emails

// Step 1: Request Password Reset
const requestPasswordReset = async (req, res) => {
    try {
        const {email} = req.body;

        const user =await pool.query('SELECT * FROM users WHERE email=$1',[email]);

        if(user.rows.length===0){
            return res.status(400).json({message:'user not found'});
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiration = new Date(Date.now()+900000);     //
        // const expirationTime = 15; // in minutes
        // const tokenExpiration = new Date(Date.now() + expirationTime * 60 * 1000);
        
        await pool.query('UPDATE users SET reset_token = $1 ,reset_token_expiration = $2 WHERE email= $3 ',
            [resetToken,tokenExpiration,email]
        );

        //send the email 
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await sendEmail(
            email,
            'Password Reset Request',
            `<p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>`
        );
        res.json({ message: 'Password reset link sent to your email' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Step 2: Reset Password
const resetPassword = async (req, res) => {
    try {
        const {token,newPassword} = req.body;

        // Find user by reset token
        const user = await pool.query(
            'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiration > NOW()',
            [token]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password and remove reset token
        await pool.query(
            'UPDATE users SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = $2',
            [hashedPassword, token]
        );

        res.json({ message: 'Password reset successful' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { requestPasswordReset, resetPassword };
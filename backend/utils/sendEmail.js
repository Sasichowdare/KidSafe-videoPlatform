import nodemailer from 'nodemailer';

const sendEmail = async(to,subject,html)=>{
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from :process.env.EMAIL_USER,
            to,
            html,
        };
  
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.response}`);

        return { success: true, message: "Email sent successfully" };
    } 
    catch (error){
            console.error(`❌ Email error: ${error.message}`);
            return { success: false, message: "Failed to send email" };
        }
};

export default sendEmail;
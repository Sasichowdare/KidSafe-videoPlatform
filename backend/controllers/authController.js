import pool from "../configs/database.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async(req, res) => {
    try{
        const {name,email,password}=req.body;

        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [name]); //Checking if the user already exists in the database with the given username.
        const emailExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);  //Checking if the user already exists in the database with the given email.
        if(userExists.rows.length >0)  
            {
                return res.status(400).json({message: "Username already exists"});  //If the user already exists, send an error message.
            }
        else if(emailExists.rows.length >0)
            {
                return res.status(400).json({message: "Email already exists"}); //If the email already exists, send an error message.
            }
        const salt = await bcrypt.genSalt(10);    //salt is a random string added to the password before hashing.
        const hashedPassword = await bcrypt.hash(password,salt); //hashing the password with the salt.

        //Insert Into database.
        const newUser = await pool.query(
            'INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *', [name,email,hashedPassword]
        );

        const {password:_, ...userWithoutPassword}=newUser.rows[0]; //Destructuring the newUser object to remove the password field.
        
        res.status(201).json({message: "User registered successfully", user: userWithoutPassword}); //Sending the response with the user object without the password field.

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const loginUser =async(req,res)=>{
    try{
        const{emailORName,password}=req.body;

        const user = await pool.query('SELECT * FROM users WHERE email = $1 OR username =$1',[emailORName]); //Checking if the user exists in the database with the given email or username.

        if(user.rows.length===0){
            return res.status(400).json({message:"Invalid credentials"}); //If the user does not exist, send an error message.
        }

        const passwordMatch = await bcrypt.compare(password,user.rows[0].password); //Comparing the password with the hashed password in the database.
        if(!passwordMatch){
            return res.status(400).json({message:"Invalid credentials"}); //If the password does not match, send an error message.

        }
        const token = jwt.sign({id:user.rows[0].id , username:user.rows[0].username},process.env.JWT_SECRET,{expiresIn:"1h"});
        return res.status(200).json({message:"Login successful",token});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"}); //If there is an error, send an error message.
    }
}
    

export {registerUser,loginUser}; //Exporting the registerUser and loginUser functions to be used in other files.
const jwt= require("jsonwebtoken")
const User= require('../Models/User')

//generating tokens
const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"7h"})
}
exports.registerUser= async(req, res)=>{

    const{fullName, email, password, profilepic}=req.body;
    if(!fullName||!email||!password){
        return res.status(400).json({message:"All fields are required."})
    }
    try{
        const existingUser= await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already Exists"})
    }

    const user= await User.create({
        fullName, email, password, profilepic
    });

    res.status(201).json({
        id:  user._id,
        user,
        token: generateToken(user._id),
    });
   
}
catch(err){
    res.status(500).json({
        message:"error registering user",
        error: err.message,
    })
        
}}
exports.loginUser= async(req, res)=>{
const{ email,password}= req.body;
if(!email||!password){
    return res.status(400).json({message:"all fields are required"})

}
try{
    const user= await User.findOne({email});
     console.log("User found:", user); // Debugging statement

if(!user||!(await user.comparePassword(password))){
    return res.status(400).json({
        message:"Invalid Credentials"
    })
}
res.status(200).json({
    id: user._id,
    user,
    token: generateToken(user._id)

})



}
catch(err){
    res.status(500).json({
        message:"error registering user",
        error: err.message,
    })

}}
exports.getUserInfo= async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password for security

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "Server error" });
    }
};
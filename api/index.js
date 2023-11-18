import express from 'express';
import mongoose from 'mongoose';
import User from './model/user.js';
import bcrypt from 'bcryptjs'
import cors from 'cors';
import jwt from 'jsonwebtoken';
import Message from './model/message.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

const MONGOURL="mongodb+srv://abhayguptaak39:abhayguptaak39@cluster0.h8eb9wp.mongodb.net/chatApp?retryWrites=true&w=majority";
const JWT_SEC="a13366fdce8b93a8194dd11e6187069bcc4ecb7007c2da867e3cf736f782bd14"

const connect=async()=>{
    try{
        await mongoose.connect(MONGOURL);
        // console.log("Connected to MongoDB");
    }catch(err){
        console.log("Error"+err.message);
    }
}

connect();

app.post('/api/register', async(req, res) => {
    const {name,email,password,profile} = req.body;
 
    try{
        const checkUser=await User.findOne({
            email:email
        });
        // console.log(checkUser)
        if(checkUser){
            res.status(500).json({
                message:"Account is already associated by this email. Try signing in!"
            });    
        }
        const hashedPassword =await bcrypt.hash(password,10);
        const newUser = new User({
            name:name,
            email:email,
            password:hashedPassword,
            profile:profile
        })
        
        const response=await newUser.save();
        res.status(202).json({
            message:"User Created Successfully"
        });
        
    }catch(err){
        console.log("Error"+err.message);
    }
})

app.post('/api/login', async(req, res) => {
    const {email,password} = req.body;


    try{
        const user=await User.findOne({
            email:email
        });
        // console.log(user);
        if(!user){
            res.status(500).json({
                message:"Account is not associated by this email. Try signing up!"
            });    
        }
        const isMatch=await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            res.status(500).json({
                message:"Password is incorrect"
            });    
        }
        const token = jwt.sign({id:user._id},JWT_SEC,{
            expiresIn: '720h'
        })
        res.status(202).json({
            message:"User Logged In Successfully",
            token:token
        });
        
    }catch(err){
        console.log("Error"+err.message);
    }
})

app.get("/api/users/:token",async(req,res)=>{
    const {token} = req.params;
    try{
        const id=jwt.verify(token,JWT_SEC).id
        const user=await User.findOne({
            _id:id
        });
        if(!user){
            res.status(500).json({
                message:"User not found"
            });    
        }
        res.status(202).json({
            message:"User found",
            user:user
        });
        
    }catch(err){
        res.status(401).json({
            message:err.message
        }); 
    }
})

app.get("/api/allUsers/:id",async(req,res)=>{
    const {id} = req.params;
    try{
       
        const users=await User.find({});
        const allUserExpectCurrent= users.filter((item)=>item._id!=id)
      
        res.status(202).json({
            message:"TotalUsers",
            users:allUserExpectCurrent
        });
        
    }catch(err){
        res.status(401).json({
            message:err.message
        }); 
    }
})

app.post("/api/message/addNewMessage",async(req,res)=>{
    await connect();
    const {data} = req.body;
    const userId=data.userId;
    const recepientId=data.recepientId;
    const messageText=data.messageText;
    const messageType=data.messageType;
    const imageUrl=data.imageUrl;
    try{
        const newMessage = new Message({
            senderId:userId,
            receiverId:recepientId,
            messageType:messageType,
            message:messageText,
            timeStamp: Date(),
            imageUrl:messageType==='image'?imageUrl:null,
        })
        const result=await newMessage.save()

        if(result){
            res.status(202).json({
                "message":"Message was sent successfully",
            })
        }else{
            res.status(400).json({
                "message":"Message  could not be sent",
            })
        }
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            "message":"Internal Server Error",
        })
    }
})
app.get("/api/messages/:userId/:recepientId",async(req,res)=>{
    await connect();

    const {userId,recepientId} = req.params;

    try{

        const messages=await Message.find({
            $or:[
                {senderId:userId,receiverId:recepientId},
                {senderId:recepientId,receiverId:userId},
            ]
        }).populate("senderId", "_id name")
        res.status(202).json({
            "messages": messages
        })
    }catch(err){
        res.status(500).json({
            "message":"Internal Server Error",
        })
    }
})   

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
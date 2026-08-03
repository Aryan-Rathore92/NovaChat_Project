import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
// import { Messages } from 'openai/resources/chat/completions.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is runing on port ${PORT}`)
    connectDB();
})

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection successfull!");
    } catch (error) {
        console.log("Failed connection with database ", error);
    }
}



// app.post('/test', async (req, res)=>{
//     const options = {
//         method: "POST",
//         headers:{
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "openai/gpt-oss-20b",
//             messages:[{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
//         console.log(response);
        
//         const data = await response.json();
//         console.log(data);
//         res.send(data.choices[0].message.content);
//     } catch (error) {
//         console.log(error);
//     }
// })
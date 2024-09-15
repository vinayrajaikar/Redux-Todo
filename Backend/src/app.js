import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend URL
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//   }));

const allowedOrigins = process.env.CORS_ORIGIN.split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
    },
    credentials:true,
  })
);

console.log(allowedOrigins)

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get('/heloo',(req,res,next)=>{
    res.send("Heyyyy");
})

// app.listen(3000)

import userRouter from './routes/user.routes.js'

app.use("/api/v2/users",userRouter)


export {app}
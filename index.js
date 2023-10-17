const mongoose=require('mongoose')
const express=require('express')
const UserModel=require('./models/User')
const cors=require('cors');

const app=express()
app.use(cors({
    origin:'http://localhost:5173'
}));
const bodyParser = require('body-parser');
app.use(bodyParser.json())
require('dotenv').config()
const PORT=process.env.PORT

const dbUrl="mongodb+srv://SHANAK1998:sms1998f2@cluster0.l9rmlin.mongodb.net/?retryWrites=true&w=majority"

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect(dbUrl,connectionParams).then(()=>{
    console.info('connected to the DB')
}).catch((e)=>{
    console.log("Err:"+e);
})
app.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`);
})
app.post('/insert',(req,res)=>{
     let userModel=new UserModel()
     userModel.userName=req.body.userName;
     userModel.password=req.body.password;
     
    userModel.save().then(result=>{
       res.status(200).send({'msg':result})
    }).catch(err=>{
        console.log(err);
    })
})


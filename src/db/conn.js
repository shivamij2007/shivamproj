const mongoose=require("mongoose")
const db='mongodb+srv://shivam2007:Kelovihar%402007@cluster0.9235eh8.mongodb.net/projectRegistration?retryWrites=true&w=majority'
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
    
    
}).then(()=>{
    console.log("connection succesfull");
}).catch((e)=>{
    console.log(e);
    console.log("connection failed")
});
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://amrithamanikandan162005:amritha@amritha.e10c6.mongodb.net/?retryWrites=true&w=majority&appName=AMRITHA')
.then(()=>console.log('connected!'))
.catch((err)=>console.log(err))
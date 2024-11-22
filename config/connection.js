
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/todolist')
.then(()=>console.log('connected'))
.catch(()=>console.log("Error"))

module.exports=mongoose;
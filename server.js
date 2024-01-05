require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();


const mongooseConnection = require('./database/dataConnection');
const User = require('./database/MongodbSchema')
mongooseConnection();
const PORT = process.env.PORT || 3001;
app.use(express.json())

app.use(express.urlencoded({extended:false}))


app.set('view engine', 'ejs');


app.use('/static',express.static(path.join(__dirname,'public')))


app.get('/signup',(req,res)=>{
    res.render('signup',{title:"Signup"})
});
app.get('/login',(req,res)=>{
    res.render('login', { title: "Login" })
})



app.post('/signup', async (req, res) => {
    const { name, password,email } = req.body;
    try {
        const userData = await User.find({
            name
        });
        if(name == userData.name){
            res.send('user Exists :Please try another username')
        }else{
            await User.insertMany({name,password,email})
            res.render('login',{title:"Login"})
        }
        
        console.log(userData)
        res.status(200).json(userData)
    } catch (e) {
        console.log(e)
    }

});

app.post('/login', async (req, res) => {
    
    const userData = await User.findOne({email:req.body.email})
    if ( userData.password === req.body.password){
        res.status(200).render('homepage', { title: userData.email});
        
    }else{
        res.send("Password incorrect :Try again");
    }
    
    res.status(200).json(userData)
})

app.listen(PORT,()=>{console.log(`Server is connected ${PORT}`)});
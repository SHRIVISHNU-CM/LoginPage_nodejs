require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt')


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
    
    try {
        
        const userData = await User.find({
            name:req.body.name
        });
        if(req.body.name == userData){
            res.send('user Exists :Please try another username')
        }else{
            const hassedPassword = await bcrypt.hash(req.body.password, 10);
            const users = {
                name: req.body.name,
                email:req.body.email,
                password: hassedPassword
            }
            await User.insertMany(users)
            res.render('login',{title:"Login"});
            res.status(200)
        }
         
    }catch(e){
        console.log(e);
        res.status(400);
    }

});

app.post('/login', async (req, res) => {
    
    const userData = await User.findOne({email:req.body.email})
    if ( userData == null){
        res.send("email incorrect :Try again");
            
    }
    try{
        if(await bcrypt.compare(req.body.password,userData.password)){
            res.status(200).render('homepage', { title: userData.name});
        }else{
            res.send('Please Password incorrect ').status(400)
        }
    }catch(e){
        res.send('Password incorrect ').status(400)
    }
    
})

app.listen(PORT,()=>{console.log(`Server is connected ${PORT}`)});
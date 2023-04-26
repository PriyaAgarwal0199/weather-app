const path = require('node:path');
const express = require('express');
const fs = require('node:fs');
const hbs = require('hbs');
const geocode = require('./utills/geocode');
const forecast = require('./utills/forecast');
const app = express();
const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//this will load index.html file at default localhost:3000

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewpath)
hbs.registerPartials(partialspath)
//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:'Priya Agarwal'
    })
})

app.get('/help',(req,res)=>{
   // res.send(fs.readFileSync(path.join(publicDirPath,'/help.html')).toString());
   res.render('help',{
    title:"Help Page",
    message:"You have clicked on help page",
    name:"Priya Agarwal"
   })
})

app.get('/about',(req,res)=>{
    //res.send(fs.readFileSync(path.join(publicDirPath,'/about.html')).toString());
    res.render('about',{
        title:"About Page",
        name:"Priya Agarwal"
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({error:"You must provide an address"})
    }
    geocode(address,(err,{latitude:lat,longitude:long,location}={})=>{
        if(err){
            return res.send({error:err})
        }
        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({error:err})
            }
            res.send({
                forecastData,
                location,
                address
            })
            // console.log(location)
            // console.log(forecastData)
          })
    })
   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:"Priya Agarwal",
        errorMsg:"Help article not found",
        title:"404"
    })
})

//setting up 404 page here * means match anything that hasn't been matched so far and it sgould be always at last
app.get('*',(req,res)=>{
res.render('404',{
    name:"Priya Agarwal",
    errorMsg:"Page not found",
    title:"404"
})
})
app.listen(port,()=>{
    console.log(`Server has started running at port ${port}.`)
})
//import of required core node, npm and userdefined modules
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs=require('hbs')

const log=console.log
const app = express()


//define paths for express directory config
const publicDirPath = path.join('__dirname','../public')
const viewsDirPath=path.join('__dirname','../templates/views')
const partialsDirPath = path.join('__dirname','../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsDirPath)
hbs.registerPartials(partialsDirPath)

//Setup directory to serve static content
app.use(express.static(publicDirPath))
//app.use('/help',express.static(publicDirpath+'/help.html'))
//app.use('/about',express.static(publicDirpath+'/about.html'))

//Setup routes for handlebars
app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        author: 'Created By Bodhisattwa Roy'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'This is all about Node and Express JS used with Weather Stack API',
        author: 'Created By Bodhisattwa Roy'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Need Help!!! No Help HERE',
        author: 'Created By Bodhisattwa Roy'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
geoCode(req.query.address,(error,{latitude,longitude,placeName}={})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData={}) => {
        if(error){
            return res.send({error})
        }
        //log(placeName)
        //log(forecastData)
        res.send({
            Place: placeName,
            WeatherReport: forecastData
        })
    })
})
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title: 'Page Not Found',
        author: 'Created By Bodhisattwa Roy',
        error: 'Requested page not found, Please click on any link in the top navigation bar'
    })
})

/*app.get('',(req,res)=>{
    res.send('<html><head><title>Express JS Index page</title></head><body><h1>Hello Express!!!</h1></body></html>')
})

app.get('/help',(req,res)=>{
    res.send('<html><head><title>Express JS Help page</title></head><body><h1>Help is HERE</h1></body></html>')
})

app.get('/about',(req,res)=>{
    res.send('<html><head><title>Express JS About page</title></head><body><h1>This is all about Express!!!</h1></body></html>')
})*/

app.listen(3000,()=>{
    console.log('Web-Server started at port 3000')
})

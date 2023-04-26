const request = require('postman-request');
const urlWeather = 'http://api.weatherstack.com/current?access_key=7a6cc791ca274876124b608529bcbb62&query='
//json=true to set automatic parsing
//units=f for temp in fahrenheit,m for metric system that is celsius

const forecast = (lat,long,cb)=>{
    const url = urlWeather + `${lat},${long}&units=m`
    request({url, json: true},(err,{body})=>{
        
        if(err){
                    cb("Unable to connect to weather service.")
                }
            else if(body.error){
                    cb("Unable to find location in forecast.")
            }
                else{
                    let {weather_descriptions,temperature,feelslike,humidity} = body.current
                    cb(undefined,`${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} out.
                     The humidity is ${humidity}% out`)
                }
    })
}



  module.exports = forecast;
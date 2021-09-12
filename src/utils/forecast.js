const request=require('postman-request')
const forecast=(lat,long,callback)=>{
    const WSApiKey='0810e678c0843b48c7d2bad9bf4561a3'
    const forecastURL=`http://api.weatherstack.com/current?access_key=${WSApiKey}&query=${lat},${long}`
    request({url:forecastURL,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to Weather Forecast Service!!!',undefined)
        }
        else if(body.error){
            callback('Invalid or missing location query parameter!!!',undefined)
        }
        else{
            const temperature=body.current.temperature
            const precipitation=body.current.precip
            const precipPercent=precipitation*100
            const weatherCondition=body.current.weather_descriptions[0]
            //let weatherData=`Overall weather condition is ${weatherCondition}\n
            //it is currently ${temperature} degrees out there\n
            //There is a ${precipPercent}% chance of rain`
            const weatherData={
                Weather: weatherCondition,
                Temprature: temperature,
                RainChance: precipPercent
            }
            callback(undefined,weatherData)
        }
    })
}

module.exports=forecast
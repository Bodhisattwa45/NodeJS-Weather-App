/*const button = document.getElementById('changeText')
button.addEventListener('click',()=>{
    document.getElementById('myh1').innerHTML='Text Changed!!!'
})*/


const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('#Placename')
const para1 = document.querySelector('#OutputElements > p#msg-1')
const para2 = document.querySelector('#OutputElements > p#msg-2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    const URL = `http://localhost:3000/weather?address=${location}`
    para1.textContent='...Loading Weather Data...'
    para2.textContent=' '
    fetch(URL).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            para1.textContent = data.error
        }
        else{
            para1.textContent = `Location: ${data.Place}`
            para2.textContent = `Weather: ${data.WeatherReport.Weather}, Temprature: ${data.WeatherReport.Temprature}, RainChance: ${data.WeatherReport.RainChance}%`
        }
    })
})
})
console.log("hi from js file")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const locationMessage = document.querySelector('#location')
const weatherInfo = document.querySelector('#weather')
const errorMsg = document.querySelector('#errorMsg')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();// to prevent default behavior of form i.e. page reloading after form is submitted
    weatherInfo.textContent = '';
    locationMessage.textContent = 'Loading...';
    errorMsg.textContent='';
    const address = search.value;
    fetch(`/weather?address=${address}`).then((res)=>{
    res.json().then((data)=>{
        console.log(data)
        if(data.error)
        {
            errorMsg.textContent = data.error;
            weatherInfo.textContent = '';
            locationMessage.textContent = '';
        }
        else{
            errorMsg.textContent = '';
            weatherInfo.textContent = data.forecastData;
            locationMessage.textContent = "Your weather for "+data.location;
        }
       
    })
    }).catch((e)=>{
    console.log(e)
   
    })
    console.log(address)
})
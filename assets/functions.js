const mainContainer = document.querySelector(".main-header")
const cityNameInput = document.querySelector(".city-inp")
const loadingContainer = document.querySelector(".loading-container")
const errorContainer = document.querySelector(".error-container")
const infocontent = document.querySelector(".info-content")
const form = document.querySelector("#form")
const submitCityNameBtn = document.querySelector("#sub")
const coordBtn = document.querySelector("#coord")


function setLoading(value = false) {
    if(value) {
        loadingContainer.innerHTML += `
        <div class='load-container' style="display: block;height:100vh;margin:2em 0">
             <img src='assets/loading.gif' alt='' class='loading' style="display: block;margin: 0 auto;max-width: 200px" />
        </div>
        `
    } else {
        loadingContainer.innerHTML = ``
    }
}

function setError(value = false) {
    if(value) {
        errorContainer.innerHTML += `
        <h1 class='error-title' style="	position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);color: #fff;">Please enter your city name</h1>
        `
    } else {
        errorContainer.innerHTML = ``
    }
}

function setCardStyle(value = false) {
    if(value) {
            infocontent.style.opacity = 0
            infocontent.style.transform = 'scale(.5)'

            setTimeout(()=>{
                infocontent.style.opacity = 1
                infocontent.style.transform = 'scale(1)'
                infocontent.style.transitionProperty= 'transform'
                infocontent.style.transitionDuration = '.5s'
            },500)
        
    } 
}

function setData(data = false) {

    if(data) {

        function getFahrenheitFromCelsius(celsius){
            return (celsius * (9 / 5)) + 32;
         }
         

        const searchQuery = `https://www.google.com/search?q=${data.name}+weather`

        infocontent.innerHTML = 
      `  <div class="weather-info">
                
            
        <div class='card-body'>

                <div class="card-head" style="display: flex;justify-content: center;margin: 1em 0">

                    
                    

                    <h6 class='card-subtitle'>
                        Weather Info of: ${data.name} , 
                    </h6>
                    
                    <span class="card-country" style="display: inline-block;font-size: 20px;">
                    ( ${data.sys.country} )
                    </span>
                </div>
        </div> 
                

        
        
        
        <div class="mode" style="font-size: 1.5em;margin: 1em auto;display: flex;justify-content: center;align-items: center;">
            <span style="display: inline-block;margin: 0 1em;">
                Weather Mode:  ${data.weather[0].main} - ${data.weather[0].description}
            </span>
            <div class="mode-img" style="background-color: #00000024;">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" style="height: 3em;"/>

                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" style="height: 3em;"/>
            </div>
        </div>
            
            <div class='card-info '>

                
            <div class='card-text left ' style="width: 490px;">
                
                <span></span>
                <h6 class='counter' data-target='${data.main.temp}'>
                    Temparature :   ${data.main.temp} °C /  ${ Number( getFahrenheitFromCelsius(data.main.temp) ).toFixed(2) } °F 

                </h6>

            </div>


            <div class='card-text right'>
                <h6 class='counter' data-target='${data.main.temp_max}'>
                From ${data.main.temp_min} °C to ${data.main.temp_max} °C
                </h6>
            </div>
        </div>
        
        <div class='card-info'>
            <div class='card-text left'>
                <h6 class='counter' data-target='${data.main.humidity}'>
                Humidity : ${data.main.humidity}
                </h6>
            </div>
            <div class='card-text right'>
                <h6 class='counter' data-target='${data.main.pressure}'>
                Pressure : ${data.main.pressure}
                </h6>
            </div>
        </div>
        <div class='c-link'>
            <a target='_blank' href=${searchQuery}>
                <button class='card-link'>More Info on Search</button>
            </a>
        </div>
        <!-- winfo -->
    </div>`
    
        

    } else {
        infocontent.innerHTML = ``
    }
}

function setFormValue(value) {
    cityNameInput.value = value
}

const apikey = 'a7479f548590016464dcfe166cf02fcf'
 

async function getCityNameInfo(e) {
    e.preventDefault()

    setLoading(true)

    let cityname = cityNameInput.value

    // Make a request to the OpenWeatherMap API to get the current weather for the city
    const request = new XMLHttpRequest();

    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`, true);

    request.onload = function() {
   
        if (request.status >= 200 && request.status < 400) {
        // The request was successful!
        const data = JSON.parse(request.responseText);

        console.log(data)

        console.log(data.current)

        
        setFormValue('')
        setLoading(false)
        setError(false)

        setCardStyle(true)
        setData(data)
        // runCountersAnimation()

 
    } else {
        // There was an error making the request
        console.error('Error getting weather data');
        console.error(JSON.parse(request.responseText));
    }

    };

    request.send();

  

}

function getCoordInfo() {
    const coord = async (p) => {
        const lat = p.coords.latitude
        const lon = p.coords.longitude

        setLoading(true)

            // Make a request to the OpenWeatherMap API to get the current weather for the city
    const request = new XMLHttpRequest();

    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`, true);

    request.onload = function() {
   
        if (request.status >= 200 && request.status < 400) {
        // The request was successful!
        const data = JSON.parse(request.responseText);

        // console.log(data)
        console.log('data')

        setCardStyle(true)
        setError(false)
        setLoading(false)
        setData(data)
        
        // runCountersAnimation()

        // Get the temperature in Fahrenheit
        // const temperature = data.main.temp * (9/5) - 459.67;

        // Update the page with the temperature
        // document.getElementById('weather').innerHTML = `The temperature in ${CITY_NAME} is ${temperature.toFixed(1)}°F`;
    
    } else {
        // There was an error making the request
        console.error('Error getting weather data');
        console.error(JSON.parse(request.responseText));
    }

    };

    request.send();


 


        
    
    // const response = await fetch(`https://weatherapplicationn123.herokuapp.com/pos/${lat}/${lon}`)
    // const data = await response.json()

        // setData(data)
        // setError(false)
        // setLoading(false)
        // setCardStyle(true)


    }


    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(coord)
    }
}



// // Replace YOUR_API_KEY with your actual API key
// const API_KEY = 'YOUR_API_KEY';

// // Replace CITY_NAME with the name of the city you want to get weather data for
// const CITY_NAME = 'New York';

// // Make a request to the OpenWeatherMap API to get the current weather for the city
// const request = new XMLHttpRequest();
// request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`, true);
// request.onload = function() {
//   if (request.status >= 200 && request.status < 400) {
//     // The request was successful!
//     const data = JSON.parse(request.responseText);

//     // Get the temperature in Fahrenheit
//     const temperature = data.main.temp * (9/5) - 459.67;

//     // Update the page with the temperature
//     document.getElementById('weather').innerHTML = `The temperature in ${CITY_NAME} is ${temperature.toFixed(1)}°F`;
//   } else {
//     // There was an error making the request
//     console.error('Error getting weather data');
//   }
// };
// request.send();
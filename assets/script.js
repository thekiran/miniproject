

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
            infocontent.style.transform = 'scale(0) rotate(360deg)'

            setTimeout(()=>{
                infocontent.style.opacity = 1
                infocontent.style.transform = 'scale(1) rotate(0deg)'
                infocontent.style.transitionProperty= 'transform'
                infocontent.style.transitionDuration = '2s'
            },500)
        
    } 
}

function setData(data = false) {

    if(data) {

        const searchQuery = `https://www.google.com/search?q=${data.name}+weather`

        infocontent.innerHTML = 
        `
            <div class='card-body'>
            <h5 class='card-title' />
            <h6 class='card-subtitle'>${data.name}</h6>
            <div class='card-info '>
                <div class='card-text left '>
                    <span>Temparature :</span>
                    <h6 class='counter' data-target='${data.main.temp}'>
                    ${data.main.temp}
                    </h6>
                </div>
                <div class='card-text right'>
                    <span>MAX Temp :</span>
                    <h6 class='counter' data-target='${data.main.temp_max}'>
                    ${data.main.temp_max}
                    </h6>
                </div>
            </div>
            <div class='card-info'>
                <div class='card-text left'>
                    <span>Humidity :</span>
                    <h6 class='counter' data-target='${data.main.humidity}'>
                    ${data.main.humidity}
                    </h6>
                </div>
                <div class='card-text right'>
                    <span> Pressure :</span>
                    <h6 class='counter' data-target='${data.main.pressure}'>
                    ${data.main.pressure}
                    </h6>
                </div>
            </div>
            <div class='c-link'>
                <a target='_blank' href=${searchQuery}>
                    <button class='card-link'>More Info</button>
                </a>
            </div>
        </div>
        `

    } else {
        infocontent.innerHTML = ``
    }
}

function setFormValue(value) {
    cityNameInput.value = value
}


async function getCityNameInfo(e) {
    e.preventDefault()

    setLoading(true)
    const res = await fetch('https://weatherapplicationn123.herokuapp.com/city/' + cityNameInput.value)
      console.log(res)

    if (res.status === 200) {
        const data = await res.json()
        console.log(data)

        setFormValue('')
        setLoading(false)
        setError(false)

        setCardStyle(true)
        setData(data)
        runCountersAnimation()

    } else if (res.status !== 200) {
        setLoading(false)
        setError(true)
    }


}

function getCoordInfo() {
    const coord = async (p) => {
        const lat = p.coords.latitude
        const lon = p.coords.longitude

        setLoading(true)
        const response = await fetch(`https://weatherapplicationn123.herokuapp.com/pos/${lat}/${lon}`)

        const data = await response.json()
        setData(data)
        setError(false)
        setLoading(false)
        setCardStyle(true)

    }
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(coord)
    }
}

form.addEventListener('submit', getCityNameInfo)

coordBtn.addEventListener('click', getCoordInfo)




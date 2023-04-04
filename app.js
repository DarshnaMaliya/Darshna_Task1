const app = document.querySelector(".wheather-details");
const nameOutput = document.querySelector(".name");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");

const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById('locationInput');
//const form = document.querySelector('.form1');
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");
console.log(form);
console.log(cities);
let cityInput = "Pune";

// cities.forEach((city) => {
//     city.addEventListener('click', (e) => {
//         cityInput = e.target.innerHTML;
//         fetchWheatherData();
//         app.style.opacity = "0";
//     });
// })

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please enter a city name');
    } else {
        cityInput = search.value;
        fetchWheatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date().getDay()];
};

function fetchWheatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=bdaa3043f3164d2e915123214232303&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            temp.innerHTML = data.current.temp_c+ "&#176;";
            nameOutput.innerHTML = data.location.name;
            
            conditionOutput.innerHTML = data.current.condition.text;
            
            const date = data.location.localtime;
            console.log(date);
            const d = parseInt(date.substr(8, 2));
            const m = parseInt(date.substr(5, 2));
            const y = parseInt(date.substr(0, 4));
            const time = date.substr(11);
            //dateOutput.innerHTML = data.location.localtime;
            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/${m}/${y}`;
            timeOutput.innerHTML = time;
            const iconId = data.current.condition.icon.substr(".//cdn.wheatherapi.com/wheather/64x64/".length);
            console.log(iconId);
            icon.src = "./weather/64x64/day/" + iconId;
            
            let timeOfDay = day;
            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";
            }
            if (code == 1000) {
                app.style.backgroundImage = `url(https://unsplash.com/photos/eXHeq48Z-Q4)`;
                btn.style.background = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }
             else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(https://unsplash.com/photos/h-rP5KSC2W0)`;
                btn.style.background = "#fa6d1b";
        
            if (timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(https://unsplash.com/photos/bWtd1ZyEy6w)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                }
            } else {
                app.style.backgroundImage = `url(https://unsplash.com/photos/duo-xV0TU7s)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }
            app.style.opacity = "1";
        })
        .catch(() => {
            //alert("city not found, please try again");
            app.style.opacity = "1";
        });
}

fetchWheatherData();
app.style.opacity = "1";


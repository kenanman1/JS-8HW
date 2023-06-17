//для начала получаем координаты города по долготе и широте
async function getCoordinates(city) {
    const data = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=1b0653ada46e457eb8bde81ae5e7a722`);
    const get = await data.json();
    return get;
}

//дальше по ширине и долготе получаем данные о погоде этого города
async function getWeather(value) {
    let lat = value.results[0].geometry.lat;
    let lng = value.results[0].geometry.lng;
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=856ee5476b6e69d2ed377e70d7e5269c`)
    const get = await data.json();
    return get;
}

const input = $("#input");
input.on("keydown", function (e) { //проверяем чтобы город был с заглавной буквы
    if (e.target.value.length === 1) {
        let letter = e.target.value;
        letter = letter.toUpperCase();
        e.target.value = letter;
    }
});

$("button").on("click", putWeather);
let info = $("p");
async function putWeather() {
    let city = input.val();
    info.text("");
    try {
        let coord = await getCoordinates(city);
        let weather = await getWeather(coord);
        let temp = (weather.main.temp - 273).toFixed(2); //переводим из кельвина в цельсий
        let feels = (weather.main.feels_like - 273).toFixed(2); //переводим из кельвина в цельсий
        let windSpeed = weather.wind.speed;
        let description = weather.weather[0].description;
        let allInfo = [`Temp: ${temp} °C`, `Feels like: ${feels} °C`,
        `Wind speed: ${windSpeed}`, `Weather description: ${description}`];
        for (let item of allInfo) {
            info.append(`${item}<br>`);
        }
    }
    catch {
        info.text("Enter correct city");
    }
};

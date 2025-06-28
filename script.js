const API_KEY = "45c3bd6a724c1cba483056cf7cdbda19"; // ganti API key kamu

function getWeather() {
    const city = document.getElementById("namaKota").value;
    const resultDiv = document.getElementById("result");

    if (!city) {
        alert("Masukkan nama kota terlebih dahulu!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod !== 200) {
                alert(data.message);
                resultDiv.classList.add("hidden");
                return;
            }

            document.getElementById("cityName").textContent = `Cuaca di ${data.name}`;
            document.getElementById("temperature").textContent = `${data.main.temp.toFixed(2)} °C`;
            document.getElementById("humidity").textContent = `${data.main.humidity} %`;
            document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
            document.getElementById("condition").textContent = data.weather[0].description;

            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const iconElement = document.getElementById("icon");
            iconElement.src = iconUrl;
            iconElement.alt = data.weather[0].description;

            resultDiv.classList.remove("hidden");
        })
        .catch((error) => {
            alert("Gagal mengambil data cuaca.");
            console.error(error);
        });
}
// Lấy ngày, tháng, năm hiện tại
function getCurrentDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0'); // Ngày (2 chữ số)
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Tháng (0-based)
    const year = today.getFullYear(); // Năm
    return `${day}/${month}/${year}`;
}

// Hàm lấy thời tiết từ OpenWeatherMap API
async function getWeather(city = "Hanoi") {
    const apiKey = "your_api_key"; // Thay bằng API Key của bạn
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Không tìm thấy thời tiết");
        const data = await response.json();
        const temp = data.main.temp; // Nhiệt độ
        const description = data.weather[0].description; // Mô tả thời tiết
        return `${temp}°C - ${description}`;
    } catch (error) {
        console.error("Lỗi khi lấy thời tiết:", error);
        return "Không lấy được thời tiết ( chưa có API )";
    }
}

// Hiển thị ngày và thời tiết trên trang
async function displayDateAndWeather() {
    document.getElementById("date").innerText = `Hôm nay: ${getCurrentDate()}`;
    const weather = await getWeather();
    document.getElementById("weather").innerText = `Thời tiết: ${weather}`;
}

// Gọi hàm khi trang tải xong
window.onload = displayDateAndWeather;


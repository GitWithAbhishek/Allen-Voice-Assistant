document.addEventListener("DOMContentLoaded", function () {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US"; // Optional, change language if needed

    // API key for OpenWeatherMap
    const apiKey = "22e9a84e8999313e2de5102d0a1a94be"; // Replace with your API key

    // Function to fetch weather data for the specified city
    function getWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    // Update the UI with weather data
                    document.getElementById("location").innerText = `Location: ${data.name}`;
                    document.getElementById("temp").innerText = `Temperature: ${data.main.temp} °C`;
                    document.getElementById("condition").innerText = `Condition: ${data.weather[0].description}`;
                } else {
                    // If the city is not found, display an error message
                    document.getElementById("location").innerText = "City not found. Please try again.";
                    document.getElementById("temp").innerText = "";
                    document.getElementById("condition").innerText = "";
                }
            })
            .catch(err => {
                console.error("Error fetching weather data: ", err);
                document.getElementById("location").innerText = "Error fetching weather.";
                document.getElementById("temp").innerText = "";
                document.getElementById("condition").innerText = "";
            });
    }

    // Handle the result of voice recognition
    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log("You said:", transcript);  // Log the spoken input to check it

        // Check if the input includes 'weather of' and extract the city name
        if (transcript.includes("weather of")) {
            let city = transcript.replace("weather of", "").trim(); // Remove 'weather of' part
            console.log("City name extracted:", city);  // Debugging: Check the extracted city
            if (city) {
                getWeather(city);  // Call the getWeather function with the city name
            } else {
                document.getElementById("location").innerText = "Please specify a city.";
            }
        } else {
            document.getElementById("location").innerText = "Please say 'weather of [city_name]' to get the weather.";
        }
    };

    // Button click event to start speech recognition
    document.getElementById("start-btn").addEventListener("click", function () {
        recognition.start();
    });

    // Automatically trigger the button click after 5 seconds
    setTimeout(function () {
        document.getElementById("start-btn").click(); // Simulate the button click
    }, 5000); // 5000 milliseconds = 5 seconds
});

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (city != "") {
      const options = {
        method: "Get",
        url: "https://api.weatherapi.com/v1/current.json",
        params: { key: "3cbbdcac094e41028f894015241205", q: city },
      };
      axios(options)
        .then((res) => {
          const data = res.data.current;
          setWeather({
            Temprature: data.temp_c + "" + "24°C",
            Humidity: data.humidity + "%",
            Condition: data.condition.text,
            "Wind Speed": data.wind_kph + " kph",
          });
        })
        .catch((e) => {
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setWeather({});
      setLoading(false);
    }
  }, [city]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setCity(e.target.elements[0].value);
        }}
      >
        <input placeholder="Enter city name" type="text" />
        <button>Search</button>
      </form>
      {loading && <p>Loading data…</p>}
      <div className="container">
        {Object.keys(weather).map((ele) => (
          <div key={ele} className="weather-card">
            <h4>{ele}</h4>
            <p>{weather[ele]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

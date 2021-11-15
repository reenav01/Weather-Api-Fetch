import React,{useState} from 'react';
import axios from "axios"
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {TiWeatherPartlySunny} from "react-icons/ti"
import {GoTriangleRight} from "react-icons/go"
import {ApiKey} from './ApiKey';
import DetailedForecast from './Component/DetailedForecast';
import {FiSearch} from "react-icons/fi"
import './App.css';

// import Card from './Card';

const App = () => {

  const [weather,setweather] = useState([])
  const [city,setCity] = useState("")
  const [flag,setFlag] = useState(true)
  const [day,setDay] = useState({})
  const fetchWeather = async () => {
      
    try {
      const {data} = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${city}&days=3&aqi=yes&alerts=yes`) 
    setweather(data)
    
    } catch  {
      toast("Enter Valid Location",{type: "error"})
    }
  }
  const handleMore = (i) => {
    setDay(i)
    setFlag(false)
  }
  const Today = weather.forecast?.forecastday[0]
  const Tommorow = weather.forecast?.forecastday[1]
  const Date = weather.location?.localtime.slice(0,10)
  const Time = weather.location?.localtime.slice(11,13)
  return (
     flag?(
    
      <div className="container-fluid bg-dark text-white d-flex flex-column ">
      <ToastContainer />
    <h1 className="mb-3"> <TiWeatherPartlySunny /> Weather Forecast</h1>
      <div className="card  border-light fluid"  style={{width: '60em',background: 'skyblue'}}>
      
        
        <div className="input-group mb-3 d-flex" >
          <input placeholder="Enter Region" className="w-75"  value={city} onChange={e => setCity(e.target.value)}/> 
          <button className="btn btn-warning float-end w-25" type="button" id="button-addon1" onClick={fetchWeather}>Search</button>
        </div>
        {typeof(weather.location?.name) !== typeof(undefined)? (
          <>
          {console.log(Time)}
          <div className="text-center">
          <img src={weather.current?.condition?.icon}  style={{
            height: "200px",
            width: "200px",
          }} alt="..." />
          </div>
        <div className="card-body">
          <div className="card-subtitle mb-2">
          <p className="card-text text-center fw-bold text-success fs-5">{`City: ${weather.location?.name}, State: ${weather.location?.region}`}</p>
          </div>
          <div className="card-subtitle mb-2">
          <p className="card-text text-center text-primary fs-4">{`Current Weather: ${weather.current?.condition?.text}`}</p>
          <p className="card-text text-center text-primary fs-4">{`Current Temperature: ${weather.current?.temp_c}°C`}</p>
  
          </div>
          <p className="card-text text-center text-danger fs-5 fst-italic">{`Forecast Today: ${Today.day?.condition?.text}`}</p>
          <p className="card-text text-center text-danger fs-5 fst-italic">{`Forecast Tommorow: ${Tommorow.day?.condition?.text}`}</p>
          
          {/* {Today.hour.forEach(i => console.log(i.time))} */}
          <h2 className="text-center text-success">{`Today: ${Date}`}</h2>
          <table className="table table-success table-striped">
            <thead className="text-center">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Weather</th>
                <th scope="col">{`AvgTemp (in °C)`}</th>
                <th scope="col">Avg Humidity</th>
                <th scope="col">Chance of Rain</th>
                <th scope="col">Will it rain</th>
                <th scope="col">More..</th>
              </tr>
            </thead>
            <tbody>
  

  
              {weather.forecast?.forecastday.map(i => 
              <>
              <tr className="text-center">
              <td>{i.date}</td>
              <td>{i.day.condition?.text}</td>
              <td>{i.day.avgtemp_c}</td>
              <td>{i.day.avghumidity}%</td>
              <td>{i.day.daily_chance_of_rain}%</td>
              <td>{i.day.daily_will_it_rain? ("Yes") : ("No")}</td>
              <td><GoTriangleRight className="icons" onClick={() => handleMore(i)}/> </td>
              </tr>
              </>)}
              </tbody>
            </table>
          
        </div>
        </>
        ): (
          <h1 className="text-center"><FiSearch />  Search Your Location</h1>
        )}
        
    </div>
      </div>
  ) : (<DetailedForecast day={day} weather={weather} setFlag={setFlag} />)
  
  );
}

export default App;

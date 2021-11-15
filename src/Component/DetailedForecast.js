import React from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti"


const DetailedForecast = ({day,weather,setFlag}) => {

    return (
        <div className="container-fluid bg-dark text-white d-flex flex-column ">
    <h1 className="mb-3"> <TiWeatherPartlySunny /> Weather Forecast</h1>
      <div className="card  border-light fluid"  style={{width: '60em',background: 'skyblue'}}>
          <div className="text-center">
          <img src={day.day?.condition?.icon}  style={{
            height: "200px",
            width: "200px",
          }} alt="..." />
          </div>
        <div className="card-body">
          <div className="card-subtitle mb-2">
          <p className="card-text text-center fw-bold text-success fs-5">{`City: ${weather.location?.name}, State: ${weather.location?.region}`}</p>
          </div>
          <h3 className="text-center text-primary">{`Date: ${day.date}`}</h3>
          <div className="card-subtitle mb-4">
          <p className="card-text text-center text-danger fs-5 fst-italic">{`Weather: ${day.day.condition?.text}`}</p>
          <p className="card-text text-center text-danger fs-5 fst-italic">{`Avg Temperature: ${day.day.avgtemp_c}°C`}</p>
  
          </div>

          
          {/* {Today.hour.forEach(i => console.log(i.time))} */}
          <table className="table table-success table-striped ">
            <thead className="text-center">
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Weather</th>
                <th scope="col">{`Temp (in °C)`}</th>
                <th scope="col">Humidity</th>

              </tr>
            </thead>
            <tbody>
  
              {/* {TODO: Add: Date, avg temp, sunrise, sunset, avg humdity} */}
  

  
              
              {day.hour.map(i => (  
              <>
              <tr className="text-center">
              <td>{i.time.slice(11)}</td>
              <td>{i.condition?.text}</td>
              <td>{i.temp_c}</td>
              <td>{i.humidity}%</td>
              </tr>
              </>
              
              )
              )}
              
              </tbody>
            </table>
          
        </div> 
        <div className="text-center" >

        <button className="btn btn-danger mb-3 w-25" onClick={() => setFlag(true)}>
            BACK
        </button>  
        </div>
    </div>
      </div>
    )
}

export default DetailedForecast

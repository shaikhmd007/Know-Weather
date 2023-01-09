import React, { useEffect, useState } from "react";
import { FaStreetView, FaTemperatureHigh } from "react-icons/fa";
import "./css/style.css";

const CheckWeather = () => {
  const [search, setSearch] = useState();
  const [city, setCity] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    if (search) {
      // try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d50b62d44387a21d0a46c8f4be982d54`).then(res => {
        // console.log(res.status);
        if (res.status === 200) {
          return res.json()
        }
        throw new Error("Invalid City!!")

      }).then(data => setCity([...city, data])).catch(err => console.log(err))

      // } 
    }
    else {
      console.log("Input city first!!");
      return

    }

    // const fetchApi = async () => {
    //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d50b62d44387a21d0a46c8f4be982d54`;
    //   let resJson
    //   try {
    //     const response = await fetch(url);
    //     resJson = await response.json();
    //   } catch (err) { console.log("erreyte") };
    //   if (!handel) {
    //     return
    //   } else {
    //     setCity([...city, resJson]);
    //   }
    //   // console.log(temp);
    // };
    // fetchApi();

  }, [search]);

  const fetchData = () => {
    setSearch(data)
    setData("")
  }

  function removeActivity(i) {
    const RemovedCities = city.filter((e, id) => {
      if (i !== id) {
        return true
      };
    });
    setCity(RemovedCities);
  }

  // style for list item select

  // const SelectedStyle = () => {
  //   const styling = {
  //     backgroundColor: "grey",
  //     border: "1px solid green",
  //     color: "white",
  //     transition: "900ms"

  //   }
  // }
  return (
    <>
      {/* Header */}
      <div className="header">Shaikh_md's Weather App</div>
      <div className="box center-screen">
        <div className="sidebar">
          <div className="">
            <button className="Btn">GetWeather</button>
            <div >
              <select className="Btn">
                <option className="city" value="none" defaultValue hidden>City</option>
                {city.map((cities, idx) => {
                  return (
                    <option key={idx}>{cities.name}</option>
                  )
                })
                }
              </select>
            </div>
          </div>
        </div>

        {/* //Input Area */}
        <div className="container" >
          <div className="inputData">
            <input
              type="search"
              value={data}
              placeholder="Enter City"
              className="inputField"
              onChange={(event) => {
                setData(event.target.value);
              }}
            />
            <button className="Search" onClick={fetchData}>Search</button>
          </div>

          {/* Table DATA Container  */}
          <table className="table" >
            <tbody>
              <th>City</th>
              <th>Description</th>
              <th>Temparature(°C)</th>
              <th>Pressure (hPa)</th>
              <th>Feels Like </th>
              <th></th>
            </tbody>
          </table>
          {city.length === 0 ? (
            <div className="Content-Data" >
              <p className="errorMsg">No Data Found</p>
            </div>
          ) :
            (city.map((item, i) => {
              return (
                < div className="Content-Data" key={i}>
                  <table className="table-data">
                    <tr className="row-data">
                      <td> <FaStreetView /> {item.name}</td>
                      <td>{item.weather[0].description}</td>
                      <td><FaTemperatureHigh />{item.main.temp} °C</td>
                      <td>{item.main.pressure}</td>
                      <td>{item.main.feels_like}</td>
                      <td>
                        <button className="delete-btn" onClick={() => removeActivity(i)}>Delete</button></td>
                    </tr>
                  </table>

                </div>
              );
            })


            )}
        </div>
      </div>
    </>
  );
};

export default CheckWeather;

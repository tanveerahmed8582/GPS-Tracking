import { useState } from "react";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [userAddress, setUserAddress] = useState();

  const [GPSLatitude, setGpsLatitude] = useState();
  const [GPSLongitude, setGpsLongitude] = useState();

  const geo = navigator.geolocation;

  //Get User Current Location

  geo.getCurrentPosition(userCoords);
  function userCoords(position) {
    let userLatitude = position.coords.latitude;
    let userLongitude = position.coords.longitude;
    // console.log("Latitude: ", userLatitude);
    // console.log("Longitude: ", userLongitude);
    setLatitude(userLatitude);
    setLongitude(userLongitude);
  }

  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=7fd604a66dca4b78ac1435e27199e8e1&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
    const loc = await fetch(url);
    const data = await loc.json();
    console.log("User Address: ", data);
    setUserAddress(data.results[0].formatted);
  };

  const handleGetUserAddress = () => {
    getUserAddress();
  };

  //Get User GPS Current Location

  const watchID = geo.watchPosition(userGpsCoords);
  function userGpsCoords(position) {
    let userGpsLatitude = position.coords.latitude;
    let userGpsLongitude = position.coords.longitude;
    console.log("Latitude: ", userGpsLatitude);
    console.log("Longitude: ", userGpsLongitude);
    setGpsLatitude(userGpsLatitude);
    setGpsLongitude(userGpsLongitude);
  }

  const stopGPS = () => {
    geo.clearWatch(watchID);
  };

  return (
    <>
      <h1>GPS TRACKER</h1>
      <h2>latitude- {latitude}</h2>
      <h2>longitude- {longitude}</h2>
      <h2>User Address- {userAddress}</h2>
      <button onClick={handleGetUserAddress}>Get User Address</button>
      <hr />
      <h1>GPS Tracking</h1>
      <h2>GPS Latitude:- {GPSLatitude}</h2>
      <h2>gps Longitude:- {GPSLongitude}</h2>
    </>
  );
}

export default App;

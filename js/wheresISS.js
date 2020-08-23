//<script src="js/wheresISS_start.js"> 

//making a map and tiles

//4.5 create the map, copy paste this from leaflet.js, change the name to the name we gave our map issMap
//setView([51.505, -0.09], 13);
const mymap = L.map('issMap').setView([0, 0], 1); //setView([lat, lon], zoom level)
//4.6 leaflet attribution
const attribution =
    '& copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//4.7 add the tileurl
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tile = L.tileLayer(tileUrl, {
    attribution
});
tile.addTo(mymap); // add the tile to mymap

// Making Marker with a custom icon
//6.0 Add a custom marker , copy paste from leaflet.js, edit as needed
const issIcon = L.icon({
    iconUrl: 'images/iss2.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
}); // then add an additional param to marker

//5.3 store the pos of the ISS in a marker
//const marker = L.marker([0, 0]).addTo(mymap); // start pos latlon 0,0

//6.1 add the icon to the above marker as a 2nd param
const marker = L.marker([0, 0], {
    icon: issIcon
}).addTo(mymap); //


//1. Test json in console log
/* let pos = {
    lat: -45,
    lon: 112
};
console.log(pos); */
//2. Let's use an api from wheretheissat, its free doesn't require any registration
// we can then use it in an async fetch function 

//2.1 def the url
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

//7.2 declare 1st time
let firstTime = true; // use this to check and set the view if 1st time

//2.2 make an async fun
async function getISS() {
    const response = await fetch(api_url); // call fetch to await data from the url
    const data = await response.json(); //await the data from the response and convert it into json type
    //console.log(data); // log the data to console

    //2.4 Get the lat lon // we can get those from the js object
    // we can also get the lat lon frm the data and log separately
    /* console.log(data.latitude);
    console.log(data.longitude); */
    // we can also do what's called js distructuring
    const {
        latitude,
        longitude
    } = data;

    //5.0 Add a marker to the pos on the map
    //5.1 go back to leaflet.js doc > marker > copy paste L.marker([50.5, 30.5]).addTo(map);
    //L.marker([latitude, longitude]).addTo(mymap);
    // this works but lets do it in a dynamic way so it always update the pos

    //5.4 now after getting the data, setlatlon
    marker.setLatLng([latitude, longitude]); //setLatLon() didn't work, must use as given at leaflet.js doc

    //## part 2: Set the pos of ISS to center when we 1st open the app

    //7.3 check for 1st time 
    if (firstTime) {


        //7.1 use set view (we want the only for 1st time so def 1st time outside the async and put this in if statement)
        mymap.setView([latitude, longitude], 5);

        //7.3b set first time to false so it doesn't continue to check every refresh
        firstTime = false;
    }
    //3.2 give/attach the data to the html
    /* document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude; */
    //now refresh the browser and see the magic

    //7.5 Let's edit (3.2), make the digits displayed to 2 decimal places'
    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);

    //console.log(data.latitude);
    //console.log(data.longitude);
}

//2.3 call the getISS(); func
getISS();

//7.4 Set an interval to update the pos of the ISS
setInterval(getISS, 2000); //2000 milisecs interval can be changed as needed

//Coding Train: Working with Data and APIs in JavaScript
// https://www.youtube.com/watch?v=nZaZ2dB6pow
// https: //www.youtube.com/watch?v=jKQUHGpOHqg

//Github: https://www.youtube.com/redirect?q=https%3A%2F%2Fgithub.com%2FCodingTrain%2FIntro-to-Data-APIs-JS&v=jKQUHGpOHqg&event=video_description&redir_token=MGaKJTn7TzaJJSmZATkbrLojYMl8MTU4Nzc4NTI3N0AxNTg3Njk4ODc3

// leaflet.js : https://leafletjs.com/reference-1.6.0.html#marker
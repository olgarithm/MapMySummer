L.mapbox.accessToken = 'pk.eyJ1IjoiamVmZnN0ZXJuIiwiYSI6IlAzRFFiN0EifQ.mNWvayrLEw9wULuq0sopyA';
var map = L.mapbox.map('map', 'alisonr.8b1a2d15');

map.featureLayer.on('click', function (e) {
    map.panTo(e.layer.getLatLng());
});

var myLayer = L.mapbox.featureLayer().addTo(map);
var geojson;
var origjson;
var geolocate = document.getElementById('geolocate');
var all;
var washAndOreg;
var oregAndCali;
var cali;
var oreg;
var wash;

function state() {
    //var CA = document.getElementById("CA").checked; 
    var OR = document.getElementById("OR").checked;
    var WA = document.getElementById("WA").checked;

    console.log("we're checking the variables");
    
    /*if (CA === true && WA === true && OR === true || CA === true && WA === true) {
        map.setView([42.1230898, -120.7829876], 5);
        all = true; 
    } else */
   
    if (WA === true && OR === true) {
        map.setView([45.7892577, -121.0636012], 6);
        spreadsheetURL = "1BGV7tWYOmaBJOFLw2rJg8HEepYv419gjbgELg-FIls8";
        washAndOreg = true;
    /* } else if (OR === true && CA === true) {
        map.setView([39.3337635, -121.454512], 6);
        oregAndCali = true;
    } else if (CA === true) {    
        map.setView([37.4874786, -122.1907643], 6);
        cali = true; */
    } else if (OR === true) {
        map.setView([44.2743164, -120.8971049], 7);
        spreadsheetURL = "16tZc4d76yA4G-yD1P1-qfRFKSQIimZokuzfL-czQYfM";
        oreg = true;
    } else if (WA === true) {
        map.setView([47.3655913, -120.1224026], 7);
        spreadsheetURL = "1AvoprECsk38U2jdOYdnBrEX3vh6x2tD4ynjCgbLO1NY";
        wash = true;
    }
    
    spreadSheet();
   
}


function spreadSheet(){
    var URL = spreadsheetURL;
    Tabletop.init( { key: URL, callback: convertToGeoJSON, simpleSheet: true } )
};


function convertToGeoJSON(data) {
    function Arts(i){
        if (data[i]["markersymbol12"] == "music" || data[i]["markersymbol12"] == "theatre" || data[i]["markersymbol12"] == "library"){
            console.log("MUSIC");
            places.push(place);
        }
    }
    
    function HealthSciences(i){
        if (data[i]["markersymbol12"] == "hospital" || data[i]["markersymbol12"] == "dentist"){
            places.push(place);
        }
    }

    function Educational(i){
        if(data[i]["markersymbol12"] == "college"){
            console.log("COLLEGE");
            places.push(place);
        }
    }

    function Engineering(i){
        if(data[i]["markersymbol12"] == "mobilephone"){
            console.log("CITY");
            places.push(place);
        }
    }

    function Business(i){
        if(data[i]["markersymbol12"] == "bank"){
            console.log("BUSINESS");
            places.push(place);
        }
    }

    function Science(i){
        if(data[i]["markersymbol12"] == "chemist"){
            console.log("SCIENCE");
            places.push(place);
        }
    }

    function Price(i){      
            if(zero){
                if(data[i]["paid"] < 500){
                    
                    if(arts){
                        console.log("0- music");
                        Arts(i);
                    } 
                    
                    if(healthSciences){
                        HealthSciences(i);
                    }

                    if(educational){
                        console.log("0- college");
                        Educational(i);
                    } 

                    if(engineering){
                        console.log("0- city");
                        Engineering(i);
                    } 

                    if(science){
                        console.log("0- science");
                        Science(i);
                    } 

                    if(business){
                        console.log("0- business");
                        Business(i);
                    }
                }
           }
        
            
        if(five == true){
            if(data[i]["paid"] > 500 && data[i]["paid"] < 1000){
                if(arts){
                    Arts(i);
                }
                
                if(healthSciences){
                    HealthSciences(i);
                }

                if(educational){
                    Educational(i);
                }

                if(engineering){
                    Engineering(i);
                }
                if(science){
                    Science(i);
                }
                if(business){
                    Business(i);
                }
            }
                
        }
        
        if(thousand == true){     
            if(data[i]["paid"] > 1000){
                if(arts){
                    Arts(i);
                }
                
                if(healthSciences){
                    HealthSciences(i);
                }

                if(educational){
                    Educational(i);
                }

                if(engineering){
                    Engineering(i);
                }

                if(science){
                    Science(i);
                }

                if(business){
                    Business(i);
                }
            }
        }
    
}
    
    var arts = document.getElementById("arts").checked;
    var healthSciences = document.getElementById("healthSciences").checked;
    var educational = document.getElementById("college").checked;
    var engineering = document.getElementById("city").checked;
    var science = document.getElementById("science").checked;
    var business = document.getElementById("business").checked;
    var zero = document.getElementById("0").checked;
    var five = document.getElementById("500").checked;
    var thousand = document.getElementById("1000").checked; 
    var girls = document.getElementById("girls").checked;
    var minorities = document.getElementById("minorities").checked;
    var boys = document.getElementById("boys").checked;
    
    origjson = data;
    places = [];
    
    for(i = 0; i < data.length; i++) {
        place = { type: 'Feature',             
                properties: {
                    title: data[i]["name"],
                    description: data[i]["description"],
                    'marker-color': data[i]["hexcolor"],
                    'marker-size': 'large',
                    'marker-symbol': data[i]["markersymbol12"],//lol for some reason the computer can't read any new columns i made so "eligibility" is now markersymbol and markersymbol is now markersymbol12
                    'paid': data[i]["paid"],
                    
                    
                },
                
                    geometry: {
                        type: 'Point',
                        coordinates: [data[i]["long"], data[i]["lat"]]
                    }
                
                }
                
        if(girls){
            if(data[i]["markersymbol"] == "girls"){
                Price(i);
            }
        }
        
        if(minorities){
           if(data[i]["markersymbol"] == "minorities"){
                Price(i);
            }
        }
        
        if(boys){
            if(data[i]["markersymbol"] == "boys"){
                Price(i);
            }
        }
        
        if(data[i]["markersymbol"] == "all"){
                Price(i);
        }    
        
    }

    geojson = { type: 'FeaturesCollection', features: places};
    setupMap(geojson);

}

function setupMap(geo) {
    myLayer.setGeoJSON(geo); // Adds all of the points to the map
    map.fitBounds(myLayer.getBounds());
    if(all){
        console.log("ALL OF THE STATES");
        map.setView([42.1230898, -120.7829876], 5);
    } else if(washAndOreg){
        map.setView([45.7892577, -121.0636012], 6);
    } else if (oregAndCali){
        map.setView([39.3337635, -121.454512], 6);
    } else if (cali){ 
        map.setView([37.4874786, -122.1907643], 6);
    } else if (oreg) {
        map.setView([44.2743164, -120.8971049], 7);
    } else if (wash) {
        map.setView([47.3655913, -120.1224026], 7);
    } 
}

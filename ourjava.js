L.mapbox.accessToken = 'pk.eyJ1IjoiamVmZnN0ZXJuIiwiYSI6IlAzRFFiN0EifQ.mNWvayrLEw9wULuq0sopyA';
var map = L.mapbox.map('map', 'alisonr.8b1a2d15');

map.featureLayer.on('click', function (e) {
    map.panTo(e.layer.getLatLng());
});

var myLayer = L.mapbox.featureLayer().addTo(map);
var geojson;
var origjson;
var geolocate = document.getElementById('geolocate');

function State() {
    var CA = document.getElementById("CA").checked, OR = document.getElementById("OR").checked, WA = document.getElementById("WA").checked;

    console.log("we're checking the variables");
    
    if (CA === true && WA === true && OR === true || CA === true && WA === true) {
        map.setView([42.1230898, -120.7829876], 5);
    } else if (WA === true && OR === true) {
        map.setView([45.7892577, -121.0636012], 6);
    } else if (OR === true && CA === true) {
        map.setView([39.3337635, -121.454512], 6);
    } else if (CA === true) {    
        map.setView([37.4874786, -122.1907643], 6);
    } else if (OR === true) {
        map.setView([44.2743164, -120.8971049], 7);
    } else if (WA === true) {
        map.setView([47.3655913, -120.1224026], 7);
    }
}

function spreadSheet() {
    Tabletop.init( { key: '1AvoprECsk38U2jdOYdnBrEX3vh6x2tD4ynjCgbLO1NY',
                   callback: function(data, tabletop) { console.log(data) },
                   simpleSheet: true } )
};


function convertToGeoJSON(data) {
    function music(i){
        if (data[i]["markersymbol12"] == "music"){
            console.log("music");
            places.push(place);
        }
    }
    
    function college(i){
        if(data[i]["markersymbol12"] == "college"){
            console.log("college");
            places.push(place);
        }
    }
    
    function city(i){
        if(data[i]["markersymbol12"] == "city"){
            console.log("city");
            places.push(place);
        }
    }
    
    function buisness(i){
        if(data[i]["markersymbol12"] == "commercial"){
            console.log("business");
            places.push(place);
        }
    }
     function science(i){
        if(data[i]["markersymbol12"] == "chemist"){
            console.log("science");
            places.push(place);
        }
    }
    
    function Price(i){
        
        if(zero == true){
            if(data[i]["paid"] < 500){
                if(musicBox == true){
                    music(i);
                }

                if(college == true){
                    college(i);
                }

                if(city == true){
                    city(i);
                }

                if(science == true){
                    science(i);
                }

                if(business == true){
                    buisness(i);
                }
            }
        }
        
        if(five == true){
            if(data[i]["paid"] > 500 && data[i]["paid"] < 1000){
                if(college == true){
                    college(i);
                }
                if(musicBox == true){
                    musicusic(i);
                }
                
                if(city == true){
                    city(i);
                }
                if(science == true){
                    science(i);
                }
                if(business == true){
                    business(i);
                }
                
            }
        }
        if(thousand == true){
            if(data[i]["paid"] > 1000){
                if(musicBox == true){
                    music(i);
                }
                
                if(college == true){
                    college(i);
                }
                
                if(city == true){
                    city(i);
                }
                
                if(science == true){
                    science(i);
                }
                
                if(buisness == true){
                    buisness(i);
                }
            }
        }
}
    var musicBox = document.getElementById("MusicBox").checked;
    var college = document.getElementById("College").checked;
    var city = document.getElementById("City").checked;
    var science = document.getElementById("Science").checked;
    var zero = document.getElementById("0").checked;
    var five = document.getElementById("500").checked;
    var thousand = document.getElementById("1000").checked; 
    var business = document.getElementById("Business").checked;
    var girls = document.getElementById("Girls").checked;
    var minorities = document.getElementById("Minorities").checked;
    var boys = document.getElementById("Boys").checked;
    
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
                
        console.log(places);
        
        if(girls == true){
            if(data[i]["markersymbol"] == "Girls"){
                Price(i);
            }
        }
        
        if(minorities == true){
           if(data[i]["markersymbol"] == "Minorities"){
               console.log("yikes!");
                Price(i);
            }
        }
        
        if(boys == true){
            if(data[i]["markersymbol"] == "Boys"){
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
    map.setView([47.3655913,-120.1224026],7);
}

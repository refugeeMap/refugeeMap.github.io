let map = L.map('map');
map.addControl(new L.Control.Fullscreen());
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    label: 'Street Map',
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);
let basemap = {"OpenStreetMap": osm};
map.setView([51.993330, 7.648760], 11);




let treffpunktMarker = '';

let createGeojsonFeaturen = (entry) => {
    let featureAttributes = JSON.stringify(entry);
    let schlagwortArray = entry.Schlagworte.split(",");
    let schlagwortListe =[];
    schlagwortArray.forEach(schlagwort =>{
        if(schlagwort!= ","){
            schlagwortListe.push('<li>'+schlagwort+'</li>')
        }
    });
    let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "entry": entry,
            "schlagwoerter": schlagwortArray,
            "popupContent": '<p><b>Institution: </b>' + entry.Name + '<br><b>Addresse: </b>' + entry.Adress +'<br>' +
                '<b>Telefon: </b><a href="tel:'+entry.Telefon+'">' + entry.Telefon +'</a>'+'<br>' +
                '<b>E-Mail: </b><a href="mailto:'+entry.Mail+'">' + entry.Mail +'</a>'+'<br>' +
                '    <ul id="schlagwortKarte"></ul>'+
                '<a href='+entry.Website +'>mehr Informationen</a>'+'<br>' +
                '<a href=https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(entry.Adress)+'>in GoogleMaps öffnen</a>'


        },
        "geometry": {
            "type": "Point",
            "coordinates": [parseFloat(entry.X), parseFloat(entry.Y)]
        }
    };
    return geojsonFeature;
};

/*let createArbeitLayer = ()=>{
    let arbeitIcon = new L.Icon({
        iconSize: [40, 40],
        iconAnchor: [13, 27],
        popupAnchor: [1, -24],
        iconUrl: 'imagefreizeitMarker'
    });

    let arbeitLayer = L.geoJSON("", {pointToLayer: function (geoJsonPoint, latlng){
            return L.marker(latlng, {icon: arbeitIcon});
        }}).bindPopup(function (layer) {

        return layer.feature.properties.popupContent;
    }).addTo(map);



};
const svgfreizeitMarker = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.981 7.009c-1.222-.733-2.473-.752-3.57-.254-.085 3.098-1.47 5.561-3.115 7.04.19.897.558 1.635.984 2.123l-1.204.733.729.437c-.875 1.531-1.372 4.054-1.228 6.442.015.265.236.47.499.47.287 0 .516-.242.499-.531-.146-2.422.402-4.65 1.086-5.867l.762.457.008-1.457c1.569.33 4.302-.524 5.818-3.253 1.282-2.309.995-4.983-1.268-6.34m-4.457-.55c0-3.566-2.051-6.459-5.542-6.459-3.493 0-5.543 2.893-5.543 6.459 0 4.384 2.709 7.077 4.751 7.697l-.954 1.542h1.151c-.544 1.958-.178 2.961.155 3.85.35.933.651 1.738-.132 3.772-.099.258.029.547.288.646l.179.034c.202 0 .391-.122.467-.321.918-2.388.521-3.452.136-4.48-.32-.857-.611-1.682-.047-3.501h1.325l-.96-1.552c2.039-.657 4.726-3.42 4.726-7.687m-9.32 10.634l.738-.442-1.232-.697c.425-.472.794-1.197.993-2.077-1.673-1.46-3.076-3.949-3.153-7.147-1.082-.471-2.313-.442-3.513.279-2.263 1.357-2.55 4.031-1.268 6.34 1.53 2.754 4.3 3.6 5.862 3.246l-.035 1.464.752-.452c1.005 1.65 1.317 4.058 1.156 5.848-.025.275.179.518.453.543l.047.002c.256 0 .474-.196.497-.455.164-1.822-.104-4.497-1.297-6.452m13.588-13.584l-1.182.009.653.985-.356 1.126 1.138-.317.963.687.05-1.181.95-.702-1.107-.413-.374-1.12-.735.926zm-19.199 15.329l-1.181.009.653.985-.356 1.127 1.138-.318.962.688.051-1.181.95-.702-1.108-.413-.374-1.121-.735.926zm.407-17.232c0 .769.625 1.393 1.395 1.393.769 0 1.394-.624 1.394-1.393s-.625-1.393-1.394-1.393c-.77 0-1.395.624-1.395 1.393m-2.001 3.131c0 .552.45 1 1.001 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1.001.448-1.001 1m17.371-3.737c0 .552.448 1 1 1s1.001-.448 1.001-1-.449-1-1.001-1c-.552 0-1 .448-1 1m2.371 17.12c.828 0 1.501.673 1.501 1.5 0 .828-.673 1.5-1.501 1.5-.828 0-1.501-.672-1.501-1.5 0-.827.673-1.5 1.501-1.5"/></svg>';
const blob = new Blob([svgfreizeitMarker], {type: 'image/svg+xml'});
const url = URL.createObjectURL(blob);
const imagefreizeitMarker = document.createElement('img');
imagefreizeitMarker.addEventListener('load', () => URL.revokeObjectURL(url), {once: true}, createArbeitLayer()
);
imagefreizeitMarker.src = url;*/


let arbeitIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Arbeit.png'
});
let arbeitLayer = L.geoJSON("", {pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:arbeitIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let wohnenIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Wohnen.png'
});
let wohnenLayer = L.geoJSON("", {pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:wohnenIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let treffpunkIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Treffpunkte.png'
});
let treffpunkLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:treffpunkIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let beratungIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Beratung.png'
});
let beratungLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:beratungIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let freizeitIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Freizeit.png'
});
let freizeitLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:freizeitIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let kinderIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Kinder.png'
});
let kinderLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:kinderIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let gesundheitIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Gesundheit.png'
});
let gesundheitLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:gesundheitIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let frauenIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Frauen.png'
});
let frauenLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:frauenIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let engagementIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Engagement.png'
});
let engagementLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:engagementIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let deutschkurseIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Deutschkurse.png'
});
let deutschkurseLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:deutschkurseIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let krankenhauserIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Krankenhaus.png'
});
let krankenhauserLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:krankenhauserIcon});
    }}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);


let addLayers =  () => {
    $.getJSON('mapData.json', data =>{
        let arbeit =[];
        let wohnen = [];
        let treffpunkte = [];
        let beratung = [];
        let deutschkurse = [];
        let freizeit = [];
        let kinder = [];
        let gesundheit = [];
        let frauen = [];
        let engagement = [];
        let krankenhauser = [];
        let zentralesAngebot = [];

        data.forEach(entry => {
            switch (entry.Thema){
                case "Arbeit":
                    arbeit.push(entry);
                    break;
                case "Freizeit":
                    freizeit.push(entry);
                    break;
                case "Wohnen":
                    wohnen.push(entry);
                    break;
                case "Treffpunkte":
                    treffpunkte.push(entry);
                    break;
                case "Beratung":
                    beratung.push(entry);
                    break;
                case "Kinder":
                    kinder.push(entry);
                    break;
                case "Gesundheit":
                    gesundheit.push(entry);
                    break;
                case "Frauen":
                    frauen.push(entry);
                    break;
                case "Engagement":
                    engagement.push(entry);
                    break;
                case "Deutschkurse":
                    deutschkurse.push(entry);
                    break;
                case "Krankenhaus":
                    krankenhauser.push(entry);
                    break;
            }
        });


        arbeit.forEach(entry =>{
            arbeitLayer.addData(createGeojsonFeaturen(entry));
        });
        wohnen.forEach(entry =>{
            wohnenLayer.addData(createGeojsonFeaturen(entry));
        });
        treffpunkte.forEach(entry =>{
            treffpunkLayer.addData(createGeojsonFeaturen(entry));
        });
        freizeit.forEach(entry =>{
            freizeitLayer.addData(createGeojsonFeaturen(entry));
        });
        kinder.forEach(entry =>{
            kinderLayer.addData(createGeojsonFeaturen(entry));
        });
        gesundheit.forEach(entry =>{
            gesundheitLayer.addData(createGeojsonFeaturen(entry));
        });
        frauen.forEach(entry =>{
            frauenLayer.addData(createGeojsonFeaturen(entry));
        });
        engagement.forEach(entry =>{
            engagementLayer.addData(createGeojsonFeaturen(entry));
        });
        deutschkurse.forEach(entry =>{
            deutschkurseLayer.addData(createGeojsonFeaturen(entry));
        });
        krankenhauser.forEach(entry =>{
            krankenhauserLayer.addData(createGeojsonFeaturen(entry));
        });



        let overlaymaps = {
            "Arbeit": arbeitLayer,
            "Wohnen": wohnenLayer,
            "Treffpunkt": treffpunkLayer,
            "Beratung": beratungLayer,
            "Freizeit": freizeitLayer,
            "Deutschkurse":deutschkurseLayer,
            "Frauen": frauenLayer,
            "Kinder": kinderLayer,
            "Engagement": engagementLayer,
            "Gesuzndheit": gesundheitLayer,
            "Krankenhaus": krankenhauserLayer
        };

        L.control.layers(basemap, overlaymaps).addTo(map);
    });
};

addLayers();
map.on('popupopen',e =>{
    e.popup._source.feature.properties.schlagwoerter.forEach(schlagwort =>{
        document.getElementById("schlagwortKarte").innerHTML +=  '<li>'+schlagwort+'</li>';
    })
});
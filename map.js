let map = L.map('map');
map.addControl(new L.Control.Fullscreen());
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    label: 'Street Map',
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);
let basemap = {"OpenStreetMap": osm};
map.setView([51.961302, 7.629351], 14);




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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

let angebotIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Angebot.png'
});
let angebotLayer = L.geoJSON("",{pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon:angebotIcon});
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
            if(entry[""] == "Zentrales Angebot"){
                zentralesAngebot.push(entry);
            }
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


        zentralesAngebot.forEach(entry =>{
            angebotLayer.addData(createGeojsonFeaturen(entry));
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
            "Zentrale Angebote": angebotLayer,
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
    if(e.popup._source.feature.properties.schlagwoerter[0] != ""){
        e.popup._source.feature.properties.schlagwoerter.forEach(schlagwort =>{
            document.getElementById("schlagwortKarte").innerHTML +=  '<li>'+schlagwort+'</li>';
        })
    }

});
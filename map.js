let map = L.map('map');
let layerControl;
map.addControl(new L.Control.Fullscreen());
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    label: 'Street Map',
    maxZoom: 20,
    attribution: 'Map data &copy; OpenStreetMap contributors'
});
/**
 * Die ersten zwei Zahlen beschreiben die Koordinaten der Anfangs-Ansicht der Karte,
 * die letzte Zahl beschreibt die initiale Zoomstufe**/
map.setView([51.957807, 7.628878], 13);

/**
 * Hier werden die beiden Grundkarten erzeugt
 **/
let CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

var satelit = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

let basemap = {
    "Straßen": CartoDB_Voyager,
    "Satellit": satelit
};

let createGeojsonFeaturen = (entry) => {
    let featureAttributes = JSON.stringify(entry);
    let schlagwortArray = entry.Schlagworte.split(",");
    let geojsonFeature = {
        "type": "Feature",
        /**
         * hier wird der Name und die Adresse der Institution in das Popup geschrieben**/
        "properties": {
            "entry": entry,
            "popupContent": '<p><b>' + entry.Name + '</b><br><br>' + entry.Adress + '<br>'
        },
        "geometry": {
            "type": "Point",
            "coordinates": [parseFloat(entry.X), parseFloat(entry.Y)]
        }
    };
    /**
     * Hier wird überprüft ob eine Telefonnummer hinterlegt ist und ggf zum Popup hinzugefügt**/
    if (entry.Telefon) {
        geojsonFeature.properties.popupContent += '<b>Telefon: </b><a href="tel:' + entry.Telefon + '">' + entry.Telefon + '</a>' + '<br>'
    }
    /**
     * Hier wird überprüft ob eine E-Mail Adresse hinterlegt ist und ggf zum Popup hinzugefügt**/
    if (entry.Mail) {
        geojsonFeature.properties.popupContent += '<b>E-Mail: </b><a href="mailto:' + entry.Mail + '">' + entry.Mail + '</a>' + '<br>'
    }
    /**
     * Hier wird überprüft ob Schlagwörter hinterlegt sind und ggf zum Popup hinzugefügt**/
    if (schlagwortArray[0] != "") {
        geojsonFeature.properties.popupContent += "<ul>";
        schlagwortArray.forEach(schlagwort => {
            geojsonFeature.properties.popupContent += '<b>Angebote:</b><br> + <li>' + schlagwort + '</li>';
        });
        geojsonFeature.properties.popupContent += "</ul>"
    }
    
    /**
    if (schlagwortArray[0] != "") {
        geojsonFeature.properties.popupContent += "<ul>";
        schlagwortArray.forEach(schlagwort => {
            geojsonFeature.properties.popupContent += '<li>' + schlagwort + '</li>';
        });
        geojsonFeature.properties.popupContent += "</ul>"
    }**/
    
    /**
     * Hier wird überprüft die Website und die Google-Suche hinzugefügt**/
    geojsonFeature.properties.popupContent +=
        '<a target="_blank" href=' + entry.Website + '>mehr Informationen</a>' + '<br>' +
        '<a target="_blank" href=https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(entry.Adress) + '>in GoogleMaps öffnen</a>';


    return geojsonFeature;
};

/**
 * Hier werden die verschiedenen Layer definiert. Zuerst das Icon und dann die Layer selbst**/
let arbeitIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Arbeit.png'
});
let arbeitLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: arbeitIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let wohnenIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Wohnen.png'
});
let wohnenLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: wohnenIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let treffpunkIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Treffpunkte.png'
});
let treffpunkLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: treffpunkIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let beratungIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Beratung.png'
});
let beratungLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: beratungIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let freizeitIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Freizeit.png'
});
let freizeitLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: freizeitIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let kinderIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Kinder.png'
});
let kinderLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: kinderIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let gesundheitIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Gesundheit.png'
});
let gesundheitLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: gesundheitIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let frauenIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Frauen.png'
});
let frauenLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: frauenIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let engagementIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Engagement.png'
});
let engagementLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: engagementIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let deutschkurseIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Deutschkurse.png'
});
let deutschkurseLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: deutschkurseIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let krankenhauserIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Krankenhaus.png'
});
let krankenhauserLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: krankenhauserIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

let angebotIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [13, 27],
    popupAnchor: [1, -24],
    iconUrl: 'Angebot.png'
});
let angebotLayer = L.geoJSON("", {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: angebotIcon});
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

/**
 * Diese Funktion greift auf die Daten zu, befüllt die Layer und fügt die der Karte hinzu**/
let addLayers = () => {
    $.getJSON('mapData.json', data => {
        let arbeit = [];
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
            if (entry[""] == "Zentrales Angebot") {
                zentralesAngebot.push(entry);
            }
            switch (entry.Thema) {
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


        zentralesAngebot.forEach(entry => {
            angebotLayer.addData(createGeojsonFeaturen(entry));
        });

        arbeit.forEach(entry => {
            arbeitLayer.addData(createGeojsonFeaturen(entry));
        });
        wohnen.forEach(entry => {
            wohnenLayer.addData(createGeojsonFeaturen(entry));
        });
        treffpunkte.forEach(entry => {
            treffpunkLayer.addData(createGeojsonFeaturen(entry));
        });
        freizeit.forEach(entry => {
            freizeitLayer.addData(createGeojsonFeaturen(entry));
        });
        beratung.forEach(entry => {
            beratungLayer.addData(createGeojsonFeaturen(entry));
        });
        kinder.forEach(entry => {
            kinderLayer.addData(createGeojsonFeaturen(entry));
        });
        gesundheit.forEach(entry => {
            gesundheitLayer.addData(createGeojsonFeaturen(entry));
        });
        frauen.forEach(entry => {
            frauenLayer.addData(createGeojsonFeaturen(entry));
        });
        engagement.forEach(entry => {
            engagementLayer.addData(createGeojsonFeaturen(entry));
        });
        deutschkurse.forEach(entry => {
            deutschkurseLayer.addData(createGeojsonFeaturen(entry));
        });
        krankenhauser.forEach(entry => {
            krankenhauserLayer.addData(createGeojsonFeaturen(entry));
        });


        let overlaymaps = {
            "Zentrale Angebote": angebotLayer,
            "Arbeit": arbeitLayer,
            "Wohnen": wohnenLayer,
            "Treffpunkt": treffpunkLayer,
            "Beratung": beratungLayer,
            "Freizeit": freizeitLayer,
            "Deutschkurse": deutschkurseLayer,
            "Frauen": frauenLayer,
            "Kinder": kinderLayer,
            "Engagement": engagementLayer,
            "Gesundheit": gesundheitLayer,
            "Krankenhaus": krankenhauserLayer
        };

        layerControl = L.control.layers(basemap, overlaymaps).addTo(map);
    });
};

addLayers();

map.on('click', (e) => {
    layerControl.collapse();
});
map.on('popupopen', (e) => {
    layerControl.collapse();
});

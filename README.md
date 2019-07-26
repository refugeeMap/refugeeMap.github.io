# refugeeMap.github.io
This webmap is an interactive map for refugees coming to Münster and need to find places.

To add data to the map add an entry to the mapData.json file. This need to follow the following structure:

{
    "Name": "",
    "Adress": "",
    "X": ,
    "Y": ,
    "Kategorie": "",
    "": "",
    "Thema": "",
    "Beschreibung": "",
    "Website": "",
    "__1": "",
    "Telefon": "",
    "Mail": "",
    "Schlagworte": ""
  }
  
  where X and Y are Longitude and Latitude of the Institution and need to be entered as a number.
  Please make sure that if you enter an address that you only put in the address without for example floors as the address is used to perform a search in Google Maps.

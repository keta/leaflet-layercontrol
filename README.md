L.LayerControl
==============

Basic Leaflet control to toggle particular layer.

Check out the [example](http://sashakavun.github.io/leaflet-layercontrol/example.html).

Usage
-----

Create layer, control and add them to the map:

```js
var layer = L.tileLayer("http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png", {
  "attribution": "Map data &copy; <a href=\"http://openweathermap.org\">OpenWeatherMap</a>",
  "opacity": 0.5
});
var control = L.layerControl({
  "layer": myLayer
  "html": "❤"
});
control.addTo(map);
```

If you want layer to be shown initially, pass `true` as `show` option.


Development
-----------

Project requires `npm` for development environment.

To set up, run following command in the project's directory:

```
npm install
```

To build minified file, run `build` Grunt task in the project's directory:

```
grunt build
```


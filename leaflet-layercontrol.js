/**
 * L.LayerControl
 * 0.0.1
 *
 * Toggle layer control for Leaflet
 * http://github.com/keta/leaflet-layercontrol
 *
 * Copyright 2013, Aleksandr "keta" Kavun
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */
/*global L*/
(function () {
    "use strict";

    L.LayerControl = L.Control.extend({
        options: {
            "title": "Toggle layer",
            "html": "",
            "switchedOnClass": "leaflet-layercontrol-on",
            "switchedOffClass": "leaflet-layercontrol-off",
            "position": "topright",
            "show": false,
            "layer": null
        },

        /**
         * @param {object} options
         */
        initialize: function (options) {
            L.Control.prototype.initialize.apply(this, arguments);
            this._layer = this.options.layer;
        },

        /**
         * @param {L.Map} map
         */
        onAdd: function (map) {
            if (this.options.show) {
                this.showLayer();
            }
            return this._createButton();
        },

        onRemove: function (map) {
            if (this._layer) {
                this.hideLayer();
            }
        },

        _createButton: function () {
            // Copied from L.Control.Zoom
            var stop = L.DomEvent.stopPropagation;
            var container = L.DomUtil.create("div", "leaflet-bar leaflet-layercontrol " + this._getClassName(this.options.show));
            var link = L.DomUtil.create("a", "", container);
            link.innerHTML = this.options.html;
            link.href = "#";
            link.title = this.options.title;
            L.DomEvent
                .on(link, "click", stop)
                .on(link, "mousedown", stop)
                .on(link, "dblclick", stop)
                .on(link, "click", L.DomEvent.preventDefault)
                .on(link, "click", this.toggle, this);
            return container;
        },

        toggle: function () {
            var state = this.toggleLayer();
            this._toggleClass(state);
        },

        /**
         * @param {boolean} state
         * @private
         */
        _toggleClass: function (state) {
            L.DomUtil.removeClass(this._container, this._getClassName(!state));
            L.DomUtil.addClass(this._container, this._getClassName(state));
        },

        /**
         * @param state
         * @returns {string}
         * @private
         */
        _getClassName: function (state) {
            if (state) {
                return this.options.switchedOnClass;
            } else {
                return this.options.switchedOffClass
            }
        },

        /**
         *
         * @param {boolean} [enable]
         * @returns {boolean}
         */
        toggleLayer: function (enable) {
            if ((enable === false) || this._map.hasLayer(this._layer)) {
                return !this.hideLayer();
            } else {
                return this.showLayer();
            }
        },

        showLayer: function () {
            if (this._layer) {
                if (!this._map.hasLayer(this._layer)) {
                    this._map.addLayer(this._layer);
                    return true;
                }
            }
            return false;
        },

        hideLayer: function () {
            if (this._layer) {
                if (this._map.hasLayer(this._layer)) {
                    this._map.removeLayer(this._layer);
                    return true;
                }
            }
            return false;
        }
    });

    L.layerControl = function (options) {
        return new L.LayerControl(options);
    };

})();

/**
 * L.LayerControl
 * 0.1.1
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
            "html": "✚",
            "onClassName": "on",
            "offClassName": "off",
            "offOpacity": 0.6,
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
            return this._createButton(map);
        },

        /**
         * @param {L.Map} map
         */
        onRemove: function (map) {
            if (this._layer) {
                this.hideLayer();
            }
        },

        /**
         * @param {L.Map} map
         * @returns {HTMLDivElement}
         * @private
         */
        _createButton: function (map) {
            // Copied from L.Control.Zoom
            var stop = L.DomEvent.stopPropagation;
            var container = L.DomUtil.create("div", "leaflet-bar leaflet-layercontrol");
            var link = L.DomUtil.create("a", "", container);
            var content = L.DomUtil.create("span", "", link);
            content.innerHTML = this.options.html;
            link.href = "#";
            link.title = this.options.title;
            if (!this.options.show) {
                L.DomUtil.setOpacity(content, this.options.offOpacity);
                L.DomUtil.addClass(container, this.options.offClassName);
            }
            L.DomEvent
                .on(link, "click", stop)
                .on(link, "mousedown", stop)
                .on(link, "dblclick", stop)
                .on(link, "click", L.DomEvent.preventDefault)
                .on(link, "click", this.toggle, this);
            this._linkContent = content;
            return container;
        },

        toggle: function () {
            var state = this.toggleLayer();
            this._toggle(state);
        },

        /**
         * @param {boolean} state
         * @private
         */
        _toggle: function (state) {
            L.DomUtil.addClass(this._container, this._getClassName(state));
            L.DomUtil.removeClass(this._container, this._getClassName(!state));
            L.DomUtil.setOpacity(this._linkContent, state ? 1 : this.options.offOpacity);
        },

        /**
         * @param state
         * @returns {string}
         * @private
         */
        _getClassName: function (state) {
            if (state) {
                return this.options.onClassName;
            } else {
                return this.options.offClassName;
            }
        },

        /**
         * @param {boolean} [enable]
         * @returns {boolean}
         */
        toggleLayer: function (enable) {
            if (true === enable) {
                return this.showLayer();
            } else if ((false === enable) || this._map.hasLayer(this._layer)) {
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

}());

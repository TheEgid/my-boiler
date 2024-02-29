import React, { useEffect } from "react";
import { type Coordinate } from "ol/coordinate";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import OSM from "ol/source/OSM";
import { Style, Fill, Stroke, Circle } from "ol/style";
import View from "ol/View";

const MapComponent = ({ startCoordinates }): JSX.Element => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const vectorLayer = new VectorLayer({
        source: new VectorSource(),
    });

    useEffect(() => {
        const startPos = fromLonLat(startCoordinates);

        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: startPos,
                zoom: 10,
            }),
        });

        const markerStyle = new Style({
            image: new Circle({
                radius: 3,
                fill: new Fill({
                    color: "red",
                }),
                stroke: new Stroke({
                    color: "black",
                    width: 6,
                }),
            }),
        });

        map.addLayer(vectorLayer);

        const olCoordinates = startCoordinates.map((coord: { x: any; y: any }) => [coord.x, coord.y]);

        olCoordinates.forEach((coord: Coordinate) => {
            const markerPosition = fromLonLat(coord);
            const marker = new Feature(new Point(markerPosition));
            marker.setStyle(markerStyle);

            vectorLayer.getSource().addFeature(marker);
        });

        return () => {
            map.setTarget(null);
        };
    }, [startCoordinates, vectorLayer]);

    return (
        <div style={{ position: "relative", width: "100%", height: "400px" }}>
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
        </div>
    );
};

export default MapComponent;

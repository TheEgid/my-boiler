import React, { useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
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

const CustomButton = ({ text, onClick, colorScheme, variant, icon }): JSX.Element => (
    <Button onClick={onClick} leftIcon={icon} colorScheme={colorScheme} variant={variant}>
        {text}
    </Button>
);

const MapComponent = ({ mcoordinates }): JSX.Element => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const vectorLayer = new VectorLayer({
        source: new VectorSource(),
    });

    useEffect(() => {
        // Create a new OpenLayers map
        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 14,
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

        const olCoordinates = mcoordinates.map((coord: { x: any; y: any }) => [coord.x, coord.y]);

        olCoordinates.forEach((coord: Coordinate) => {
            console.log("coord:", coord);
            const markerPosition = fromLonLat(coord);
            const marker = new Feature(new Point(markerPosition));
            marker.setStyle(markerStyle);

            vectorLayer.getSource().addFeature(marker);
        });

        const handleCurrentLocation = (): void => {
            // Get the current location using the Geolocation API
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coordinates = [position.coords.longitude, position.coords.latitude];
                    const currentPosition = fromLonLat(coordinates);

                    const marker = new Feature(new Point(currentPosition));

                    vectorLayer.getSource().addFeature(marker);

                    map.getView().setCenter(currentPosition);
                    map.getView().setZoom(10);

                    console.log("Current Location Coordinates:", coordinates);
                },
                (error) => {
                    console.error("Error getting current location:", error.message);
                }
            );
        };

        // Add a double click event listener to the map
        handleCurrentLocation();

        // Clean up function to destroy the map when the component unmounts
        return () => {
            map.setTarget(null);
        };
    }, [mcoordinates, vectorLayer]);

    const removeCoordinates = (): void => {
        vectorLayer.getSource().clear();
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <div id="map" style={{ width: "100%", height: "100vh" }}></div>
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <CustomButton
                    text={"Remove Coordinates"}
                    colorScheme={"red"}
                    icon={<DeleteIcon />}
                    variant={"solid"}
                    onClick={removeCoordinates}></CustomButton>
            </div>
        </div>
    );
};

export default MapComponent;

// useGeographic();

// const mapRef = useRef<HTMLDivElement>(null);

// useEffect(() => {
//     if (mapRef.current) {
//         const map = new Map({
//             target: mapRef.current,
//             layers: [
//                 new TileLayer({
//                     source: new OSM(),
//                 }),
//             ],
//             view: new View({
//                 center: [37.56736034551953, 55.64960384473913],
//                 zoom: 14,
//             }),
//         });

//         // Create a marker feature
//         const marker = new Feature({
//             geometry: new Point(fromLonLat([37.56736034551953, 55.64960384473913])),
//         });

//         const vectorLayer = new VectorLayer({
//             source: new VectorSource(),
//         });

//         // Add the marker feature to the vector layer
//         vectorLayer.getSource().addFeature(marker);

//         return () => {
//             map.dispose();
//         };
//     }
// }, []);

// const marker = new Overlay({
//     position: fromLonLat([37.56736034551953, 55.64960384473913]),
//     positioning: "center-center",
//     element: document.getElementById("marker"),
// });

// map.addOverlay(marker);

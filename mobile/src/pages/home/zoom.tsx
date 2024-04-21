import React, { useState, useEffect, useRef } from "react";
import MapView, { Camera, Marker } from "react-native-maps";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { useGetAllPlantQuery } from "../../services/user/user";

//@ts-ignore
import mapPin from "../../../assets/icons/plantPin.png";
//@ts-ignore
import mapPinBig from "../../../assets/icons/plantPinBig.png";

interface MapProps {
  markers: {
    _id: string;
    latitude: number;
    longitude: number;
    name: string;
  }[];
}

const MapMarkerAutoZoom = ({ markers }: MapProps) => {
  const [region, setRegion] = useState();
  const mapRef = useRef();
  const res = useGetAllPlantQuery();

  // useEffect(() => {
  //   if (mapRef.current) {
  //     // list of _id's must same that has been provided to the identifier props of the Marker
  //     // @ts-ignore
  //     mapRef.current.fitToSuppliedMarkers(markers.map(({ _id }) => _id));
  //   }
  // }, [markers]);

  useEffect(() => {
    if (mapRef.current) {
      const newCamera: Camera = {
        center: {
          latitude: 34.070467452049336,
          longitude: -118.44688096398609,
        },
        heading: 90,
        pitch: 50,
        altitude: 500,
      };

      // @ts-ignore
      mapRef.current.animateCamera(newCamera, { duration: 0 });
    }
  }, []);

  const [zoomLevel, setZoomLevel] = useState(0);

  const handleRegionChange = (newRegion) => {
    const zoom = Math.log2(360 / newRegion.longitudeDelta);
    setZoomLevel(zoom);
  };

  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      ref={mapRef}
      initialRegion={region}
      region={region}
      onRegionChange={handleRegionChange}
      showsUserLocation
    >
      {markers.map((marker) => (
        <Marker
          key={marker._id}
          identifier={marker._id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.name}
        />
      ))}
      {res.data &&
        res.data.plants.map((plant) => (
          <Marker
            image={zoomLevel > 14.5 ? mapPin : mapPinBig}
            key={plant.id}
            identifier={plant.id}
            coordinate={{
              latitude: plant.coord[0],
              longitude: plant.coord[1],
            }}
            centerOffset={{ x: 0, y: -10 }}
            title={plant.name}
          />
        ))}
    </MapView>
  );
};

MapMarkerAutoZoom.defaultProps = {
  markers: [],
};

MapMarkerAutoZoom.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

const mapStyle=[
  {
    "featureType": "poi.business",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapMarkerAutoZoom;

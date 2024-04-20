import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

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

  useEffect(() => {
    if (mapRef.current) {
      // list of _id's must same that has been provided to the identifier props of the Marker
      // @ts-ignore
      mapRef.current.fitToSuppliedMarkers(markers.map(({ _id }) => _id));
    }
  }, [markers]);

  return (
    <MapView
      style={styles.map}
      ref={mapRef}
      initialRegion={region}
      region={region}
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

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapMarkerAutoZoom;

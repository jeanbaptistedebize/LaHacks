import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as Location from "expo-location";
import MapMarkerAutoZoom from "./zoom";
import TopBar from "../../components/Topbar";

export default function Home() {
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (!location) return <></>;

  const userCoords = [
    {
      _id: "1",
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      name: "try",
    },
  ];
  return (
    <View style={styles.container}>
      <TopBar />
      <MapMarkerAutoZoom markers={userCoords} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

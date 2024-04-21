import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";
import MapMarkerAutoZoom from "./zoom";
import TopBar from "../../components/Topbar";
// @ts-ignore
import FLORAMAP from "../../../assets/floramap.png";

export default function Home() {
  const [location, setLocation] = useState<Location.LocationObject>({
    // @ts-ignore
    coords: {
      latitude: 34.070467452049336,
      longitude: -118.44688096398609,
    },
  });
  const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     console.log(location);
  //     setLocation(location);
  //   })();
  // }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (!location)
    return (
      <View style={{ justifyContent: "center", height: "100%" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  const userCoords = [
    // {
    //   _id: "1",
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   name: "try",
    // },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          width: 200,
          height: 100,
          zIndex: 5,
          padding: 20,
        }}
      >
        <ImageBackground
          resizeMode="contain"
          source={FLORAMAP}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <MapMarkerAutoZoom markers={userCoords} />
      <TopBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

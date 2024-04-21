import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAddPlantMutation } from "../../services/user/user";
import TopBar from "../../components/Topbar";

//@ts-ignore
import mapPinBig from "../../../assets/gifs/firework.gif";
import BottomDrawerMenu from "../../components/plantDescription";
import * as Location from "expo-location";

export default function CameraPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [plantSelected, setPlantSelected] = useState(null);
  const [plantNameIsLoading, setPlantNameIsLoading] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [addPlant] = useAddPlantMutation();
  const [location, setLocation] = useState<Location.LocationObject>({
    // @ts-ignore
    coords: {
      latitude: 34.070467452049336,
      longitude: -118.44688096398609,
    },
  });

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const getPlant = async (imageb64: string) => {
    try {
      setPlantSelected(null);
      setPlantNameIsLoading(true);
      if (!location) throw new Error("here");
      const t = await addPlant({
        coord: [location.coords.latitude, location.coords.longitude],
        image: imageb64,
      }).unwrap();

      setPlantNameIsLoading(false);
      setPlantSelected({ ...t, image: imageb64 });
    } catch (error) {
      console.error(error);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      await getPlant(photo.base64);
      toggleMenu();
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCameraRef(ref)}
        autoFocus
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            marginTop: 64,
          }}
        >
          {plantNameIsLoading && (
            <View style={{ paddingTop: 100 }}>
              <ActivityIndicator size="large" color="#AB97F9" />
              <Text
                style={{ ...styles.text, textAlign: "center", marginTop: 20 }}
              >
                We are curently processing your image!!
              </Text>
            </View>
          )}
          {isMenuOpen && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={mapPinBig}
                style={{ width: 100, height: 100, alignSelf: "center" }}
              />
              <Image
                source={mapPinBig}
                style={{ width: 100, height: 100, alignSelf: "center" }}
              />
            </View>
          )}
        </View>
        {/* {!isMenuOpen && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleMenu}>
              <Text style={styles.text}>Take Picure</Text>
            </TouchableOpacity>
          </View>
        )} */}
        {isMenuOpen && (
          <BottomDrawerMenu
            isOpen={isMenuOpen}
            onClose={toggleMenu}
            delay={300}
            plant={plantSelected}
          />
        )}
      </Camera>
      <TopBar isCameraPage onCameraClick={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 200,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

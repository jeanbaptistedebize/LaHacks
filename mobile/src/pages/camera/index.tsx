import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useAddPlantMutation } from "../../services/user/user";
import TopBar from "../../components/Topbar";

//@ts-ignore
import mapPinBig from "../../../assets/gifs/firework.gif";

export default function CameraPage() {
  const [type, setType] = useState(CameraType.back);
  const [plantName, setPlantName] = useState(null);
  const [plantNameIsLoading, setPlantNameIsLoading] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [addPlant] = useAddPlantMutation();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

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
    console.log("here");
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const getPlant = async (imageb64: string) => {
    try {
      setPlantName(null);
      setPlantNameIsLoading(true);

      const t = await addPlant({
        type: "FLOWER",
        name: "ROSE",
        coord: [0, 0],
        image: imageb64,
      }).unwrap();
      setPlantNameIsLoading(false);
      setPlantName(t.name);
    } catch (error) {
      console.error(error);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      await getPlant(photo.base64);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCameraRef(ref)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            marginTop: 200,
          }}
        >
          <Text style={{ ...styles.text, alignSelf: "center", marginTop: 20 }}>
            {plantNameIsLoading ? "Is loading..." : plantName}
          </Text>
          {plantName && (
            <Image
              source={mapPinBig}
              style={{ width: 100, height: 100, alignSelf: "center" }}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picure</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TopBar />
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
    backgroundColor: "transparent",
    margin: 64,
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

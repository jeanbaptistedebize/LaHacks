import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLoginMutation } from "../../services/auth/auth";
import { useAddPlantMutation } from "../../services/user/user";
import TopBar from "../../components/Topbar";

export default function CameraPage() {
  const [type, setType] = useState(CameraType.back);
  const [plantName, setPlantName] = useState("loading");
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [login, { isLoading }] = useLoginMutation();
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
      // const t = await login({
      //   email: "test@test.test",
      //   password: "1234aaBB@",
      // }).unwrap();

      setPlantName("loading...");
      const t = await addPlant({
        type: "FLOWER",
        name: "ROSE",
        coord: [0, 0],
        image: imageb64,
      }).unwrap();
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
      <TopBar />
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCameraRef(ref)}
      >
        <Text style={{ ...styles.text, alignSelf: "center", marginTop: 20 }}>
          {plantName}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picure</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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

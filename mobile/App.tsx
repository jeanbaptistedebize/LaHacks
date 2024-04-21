import { NativeBaseProvider, Text } from "native-base";
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./src/pages/home";
import { useEffect } from "react";
import { LogBox } from "react-native";
import CameraPage from "./src/pages/camera";
import Collection from "./src/pages/collection";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { useFonts } from "expo-font";
import { Itim_400Regular } from "@expo-google-fonts/itim";
import SplashScreen from "./src/pages/splashScreen";

function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
    LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
  });

  return (
    <NativeBaseProvider>
      <NativeRouter>
        <Provider store={store}>
          <Routes>
            <Route Component={SplashScreen} path="/" />
            <Route Component={Home} path="home" />
            <Route Component={CameraPage} path="camera" />
            <Route Component={Collection} path="collection" />
          </Routes>
        </Provider>
      </NativeRouter>
    </NativeBaseProvider>
  );
}

export default App;

import { NativeBaseProvider, Text } from "native-base";
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./src/pages/home";
import { useEffect } from "react";
import { LogBox } from "react-native";
import CameraPage from "./src/pages/camera";
import { Provider } from "react-redux";
import { store } from "./src/store";

function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
  }, []);
  return (
    <NativeBaseProvider>
      <NativeRouter>
        <Provider store={store}>
          <Routes>
            <Route Component={Home} path="" />
            <Route Component={CameraPage} path="camera" />
          </Routes>
        </Provider>
      </NativeRouter>
    </NativeBaseProvider>
  );
}

export default App;

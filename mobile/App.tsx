import { NativeBaseProvider, Text } from "native-base";
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./src/pages/home";
import { useEffect } from "react";
import { LogBox } from "react-native";

function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
  }, []);
  return (
    <NativeBaseProvider>
      <NativeRouter>
        <Routes>
          <Route Component={Home} path="" />
        </Routes>
      </NativeRouter>
    </NativeBaseProvider>
  );
}

export default App;

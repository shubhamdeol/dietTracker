import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { ThemeProvider } from "react-native-magnus";
import { RecoilRoot } from "recoil";

import Persister from "./atoms/Persister";
import { Navigation } from "./navigation";

export const persistInfo: any = {};

export default function App() {
  const [loaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <RecoilRoot>
        <Persister>
          <SafeAreaView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 0 }} />
            <StatusBar style="auto" />
            <Navigation />
          </SafeAreaView>
        </Persister>
      </RecoilRoot>
    </ThemeProvider>
  );
}

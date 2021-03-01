import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { ThemeProvider } from "react-native-magnus";
import { RecoilRoot } from "recoil";

import { Navigation } from "./navigation";
import Persister from "./store/Perister";

export const persistInfo: any = {};

export default function App() {
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

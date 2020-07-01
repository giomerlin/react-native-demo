import {
  Muli_300Light,
  Muli_400Regular,
  useFonts,
} from "@expo-google-fonts/muli";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import {
  configureFonts,
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";
import Navigation from "./navigation";
import rootSaga from "./sagas";
import configureStore from "./store";
import { RootState } from "./types/state";

const initialState: RootState = {};
const { store, runSaga } = configureStore(initialState);
runSaga(rootSaga);

export default function App() {
  let [fontsLoaded] = useFonts({
    Muli_300Light,
    Muli_400Regular,
  });

  const colorScheme = useColorScheme();

  if (!fontsLoaded) {
    return null;
  }

  const baseTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const theme = {
    ...baseTheme,
    fonts: configureFonts({
      default: {
        regular: {
          fontFamily: "Muli_400Regular",
          fontWeight: "normal",
        },
        medium: {
          fontFamily: "sans-serif-medium",
          fontWeight: "normal",
        },
        light: {
          fontFamily: "Muli_300Light",
          fontWeight: "normal",
        },
        thin: {
          fontFamily: "sans-serif-thin",
          fontWeight: "normal",
        },
      },
    }),
  };

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

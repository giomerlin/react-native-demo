import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from "react-native-paper";
import {
  Muli_300Light,
  Muli_400Regular,
  useFonts,
} from "@expo-google-fonts/muli";
import { RootState } from "./types/state";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider as StoreProvider } from "react-redux";
import { useColorScheme } from "react-native";
import Navigation from "./navigation";
import React from "react";
import ToastProvider from "./components/toast";
import configureStore from "./store";
import rootSaga from "./sagas";

const initialState: RootState = {};
const { store, runSaga } = configureStore(initialState);
runSaga(rootSaga);

export default function App() {
  const [fontsLoaded] = useFonts({
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
          <ToastProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ToastProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

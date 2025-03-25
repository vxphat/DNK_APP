import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import { store } from "../store";
import { RootState } from "../store"; // Import để lấy token từ Redux
import "../locales/i18n"; 

// Ngăn splash screen tự động ẩn trước khi tải xong asset
SplashScreen.preventAutoHideAsync();

function MainApp() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
      <Stack.Screen name="handle" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="history" />
      <Stack.Screen name="setting" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

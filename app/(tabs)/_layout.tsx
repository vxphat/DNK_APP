import React from "react";
import { Tabs } from "expo-router";
import { MyTabBar } from "@/components/TabBar";
import { useTranslation } from "react-i18next";


const TabLayout = () => {
  const { t, i18n } = useTranslation();
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: t("home") }}></Tabs.Screen>
      <Tabs.Screen name="handle" options={{ title:  t("ManualInput") }}></Tabs.Screen>
      <Tabs.Screen name="scan" options={{ title: "Quét Qr" }}></Tabs.Screen>
      <Tabs.Screen name="history" options={{ title:  t("history") }}></Tabs.Screen>
      <Tabs.Screen name="setting" options={{ title:  t("setting") }}></Tabs.Screen>
      
    </Tabs>
  );
};

export default TabLayout;

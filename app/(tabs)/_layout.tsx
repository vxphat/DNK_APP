import React from "react";
import { Tabs } from "expo-router";
import { MyTabBar } from "@/components/TabBar";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Trang chủ" }}></Tabs.Screen>
      <Tabs.Screen name="handle" options={{ title: "Nhập tay" }}></Tabs.Screen>
      <Tabs.Screen name="history" options={{ title: "Lịch sử" }}></Tabs.Screen>
      <Tabs.Screen name="setting" options={{ title: "Cài đặt" }}></Tabs.Screen>
    </Tabs>
  );
};

export default TabLayout;

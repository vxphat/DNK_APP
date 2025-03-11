import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Cài Đặt", headerShown: false }}
      />
      <Stack.Screen
        name="changePassword"
        options={{ title: "Đổi Mật Khẩu", headerShown: false }}
      />
      <Stack.Screen
        name="language"
        options={{ title: "Ngôn Ngữ", headerShown: false }}
      />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function HandleLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Nhập tay", headerShown: false }}
      />
      <Stack.Screen
        name="details_slot"
        options={{ title: "Thông tin lô hàng", headerShown: false }}
      />
      <Stack.Screen
        name="details_testing"
        options={{ title: "Kết quả kiểm phẩm", headerShown: false }}
      />
      <Stack.Screen
        name="details_farm"
        options={{ title: "Thông tin vườn cây", headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Đăng nhập", headerShown: false }}
      />
      <Stack.Screen
        name="camera"
        options={{ title: "Test Camera", headerShown: false }}
      />
      <Stack.Screen
        name="details_map"
        options={{ title: "Test Camera", headerShown: false }}
      />
    </Stack>
  );
}

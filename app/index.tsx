import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function IndexScreen() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        router.replace("./tabs"); // Điều hướng vào _layout trong thư mục tabs
      } else {
        router.replace("/login");
      }
    }, 1000); // Giả lập load dữ liệu
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#05D781" />
      <Text style={{ marginTop: 10 }}>Đang kiểm tra dữ liệu...</Text>
    </View>
  );
}

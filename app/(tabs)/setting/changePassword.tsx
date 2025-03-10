import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function DoiMatKhauScreen() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Đổi mật khẩu</Text>

      <TextInput
        placeholder="Mật khẩu cũ"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Mật khẩu mới"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          alert("Mật khẩu đã được thay đổi!");
          router.back();
        }}
        style={{
          padding: 15,
          backgroundColor: "green",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Xác nhận đổi mật khẩu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "red",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

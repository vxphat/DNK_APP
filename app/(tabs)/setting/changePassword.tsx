import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function DoiMatKhauScreen() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <LinearGradient
        // Button Linear Gradient
        colors={["#05D781", "#039375"]}
        style={{
          flexDirection: "row",
          height: 60,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ width: "5%" }}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Image
              source={require("../../../assets/icon/icons8-back-48.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
            Đổi Mật Khẩu
          </Text>
        </View>
      </LinearGradient>

      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("../../../assets/images/Logo_DNKC_RGB.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <TextInput
            placeholder="Mật khẩu cũ"
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder="Mật khẩu mới"
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder="Xác nhận mật khẩu mới"
            secureTextEntry
            style={styles.input}
          />

          <LinearGradient colors={["#05D781", "#039375"]} style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                alert("Mật khẩu đã được thay đổi!");
                router.back();
              }}
            >
              <Text style={styles.text}>ĐỔI MẬT KHẨU</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    width: "100%",
    height: 45,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    justifyContent: "center",
  },
  input: {
    paddingVertical: 0,
    padding: 20,
    marginBottom: 15,
    borderRadius: 35,
    backgroundColor: "#fff",
    height: 45,
    color: "#ccc",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 700,
  },
});

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function DangNhapScreen() {
  const router = useRouter();

  return (
    <SafeAreaView>
      {/* <LinearGradient
        // Button Linear Gradient
        colors={["#05D781", "#039375"]}
        style={{
          flexDirection: "row",
          height: 60,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
            Đăng Nhập
          </Text>
        </View>
      </LinearGradient> */}

      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("../../../assets/images/Logo_DNKC_RGB.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <TextInput placeholder="Tên đăng nhập" style={styles.input} />

          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            style={styles.input}
          />

          <LinearGradient colors={["#05D781", "#039375"]} style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Đăng nhập thành công!");
              }}
            >
              <Text style={styles.text}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
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
    height: 60,
    color: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    fontSize: 16,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 700,
  },
});

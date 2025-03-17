import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HandleScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
      {/* Header với LinearGradient */}
      <View

      >
        <LinearGradient
          // Button Linear Gradient
          colors={["#05D781", "#039375"]}
        >
          <View
            style={{
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>
              Nhập mã lô hàng
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Nội dung chính */}
      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal:10 }}>
        <View>
          <TextInput
            placeholder="Nhập mã lô hàng ở đây"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <LinearGradient colors={["#05D781", "#039375"]} style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/handle/details_slot");
            }}
          >
            <Text style={styles.text}>CHECK</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  input: {
    paddingVertical: 0,
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 35,
    backgroundColor: "#fff",
    height: 60,
    color: "#ccc",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 45,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 700,
  },
});
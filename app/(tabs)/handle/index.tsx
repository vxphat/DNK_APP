import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function HandleScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#05D781", "#039375"]}
        style={{ marginBottom: 20 }}
      >
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
            Nhập ID tay
          </Text>
        </View>
      </LinearGradient>
      <View style={{ paddingHorizontal: 10 }}>
        <View>
          <TextInput
            placeholder="Nhập ID lô hàng ở đây"
            secureTextEntry
            style={styles.input}
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

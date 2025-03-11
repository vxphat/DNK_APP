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

export default function languageScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{}}>
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
            Ngôn Ngữ
          </Text>
        </View>
      </LinearGradient>

      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.button_language}>
            <Image
              source={require("../../../assets/icon/icons8-language-48.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
            <Text style={styles.text}>Chọn ngôn ngữ</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity>
              <View style={styles.item}>
                <View>
                  <Text style={styles.color}>Vietnamese</Text>
                </View>
                <View>
                  <Image
                    source={require("../../../assets/icon/icons8-check-48.png")}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.item}>
                <View>
                  <Text style={styles.color}>English</Text>
                </View>
                <View>
                  <Image
                  // source={require("../../../assets/icon/icons8-arrow-right-30.png")}
                  // style={{ width: 15, height: 15 }}
                  // resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button_language: {
    marginBottom: 10,
    marginTop: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 25,
    color: "#039375",
    marginLeft: 5,
    fontWeight: 600,
  },
  item: {
    marginBottom: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    justifyContent: "space-between",
  },
  color: {
    color: "#039375",
    fontWeight: "600",
    fontSize: 16,
  },
});

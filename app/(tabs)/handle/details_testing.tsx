import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailsTestingScreen() {
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
            Kết quả kiểm phẩm
          </Text>
        </View>
      </LinearGradient>
      <ScrollView>
        <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
          <View style={styles.button_slot}>
            <Text style={styles.text_1}>24461614</Text>
          </View>

          <View style={styles.bg}>
            <View style={styles.item}>
              <View style={{ width: "65 %" }}>
                <Text style={styles.text_2}>Ngày gửi mẫu</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>11-03-2025</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>Ngày kiểm nghiệm</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>11-03-2025</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>Xếp hạng</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>10</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>SVR Dirt</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>0.040</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>SVR Ash</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>0.370</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>SVR Volatile</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>0.24</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>SVR Ash</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>0.370</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>SVR Nitrogen</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>0.30</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>Initial Wallace Plasticity</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>39-40-40</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>PRI</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>77</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>SVR Mooney Viscosity</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>85</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text_1: {
    fontSize: 35,
    color: "#039375",
    fontWeight: 600,
  },
  text_2: {
    fontSize: 16,
    color: "#039375",
    fontWeight: 600,
  },
  text_3: {
    fontSize: 16,
    color: "#000",
    fontWeight: 600,
  },

  button_slot: {
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  bg: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    width: "100%",
    height: 580,
    alignItems: "center",
    marginBottom: 100,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomColor: "#EDE9E9",
    borderBottomWidth: 1,
    width: "90%",
  },
});

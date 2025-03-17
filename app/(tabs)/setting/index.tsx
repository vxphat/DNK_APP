import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const Setting = () => {
  const router = useRouter();

  const sendEmail = () => {
    const url = "mailto:caosudnkc@gmail.com?subject=&body=";
    Linking.openURL(url);
  };

  const Call = () => {
    const url = "tel:+855979295666";
    Linking.openURL(url);
  };

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
              Cài đặt
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Nội dung chính */}
      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal:10, paddingTop:10 }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/setting/changePassword");
            }}
          >
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../../assets/icon/icons8-key-48.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>Đổi mật khẩu</Text>
              </View>
              <View>
                <Image
                  source={require("../../../assets/icon/icons8-arrow-right-30.png")}
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={sendEmail}>
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../../assets/icon/icons8-email-50.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>Hỗ trợ qua Email</Text>
              </View>
              <View>
                <Image
                  source={require("../../../assets/icon/icons8-arrow-right-30.png")}
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={Call}>
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../../assets/icon/icons8-phone-50.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>Hỗ trợ qua điện thoại</Text>
              </View>
              <View>
                <Image
                  source={require("../../../assets/icon/icons8-arrow-right-30.png")}
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/setting/language");
            }}
          >
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../../assets/icon/icons8-language-50.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>Ngôn ngữ</Text>
              </View>
              <View>
                <Image
                  source={require("../../../assets/icon/icons8-arrow-right-30.png")}
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../../assets/icon/icons8-log-out-48.png")}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>Đăng xuất</Text>
              </View>
              <View>
                <Image
                  source={require("../../../assets/icon/icons8-arrow-right-30.png")}
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  color: {
    color: "#039375",
    fontWeight: "600",
    fontSize: 16,
  },
});

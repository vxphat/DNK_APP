import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const Setting = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
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
            Cài đặt
          </Text>
        </View>
      </LinearGradient>

      <View style={{ paddingHorizontal: 10 }}>
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
          <TouchableOpacity>
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
          <TouchableOpacity>
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

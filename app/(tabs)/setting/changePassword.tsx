import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, } from "react-native"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import Ionicons from '@expo/vector-icons/Ionicons'

export default function DoiMatKhauScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
      <View>
        <LinearGradient colors={["#05D781", "#039375"]}>
          <View
            style={{
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "5%" }}>
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={28}
                  color="#fff"
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
              <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>
                {t('changePassword')}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10, paddingTop: 10 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("../../../assets/images/Logo_DNKC_RGB.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <TextInput
            placeholder={t('oldPassword')}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder={t('newPassword')}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder={t('confirmPassword')}
            secureTextEntry
            style={styles.input}
          />

          <LinearGradient colors={["#05D781", "#039375"]} style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Mật khẩu đã được thay đổi!");
              }}
            >
              <Text style={styles.text}>{t('changePassword')}</Text>
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
    textTransform: "uppercase"
  },
});

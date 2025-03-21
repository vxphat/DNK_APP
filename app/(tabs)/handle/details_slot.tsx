import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next"
import Ionicons from '@expo/vector-icons/Ionicons'

export default function DetailsSlotScreen() {
  const router = useRouter();
  const { t } = useTranslation()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
      {/* Header với LinearGradient */}

      <LinearGradient
        colors={["#05D781", "#039375"]}
      >
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
              {t('batchInformation')}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Nội dung chính */}

      <ScrollView style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10 }}>
        <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
          <View style={styles.button_slot}>
            <Text style={styles.text_1}>244616142</Text>
          </View>
          <View style={styles.bg}>
            <View style={styles.item}>
              <View style={{ width: "65 %" }}>
                <Text style={styles.text_2}>{t('factory')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>XUÂN LẬP</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>{t('productionDate')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>11-03-2025</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>{t('batchWeight')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>35 (kg)</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>{t('lotWeight')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>5,04 (tons/tấn)</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)/handle/details_farm");
              }}
            >
              <View style={styles.item}>
                <View style={{ width: "65%" }}>
                  <Text style={styles.text_2}>{t('agriculturalRawMaterials')}</Text>
                </View>
                <View style={{ width: "35%", alignItems: "flex-end" }}>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color="#333333"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)/handle/details_testing");
              }}
            >
              <View style={styles.item}>
                <View style={{ width: "65%" }}>
                  <Text style={styles.text_2}>{t('qualityTestEesults')}</Text>
                </View>
                <View style={{ width: "35%", alignItems: "flex-end" }}>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color="#333333"
                  />
                </View>
              </View>
            </TouchableOpacity>
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
    height: 320,
    alignItems: "center",
    marginBottom: 300,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomColor: "#EDE9E9",
    borderBottomWidth: 1,
    width: "90%",
  },
});

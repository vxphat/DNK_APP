import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, } from "react-native"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux"
import { changeLanguage } from "../../../store/slice/langSlice"
import { RootState } from "../../../store"
import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next"
import * as Localization from 'expo-localization';


export default function languageScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const language = useSelector((state: RootState) => state.lang.language);
  const [currentLanguage, setCurrentLanguage] = useState('vi')

  const { t, i18n } = useTranslation();

  const langeArray = [
    { id: 'vi', language: 'Vietnamese' },
    { id: 'en', language: 'English' }
  ]
  const deviceLanguage = Localization.locale.split("-")[0];
  useEffect(() => {
    
    if (language !== deviceLanguage) {
      i18n.changeLanguage(deviceLanguage); // Đổi ngôn ngữ i18n theo thiết bị
      dispatch(changeLanguage({ language: deviceLanguage })); // Cập nhật Redux store
    }
    
  }, [])

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
                {t('language')}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10, paddingTop: 10 }}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.button_language}>
            <Image
              source={require("../../../assets/icon/icons8-language-48.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
            <Text style={styles.text}>{t('selectLanguage')}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            {langeArray.map((item, key) => (
              <TouchableOpacity key={key}
                onPress={() => {
                  i18n.changeLanguage(item.id)
                  dispatch(changeLanguage({ language: item.id }));
                }}
              >
                <View style={styles.item}>
                  <View>
                    <Text style={styles.color}>{item.language}</Text>
                  </View>
                  <View>
                    {item.id === language && (
                      <Ionicons
                        name="checkmark-sharp"
                        size={20}
                        color="#039375"
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}



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

import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import React, { useState } from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useDispatch, useSelector } from "react-redux"
import { addHistory } from "../../../store/slice/historySlice"


export default function HandleScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [batchCode, setBatchCode] = useState("")
  const [errorInt, setErrorInt] = useState(false)
  const [errorCount, setErrorCount] = useState(false)

  const handleInputChange = (text: string) => {
    if (text.length <= 10) {
      setBatchCode(text);
    }


    // Kiểm tra xem có phải số nguyên không
    const isInteger = /^\d+$/.test(text);
    setErrorInt(!isInteger);

    // Kiểm tra độ dài phải đúng 10 ký tự
    setErrorCount(text.length !== 10);
  };

  // Xác định trạng thái nút check
  const isValid = !errorInt && !errorCount && batchCode.length > 0;


  const handleCheck = () => {
    if (batchCode.length == 10) {
      dispatch(addHistory({ batchCode: batchCode }));
      router.push("/(tabs)/handle/details_slot")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
      {/* Header với LinearGradient */}
      <View>
        <LinearGradient colors={["#05D781", "#039375"]}>
          <View style={{ paddingVertical: 10, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
              {t("enterBatchCode")}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Nội dung chính */}
      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10 }}>
        <View>
          <TextInput
            placeholder={t("enterTheBatchCodeHere")}
            style={[styles.input, { borderColor: batchCode.length === 0 ? "#ccc" : errorCount || errorInt ? "#fe6670" : "#039375" }]}
            value={batchCode}
            keyboardType="numeric"
            onChangeText={handleInputChange}
          />

          <View style={{ marginBottom: 30, paddingLeft: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#1b1b1b" }}>{t('theBatchCodeMust')}:</Text>
            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
              <Ionicons name="arrow-forward" size={15} color={errorInt ? "#fe6670" : batchCode.length > 0 ? "#039375" : "#1b1b1b"} />
              <Text style={{ fontSize: 14, fontWeight: "500", color: errorInt ? "#fe6670" : batchCode.length > 0 ? "#039375" : "#1b1b1b" }}>
                {t('beAnInteger')}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
              <Ionicons name="arrow-forward" size={15} color={errorCount ? "#fe6670" : batchCode.length > 0 ? "#039375" : "#1b1b1b"} />
              <Text style={{ fontSize: 14, fontWeight: "500", color: errorCount ? "#fe6670" : batchCode.length > 0 ? "#039375" : "#1b1b1b" }}>
                {t('containExactlyTenharacters')} ({batchCode.length}/10).
              </Text>
            </View>
          </View>
        </View>

        {/* Nút Check */}
        {isValid ? (
          <LinearGradient colors={["#05D781", "#039375"]} style={styles.button}>
            <TouchableOpacity onPress={handleCheck} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.text}>{t("check")}</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <View style={[styles.button, { backgroundColor: "#ccc" }]}>
            <Text style={[styles.text, { color: "#666" }]}>{t("check")}</Text>
          </View>
        )}
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
    color: "#313131",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "700",
    borderWidth: 1,
  },
  button: {
    width: "100%",
    height: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "700",
    color: '#fff'
  },
});

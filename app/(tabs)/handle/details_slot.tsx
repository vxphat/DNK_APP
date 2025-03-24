import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useRef, useEffect, useState } from 'react'
import { RootState } from "../../../store"
import LottieView from 'lottie-react-native'
import axios from "axios"
import { useSelector } from "react-redux"

interface BatchData {
  NhaMay: string;
  NgaySanXuat: string;
  KhoiLong: string;
  KhoiLuongBanh:string;
}


export default function DetailsSlotScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const token = useSelector((state: RootState) => state.auth.token);
  const { batchCode } = useLocalSearchParams()
  const animation = useRef<LottieView>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<BatchData | null>(null)

  useEffect(() => {
    fetchData(batchCode)
  }, [batchCode])


  const fetchData = async (batchCode: any) => {
    setLoading(true)
    // console.log(123, token, batchCode)
    try {
      const response = await axios.post(`https://dongnaikratie.com/api/hop-dong/dueDiligenceStatement`, {
        MaLoCanXuat: batchCode,
        type: 'json',
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      if (response.data.status == true) {
        
        setData(response.data.json as BatchData)
      } else {
        
        alert(t('theBatchCodeDoesNotExist'));
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
    setLoading(false);
  }

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

      {loading ? (
        <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 150,
              height: 150,
              backgroundColor: '#f1f4f2',
            }}

            source={require('../../../assets/json/Animation - 1742433322825.json')}
          />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10 }}>
          {data && (
            <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
              <View style={styles.button_slot}>
                <Text style={styles.text_1}>{batchCode}</Text>
              </View>
              <View style={styles.bg}>
                <View style={styles.item}>
                  <View style={{ width: "65 %" }}>
                    <Text style={styles.text_2}>{t('factory')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{data.NhaMay}</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('productionDate')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{data.NgaySanXuat}</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('batchWeight')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{data.KhoiLuongBanh} (kg)</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('lotWeight')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    
                    <Text style={styles.text_3}>{data.KhoiLong ? (parseFloat(data.KhoiLong.replace(/,/g, ""))/1000).toFixed(2) : 0} ({t('tons')})</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/(tabs)/handle/details_farm?batchCode=${batchCode}`);
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
                    router.push(`/(tabs)/handle/details_testing?batchCode=${batchCode}`);
                  }}
                >
                  <View style={[styles.item, styles.noBoder]}>
                    <View style={{ width: "65%" }}>
                      <Text style={styles.text_2}>{t('qualityInspectionResults')}</Text>
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
          )}

        </View>
      )}




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
  noBoder: {
    borderBottomWidth: 0
  },
});

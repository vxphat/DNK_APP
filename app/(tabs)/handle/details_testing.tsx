import { View, Text, TouchableOpacity, StyleSheet, ScrollView, } from "react-native"
import { useTranslation } from "react-i18next"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter, useLocalSearchParams } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useRef, useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { RootState } from "../../../store"
import { useSelector } from "react-redux"
import axios from "axios"

interface BatchData {
  sampleSubmissionDate: string;
  testDate: string;
  rating: string;
  NonRubberSolids: string;
  evaporation:string;
  tro: string;
  nito: string;
  po: string;
  pri: string;
  color: string;
  vr: string;
}


export default function DetailsTestingScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const token = useSelector((state: RootState) => state.auth.token);
  const { batchCode } = useLocalSearchParams()
  const animation = useRef<LottieView>(null)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')
  const [data, setData] = useState<BatchData | null>(null)

  useEffect(() => {
    fetchData(batchCode)
  }, [batchCode])

  const fetchData = async (batchCode: any) => {
    setLoading(true)

    try {
      const response = await axios.get(`https://dongnaikratie.com/api/hop-dong/result-test/${batchCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      if (response.data.status == true) {

        setType(response.data.type)
        setData(response.data.testResult as BatchData)
      } else {
        alert(t('errorLogin'));
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
    setLoading(false);
  }

  const renderSRV = (data:any) => {
    return (
      <>
        <View style={styles.item}>
          <View style={{ width: "65%" }}>
            <Text style={styles.text_2}>{t('impurities')}</Text>
          </View>
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Text style={styles.text_3}>{data.NonRubberSolids}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{ width: "65%" }}>
            <Text style={styles.text_2}>SVR Tro</Text>
          </View>
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Text style={styles.text_3}>{data.tro}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{ width: "65%" }}>
            <Text style={styles.text_2}>{t('evaporation')}</Text>
          </View>
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Text style={styles.text_3}>{data.evaporation}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{ width: "65%" }}>
            <Text style={styles.text_2}>SVR Nitrogen</Text>
          </View>
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Text style={styles.text_3}>{data.nito}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{ width: "65%" }}>
            <Text style={styles.text_2}>SVR Po</Text>
          </View>
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Text style={styles.text_3}>{data.po}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{ width: "65%" }}>
            <Text style={styles.text_2}>SVR PRI</Text>
          </View>
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Text style={styles.text_3}>{data.pri}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{ width: "65%" }}>
            <Text style={styles.text_2}>{t('color')}</Text>
          </View>
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Text style={styles.text_3}>{data.color}</Text>
          </View>
        </View>
        <View style={[styles.item, {borderBottomWidth:0}]}>
          <View style={{ width: "65%" }}>
            <Text style={styles.text_2}>SVR VR</Text>
          </View>
          <View style={{ width: "35%", alignItems: "flex-end" }}>
            <Text style={styles.text_3}>{data.vr}</Text>
          </View>
        </View>
      </>
    )
  }
  const renderLatex = (data:any) => {
    return (
      <></>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
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
              {t('qualityInspectionResults')}
            </Text>
          </View>
        </View>
      </LinearGradient>
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
        <ScrollView style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10 }}>
          <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
            <View style={styles.button_slot}>
              <Text style={styles.text_1}>{batchCode}</Text>
            </View>
            {data && (
              <View style={styles.bg}>
                <View style={styles.item}>
                  <View style={{ width: "65 %" }}>
                    <Text style={styles.text_2}>{t('sampleSubmissionDate')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{data.sampleSubmissionDate}</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('testDate')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{data.testDate}</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('rating')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{data.rating}</Text>
                  </View>
                </View>
                {type == 'SRV' ? (
                  renderSRV(data)
                ) : (
                  renderLatex(data)
                )}
              </View>
            )}

          </View>
        </ScrollView>
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

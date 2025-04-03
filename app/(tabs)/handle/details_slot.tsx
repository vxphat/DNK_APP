import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"

import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Clipboard from "expo-clipboard"
import React, { useRef, useEffect, useState } from 'react'
import { RootState } from "../../../store"
import LottieView from 'lottie-react-native'
import axios from "axios"
import { useSelector } from "react-redux"
import MapView, { Polygon, Marker, Callout } from "react-native-maps"

interface BatchData {
  Factory: string;
  ManufacturingDate: string;
  VolumeOfRubberLatex: string;
  LotWeight: string;
  Detail: any[];
  detailArea: string;
}


export default function DetailsSlotScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const token = useSelector((state: RootState) => state.auth.token);
  const { batchCode } = useLocalSearchParams()
  const animation = useRef<LottieView>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<BatchData | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleRenderDetail = (index: any) => {
    setSelectedIndex(selectedIndex === index ? null : index); // Ẩn/hiện
  };

  useEffect(() => {
    fetchData(batchCode)
  }, [batchCode])


  const fetchData = async (batchCode: any) => {
    setLoading(true)
    // console.log(123, token, batchCode)
    try {
      const response = await axios.get(`https://dongnaikratie.com/api/hop-dong/shipment-information/${batchCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      if (response.data.status == true) {

        setData(response.data.result as BatchData)
      } else {

        alert(t('theBatchCodeDoesNotExist'));
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
    setLoading(false);
  }

  const renderVuonCay = (data: any) => {

    const json = JSON.parse(data)

    return (
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
        {json.map((item: any, index: number) => (
          <TouchableOpacity 
            onPress={() => {
              router.push(`/(tabs)/handle/details_map?idMap=${item.ID_plot}&Plot=${item.Plot}`);
            }}
            key={index} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, backgroundColor: "#05D781", marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
            <Text style={{ fontWeight: '500' }}>{item.Plot}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  const calculateRegionFromGeoJson = (geoJsonArray: Array<{ geoJson: any }>) => {
    if (!geoJsonArray || geoJsonArray.length === 0) {
      // Trả về region mặc định nếu không có dữ liệu
      return {
        latitude: 10.7769,
        longitude: 106.7009,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }

    // Biến lưu trữ tất cả các điểm từ tất cả các polygon
    let allPoints: { latitude: number, longitude: number }[] = [];

    geoJsonArray.forEach(item => {
      const geoJson = item.geoJson;
      if (!geoJson || !geoJson.coordinates) return;

      geoJson.coordinates.forEach((polygon: any) => {
        if (!Array.isArray(polygon) || polygon.length === 0) return;

        let points: number[][];
        if (geoJson.type === 'MultiPolygon') {
          points = polygon[0]; // Lấy polygon đầu tiên trong MultiPolygon
        } else {
          points = polygon;
        }

        points.forEach(([longitude, latitude]) => {
          allPoints.push({ latitude, longitude });
        });
      });
    });

    if (allPoints.length === 0) {
      return {
        latitude: 10.7769,
        longitude: 106.7009,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }

    // Tính min/max latitude và longitude
    const latitudes = allPoints.map(point => point.latitude);
    const longitudes = allPoints.map(point => point.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    // Tính trung tâm
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // Tính delta với padding 10%
    const latDelta = (maxLat - minLat) * 1.1;
    const lngDelta = (maxLng - minLng) * 1.1;

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  };

  const renderMap = (data: any) => {

    const json = JSON.parse(data)


    const geoJson = json.map((item: any) => ({
      geoJson: JSON.parse(item.geoJson), // Chuyển geoJson thành object
      plot: item.Plot,                   // Lấy giá trị Plot
    }));


    const region = calculateRegionFromGeoJson(geoJson);
    const getPolygonCenter = (coordinates: { latitude: number, longitude: number }[]) => {
      const lats = coordinates.map(c => c.latitude);
      const lngs = coordinates.map(c => c.longitude);
      return {
        latitude: (Math.min(...lats) + Math.max(...lats)) / 2,
        longitude: (Math.min(...lngs) + Math.max(...lngs)) / 2
      };
    };



    return (
      <MapView
        style={{ width: "100%", height: 200 }}
        initialRegion={region}
        zoomEnabled={true}
        mapType="satellite"
      >
        {geoJson.map((item: any, index: any) => {
          const geoJson = item.geoJson;
          if (!geoJson?.coordinates) return null;

          return geoJson.coordinates.map((polygon: any, idx: number) => {
            if (!Array.isArray(polygon) || polygon.length === 0) return null;

            let coordinates: { latitude: number; longitude: number }[] = [];

            if (geoJson.type === 'MultiPolygon') {
              coordinates = polygon[0].map(([longitude, latitude]: number[]) => ({
                latitude,
                longitude
              }));
            } else {
              coordinates = polygon.map(([longitude, latitude]: number[]) => ({
                latitude,
                longitude
              }));
            }
            const center = getPolygonCenter(coordinates);

            return (
              <React.Fragment key={idx}>
                <Polygon
                  coordinates={coordinates}
                  strokeWidth={2}
                  strokeColor="rgba(0, 128, 255, 1)"
                  fillColor="rgba(0, 128, 255, 0.4)"
                />

                {/* Marker hiển thị tên polygon */}
                <Marker coordinate={center}>
                  <View style={styles.nameTag}>
                    <Text style={styles.nameText}>{item.plot}</Text>
                  </View>
                </Marker>
              </React.Fragment>
            );
          });
        })}
      </MapView >
    )
  }

  const renderJSON = (data: any) => {

    const json = JSON.parse(data)
    return (
      <>
        {json.map((item: any, index: any) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text numberOfLines={1}>{item.geoJson}</Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(item.geoJson);

              }}
            >
              <Ionicons
                name="copy"
                size={15}
                color="#262727"
              />
            </TouchableOpacity>

          </View>
        ))}
      </>

    );
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
      {/* Header với LinearGradient */}

      <LinearGradient
        colors={["#05D781", "#039375"]}
      >
        <View
          style={{
            height: 50,
            flexDirection: "row",
          }}
        >
          <View style={{ width: "10%", justifyContent: 'center', alignItems: 'center' }}>
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
        <ScrollView style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 5 }}>
          {data && (
            <View style={{ paddingHorizontal: 5, alignItems: "center" }}>
              <View style={styles.button_slot}>
                <Text style={styles.text_1}>{batchCode}</Text>
              </View>
              <View style={styles.bg}>
                <View style={styles.item}>
                  <Text style={styles.text_2}>{t('factory')}</Text>
                  <Text style={styles.text_3}>{data.Factory}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.text_2}>{t('productionDate')}</Text>
                  <Text style={styles.text_3}>{data.ManufacturingDate}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.text_2}>{t('batchWeight')}</Text>
                  <Text style={styles.text_3}>{data.VolumeOfRubberLatex} (kg)</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.text_2}>{t('lotWeight')}</Text>
                  <Text style={styles.text_3}>{data.LotWeight ? (parseFloat(data.LotWeight) / 1000).toFixed(2) : 0} ({t('tons')})</Text>
                </View>
                <View style={[styles.item, { borderBottomWidth: 0 }]}>
                  <Text style={styles.text_2}>{t('agriculturalRawMaterials')}</Text>
                </View>
                <View style={{ width: '95%' }}>

                  {data.Detail.map((item, index) => (
                    <View key={index} style={{ marginBottom: 20 }}>
                      <TouchableOpacity
                        onPress={() => handleRenderDetail(index)}
                        style={{ justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 10, backgroundColor: '#14dba9', borderRadius: 5, flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '600', color: '#222423' }}>{item.farmName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '600', color: '#565656', fontSize: 12 }}>{t('Reception')}: </Text>
                            <Text style={{ fontWeight: '600', color: '#212121', fontSize: 12 }}> {item.materialDateOfReceipt} ({item.materialCarCount})</Text>
                          </View>
                          
                          <Ionicons
                            name="chevron-forward-outline"
                            size={18}
                            color="#333333"
                          />
                        </View>
                      </TouchableOpacity>
                      {selectedIndex === index && (
                        <>
                          <View style={{ padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <View>
                                <Text style={{ fontSize: 13 }}>{t('rubberReceivingDate')}</Text>
                              </View>
                              <View>
                                <Text style={{ fontSize: 13 }}>{item.materialDateOfReceipt}</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <View>
                                <Text style={{ fontSize: 13 }}>{t('tappingDate')}</Text>
                              </View>
                              <View>
                                <Text style={{ fontSize: 13 }}>{item.detailTappingDay}</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, marginTop: 5 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Text style={{ fontSize: 13 }}>{t('transport')}</Text>
                              <Ionicons
                                name="chevron-forward-outline"
                                size={18}
                                color="#333333"
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={{ padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <View>
                                <Text style={{ fontSize: 13 }}>{t('rubberType')}</Text>
                              </View>
                              <View>
                                <Text style={{ fontSize: 13 }}>{item.detailTypeLatex}</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, marginTop: 5 }}>
                            <View style={{}}>
                              <View>
                                <Text style={{ fontSize: 13 }}>{t('treePlot')}</Text>
                              </View>
                              <View>
                                {renderVuonCay(item.detailArea)}
                              </View>
                              <View style={{ marginTop: 10 }}>
                                {renderMap(item.detailArea)}
                              </View>
                            </View>
                          </View>

                          <View style={{ padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, marginTop: 5 }}>
                            <View style={{}}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 13 }}>GeoJson</Text>
                              </View>
                              <View>
                                {renderJSON(item.detailArea)}
                              </View>
                            </View>
                          </View>
                        </>
                      )}
                    </View>
                  ))}
                </View>

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
    marginBottom: 300,
  },
  item: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomColor: "#EDE9E9",
    borderBottomWidth: 1,
    width: "95%",
  },
  noBoder: {
    borderBottomWidth: 0
  },
  nameTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 128, 255, 0.5)'
  },
  nameText: {
    color: '#0066cc',
    fontSize: 10,
    fontWeight: 'bold'
  }
});

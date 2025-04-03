import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Animated, Linking, Alert, } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import React, { useRef, useEffect, useState } from 'react'
import * as Clipboard from "expo-clipboard"
import { SafeAreaView } from "react-native-safe-area-context"
import MapView, { Polygon, Marker } from "react-native-maps"
import { useTranslation } from "react-i18next"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import axios from "axios"
import LottieView from 'lottie-react-native'



interface PlantationMapData {
  geoemtry: [];
  link: string;
}

interface BatchData {
  farmName: string;
  detailArea: string;
  licensePlate: string;
  materialCarCount: string;
  detailTappingDay: string;
  materialDateOfReceipt: string;
}

export default function DetailsFarmScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { farmName, farmID, batchCode, dateOfReceipt, ngayCao, soXe, soChuyen, loaiMu } = useLocalSearchParams()
  const token = useSelector((state: RootState) => state.auth.token)
  const animation = useRef<LottieView>(null)
  const [dropdownStates, setDropdownStates] = useState([
    { isOpen: false, animation: new Animated.Value(0) },
    { isOpen: false, animation: new Animated.Value(0) },
    { isOpen: false, animation: new Animated.Value(0) },
    // Thêm các dropdown khác nếu cần
  ]);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(true)

  const toggleDropdown = (index: number) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index].isOpen = !newDropdownStates[index].isOpen;
    Animated.timing(newDropdownStates[index].animation, {
      toValue: newDropdownStates[index].isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setDropdownStates(newDropdownStates);
  };

  

  const fetchData = async (farm: any, batchCode: any) => {
    setLoading(true)
    // console.log(123, token, batchCode)
    try {
      const response = await axios.get(`https://dongnaikratie.com/api/hop-dong/farm-information`, {
        params: { farm: farm, batchCode: batchCode,  },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status == true) {
        console.log(123123, response.data)

      } else {

        alert(t('theBatchCodeDoesNotExist'));
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
    setLoading(false);
  }



  //Hàm render ra thông tin Lô vườn cây
  const renderSlotDropdownContent = (index: number, TreeLot: any[]) => {
    const animatedStyle = {
      maxHeight: dropdownStates[index].animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200], // Chiều cao tối đa, thực tế sẽ tự động mở rộng theo nội dung
        extrapolate: 'clamp',
      }),
      opacity: dropdownStates[index].animation,
    };

    return (
      <Animated.View style={[styles.dropdown, animatedStyle]}>
        <View style={styles.dropdown_1}>
          {TreeLot.map((item: string, idx) => (
            <View key={idx} style={styles.dropdownItem}>
              <TouchableOpacity
                onPress={() => {
                  router.push(`/(tabs)/handle/details_map?idMap=${item}`);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Animated.View>
    );
  };


  //Hàm render ra thông tin Bản đồ vườn cây
  const renderMapDropdownContent = (index: number, mapData: any) => {
    // Hàm chuyển đổi coordinates từ GeoJSON sang định dạng MapView và lấy thông tin name
    const parseCoordinates = (geojsonCoordinates: any) => {
      if (!geojsonCoordinates) return [];

      const polygons: { name: string; coordinates: { latitude: number; longitude: number }[] }[] = [];

      geojsonCoordinates.forEach((item: { name: string; json: string }) => {
        const parsed = JSON.parse(item.json);

        if (parsed.type === "Polygon") {
          const coords = parsed.coordinates[0].map(([longitude, latitude]: number[]) => ({
            latitude,
            longitude,
          }));
          polygons.push({ name: item.name, coordinates: coords });
        } else if (parsed.type === "MultiPolygon") {
          parsed.coordinates.forEach((poly: number[][][]) => {
            const coords = poly[0].map(([longitude, latitude]: number[]) => ({
              latitude,
              longitude,
            }));
            polygons.push({ name: item.name, coordinates: coords });
          });
        }
      });

      return polygons;
    };

    // Tính toán trung tâm của một polygon
    const getPolygonCenter = (coordinates: { latitude: number; longitude: number }[]) => {
      let latSum = 0;
      let lonSum = 0;
      coordinates.forEach(point => {
        latSum += point.latitude;
        lonSum += point.longitude;
      });
      return {
        latitude: latSum / coordinates.length,
        longitude: lonSum / coordinates.length,
      };
    };

    // Tính toán vùng bao cho tất cả polygons để đặt initialRegion
    const getMapRegion = (polygons: { coordinates: { latitude: number; longitude: number }[] }[]) => {
      if (!polygons.length) return {
        latitude: 13.28,
        longitude: 106.25,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

      let minLat = Infinity;
      let maxLat = -Infinity;
      let minLon = Infinity;
      let maxLon = -Infinity;

      polygons.forEach(polygon => {
        polygon.coordinates.forEach((point: { latitude: number; longitude: number }) => {
          minLat = Math.min(minLat, point.latitude);
          maxLat = Math.max(maxLat, point.latitude);
          minLon = Math.min(minLon, point.longitude);
          maxLon = Math.max(maxLon, point.longitude);
        });
      });

      const latitude = (minLat + maxLat) / 2;
      const longitude = (minLon + maxLon) / 2;
      const latitudeDelta = (maxLat - minLat) * 1.2; // Thêm padding 20%
      const longitudeDelta = (maxLon - minLon) * 1.2; // Thêm padding 20%

      return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      };
    };

    const polygons = parseCoordinates(mapData.geoemtry);
    const region = getMapRegion(polygons);

    const height = dropdownStates[index].animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 260],
    });

    return (
      <Animated.View
        style={[
          styles.dropdown,
          { height },
          { borderBottomWidth: dropdownStates[1].isOpen ? 1 : 0 },
        ]}
      >
        <View style={styles.dropdown_2}>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={LinkGIS}>
              <Text>{mapData.link}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(mapData.link);
                Alert.alert("Đã sao chép vào clipboard!");
              }}
            >
              <Ionicons
                name="copy-outline"
                size={15}
                color="#333"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 200, width: '100%', marginTop: 10 }}>
          <MapView
            style={styles.map}
            initialRegion={region}
            zoomEnabled={true}
          >
            {/* Hiển thị tất cả polygons và markers */}
            {polygons.map((polygon, idx) => {
              const center = getPolygonCenter(polygon.coordinates);
              return (
                <React.Fragment key={idx}>
                  <Polygon
                    coordinates={polygon.coordinates}
                    strokeWidth={2}
                    strokeColor="rgba(0, 128, 255, 1)"
                    fillColor="rgba(0, 128, 255, 0.4)"
                  />
                  <Marker coordinate={center}>
                    <View style={styles.markerContainer}>
                      <Text style={styles.markerText}>{polygon.name}</Text>
                    </View>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapView>
        </View>
      </Animated.View>
    );
  };
  //Hàm render ra thông tin GeoJson
  const renderGeoJsonDropdownContent = (index: number, json: any) => {

    const height = dropdownStates[index].animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200], // Tăng giá trị max lên cao hơn, auto mở rộng khi cần
    });

    return (
      <Animated.View
        style={[
          styles.dropdown,
          { maxHeight: height, overflow: "hidden" }, // Dùng maxHeight để tự động điều chỉnh
          { borderBottomWidth: dropdownStates[2].isOpen ? 1 : 0 },
          { borderBottomWidth: 0 }
        ]}
      >
        <View style={{ paddingBottom: 20 }}>

          {json.geoemtry.map((item: any, index: any) => (
            <View key={index} style={styles.dropdown_2}>
              <View>
                <Text numberOfLines={1} ellipsizeMode="tail">{item.json}</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setStringAsync(item.json);
                    Alert.alert("Đã sao chép geoJson vào clipboard!");
                  }}
                >
                  <Ionicons
                    name="copy-outline"
                    size={15}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}


        </View>
      </Animated.View>
    );
  };


  const LinkGIS = () => {
    const url = "https://arcg.is/15DXH12";
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
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

        <ScrollView style={{ backgroundColor: "#f1f4f2" }}>
          {data && (
            <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
              <View style={styles.button_slot}>
                <Text style={styles.text_1}>{batchCode}</Text>
              </View>

              <View style={styles.bg}>
                <View style={styles.item}>
                  <View style={{ width: "50 %" }}>
                    <Text style={styles.text_2}>{t('farm')}</Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{farmName}</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('rubberReceivingDate')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{dateOfReceipt}</Text>
                  </View>
                </View>
                 <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('tappingDate')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{ngayCao}</Text>
                  </View>
                </View>
                
                <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('truckNumber')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{soXe} ({soChuyen})</Text>
                  </View>
                </View>
                
                <View style={styles.item}>
                  <View style={{ width: "45%" }}>
                    <Text style={styles.text_2}>{t('plantVariety')}</Text>
                  </View>
                  <View style={{ width: "55%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}></Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.text_2}>{t('rubberType')}</Text>
                  </View>
                  <View style={{ width: "35%", alignItems: "flex-end" }}>
                    <Text style={styles.text_3}>{loaiMu}</Text>
                  </View>
                </View>
                {/*
                <TouchableOpacity onPress={() => toggleDropdown(0)}>
                  <View
                    style={[
                      styles.item,
                      { borderBottomWidth: dropdownStates[0].isOpen ? 0 : 1 },
                    ]}
                  >
                    <View style={{ width: "65%" }}>
                      <Text style={styles.text_2}>{t('treePlot')}</Text>
                    </View>
                    <View style={{ width: "35%", alignItems: "flex-end" }}>
                      <Ionicons
                        name={dropdownStates[0].isOpen ? 'chevron-down-outline' : 'chevron-forward-outline'}
                        size={15}
                        color="#333"
                      />

                    </View>
                  </View>
                </TouchableOpacity>
                
                {renderSlotDropdownContent(0, data.TreeLot)}

                <TouchableOpacity onPress={() => toggleDropdown(1)}>
                  <View
                    style={[
                      styles.item,
                      { borderBottomWidth: dropdownStates[1].isOpen ? 0 : 1 },
                    ]}
                  >
                    <View style={{ width: "65%" }}>
                      <Text style={styles.text_2}>{t('plantationMap')}</Text>
                    </View>
                    <View style={{ width: "35%", alignItems: "flex-end" }}>
                      <Ionicons
                        name={dropdownStates[1].isOpen ? 'chevron-down-outline' : 'chevron-forward-outline'}
                        size={15}
                        color="#333"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                {renderMapDropdownContent(1, data.PlantationMap)}
                <TouchableOpacity onPress={() => toggleDropdown(2)}>
                  <View
                    style={[
                      styles.item,
                      styles.noBoder,
                    ]}
                  >
                    <View style={{ width: "65%" }}>
                      <Text style={styles.text_2}>GeoJson</Text>
                    </View>
                    <View style={{ width: "35%", alignItems: "flex-end" }}>
                      <Ionicons
                        name={dropdownStates[2].isOpen ? 'chevron-down-outline' : 'chevron-forward-outline'}
                        size={15}
                        color="#333"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                {renderGeoJsonDropdownContent(2, data.PlantationMap)} */}
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
    marginBottom: 100,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  item: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomColor: "#EDE9E9",
    borderBottomWidth: 1,
    width: "95%",
  },
  dropdownItem: {
    backgroundColor: "#05D781",
    borderRadius: 30,
    padding: 5
  },
  dropdown: {
    width: "90%",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderBottomColor: "#EDE9E9",
  },
  dropdown_1: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropdown_2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  noBoder: {
    borderBottomWidth: 0
  },
  markerContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 3,
    borderRadius: 2,
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
});

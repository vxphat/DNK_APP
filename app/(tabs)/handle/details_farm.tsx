import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Animated, Linking, Alert, } from "react-native"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import React, { useState, useRef } from "react"
import * as Clipboard from "expo-clipboard"
import { SafeAreaView } from "react-native-safe-area-context"
import MapView from "react-native-maps"
import { useTranslation } from "react-i18next"
import Ionicons from '@expo/vector-icons/Ionicons'

export default function DetailsFarmScreen() {
  const router = useRouter();
  const { t } = useTranslation()
  const [dropdownStates, setDropdownStates] = useState([
    { isOpen: false, animation: new Animated.Value(0) },
    { isOpen: false, animation: new Animated.Value(0) },
    { isOpen: false, animation: new Animated.Value(0) },
    // Thêm các dropdown khác nếu cần
  ]);

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
  //Hàm render ra thông tin Lô vườn cây
  const renderSlotDropdownContent = (index: number) => {
    const height = dropdownStates[index].animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80], // Độ cao tối thiểu và tối đa của menu
    });

    return (
      <Animated.View
        style={[
          styles.dropdown,
          { height },
          { borderBottomWidth: dropdownStates[0].isOpen ? 1 : 0 },
        ]}
      >
        <View style={styles.dropdown_1}>
          <View style={styles.dropdownItem}>
            <Text>1.04DN.NT1.09.114</Text>
          </View>
          <View style={styles.dropdownItem}>
            <Text>1.04DN.NT1.09.115</Text>
          </View>
        </View>
      </Animated.View>
    );
  };
  //Hàm render ra thông tin Bản đồ vườn cây
  const renderMapDropdownContent = (index: number) => {
    const height = dropdownStates[index].animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 260], // Độ cao tối thiểu và tối đa của menu
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
              <Text>https://arcg.is/15DXH1221312</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync("https://arcg.is/15DXH12");
                Alert.alert("Đã sao chép vào clipboard!");
              }}
            >
              <Image
                source={require("../../../assets/icon/copy.png")}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 200, width: '100%', marginTop:10 }}>
          <MapView style={styles.map} 
            
            initialRegion={{
              latitude: 10.939421,
              longitude: 107.186274,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        </View>
      </Animated.View>
    );
  };
  //Hàm render ra thông tin GeoJson
  const renderGeoJsonDropdownContent = (index: number) => {
    const height = dropdownStates[index].animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50], // Độ cao tối thiểu và tối đa của menu
    });

    return (
      <Animated.View
        style={[
          styles.dropdown,
          { height },
          { borderBottomWidth: dropdownStates[2].isOpen ? 1 : 0 },
        ]}
      >
        <View style={styles.dropdown_2}>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={LinkGIS}>
              <Text>https://arcg.is/15DXH123333</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync("https://arcg.is/15DXH12");
                Alert.alert("Đã sao chép vào clipboard!");
              }}
            >
              <Image
                source={require("../../../assets/icon/copy.png")}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

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

      <ScrollView style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10 }}>
        <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
          <View style={styles.button_slot}>
            <Text style={styles.text_1}>244616144</Text>
          </View>

          <View style={styles.bg}>
            <View style={styles.item}>
              <View style={{ width: "65 %" }}>
                <Text style={styles.text_2}>{t('farm')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>Nông trường 1</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>{t('rubberReceivingDate')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>11-03-2025</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>{t('truckNumber')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>60H-12345</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>{t('tripNumber')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>1</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "55%" }}>
                <Text style={styles.text_2}>{t('plantVariety')}</Text>
              </View>
              <View style={{ width: "45%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>RRIV 124, RRIV 209</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>{t('rubberType')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>Mủ chén</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>{t('tappingDate')}</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>11-03-2025</Text>
              </View>
            </View>
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
                  <Image
                    source={
                      dropdownStates[0].isOpen
                        ? require("../../../assets/icon/icons8-arrow-down-30.png") // Hiển thị arrow-down khi dropdown mở
                        : require("../../../assets/icon/icons8-arrow-right-30.png") // Hiển thị arrow-right khi dropdown đóng
                    }
                    style={[{ width: 15, height: 15 }]}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {renderSlotDropdownContent(0)}

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
                  <Image
                    source={
                      dropdownStates[1].isOpen
                        ? require("../../../assets/icon/icons8-arrow-down-30.png") // Hiển thị arrow-down khi dropdown mở
                        : require("../../../assets/icon/icons8-arrow-right-30.png") // Hiển thị arrow-right khi dropdown đóng
                    }
                    style={[{ width: 15, height: 15 }]}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {renderMapDropdownContent(1)}
            <TouchableOpacity onPress={() => toggleDropdown(2)}>
              <View
                style={[
                  styles.item,
                  { borderBottomWidth: dropdownStates[2].isOpen ? 0 : 1 },
                ]}
              >
                <View style={{ width: "65%" }}>
                  <Text style={styles.text_2}>GeoJson</Text>
                </View>
                <View style={{ width: "35%", alignItems: "flex-end" }}>
                  <Image
                    source={
                      dropdownStates[2].isOpen
                        ? require("../../../assets/icon/icons8-arrow-down-30.png") // Hiển thị arrow-down khi dropdown mở
                        : require("../../../assets/icon/icons8-arrow-right-30.png") // Hiển thị arrow-right khi dropdown đóng
                    }
                    style={[{ width: 15, height: 15 }]}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {renderGeoJsonDropdownContent(2)}

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
    height: 1000,
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
    width: "90%",
  },
  dropdownItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#05D781",
    borderRadius: 30,
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
});

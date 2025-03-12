import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";

export default function DetailsFarmScreen() {
  const router = useRouter();
  const [dropdownStates, setDropdownStates] = useState([
    { isOpen: false, animation: new Animated.Value(0) },
    { isOpen: false, animation: new Animated.Value(0) },
    // Thêm các dropdown khác nếu cần
  ]);

  const toggleDropdown = (index: number) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index].isOpen = !newDropdownStates[index].isOpen;
    Animated.timing(newDropdownStates[index].animation, {
      toValue: newDropdownStates[index].isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setDropdownStates(newDropdownStates);
  };

  const renderDropdownContent = (index: number) => {
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
            <Text>Nội dung dropdown {index + 1}</Text>
          </View>
          <View style={styles.dropdownItem}>
            <Text>Nội dung khác {index + 1}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView>
      <LinearGradient
        // Button Linear Gradient
        colors={["#05D781", "#039375"]}
        style={{
          flexDirection: "row",
          height: 60,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ width: "5%" }}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Image
              source={require("../../../assets/icon/icons8-back-48.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
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
          <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
            Thông tin vườn cây
          </Text>
        </View>
      </LinearGradient>
      <ScrollView>
        <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
          <View style={styles.button_slot}>
            <Text style={styles.text_1}>24461614</Text>
          </View>

          <View style={styles.bg}>
            <View style={styles.item}>
              <View style={{ width: "65 %" }}>
                <Text style={styles.text_2}>Nông trường</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>Nông trường 1</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>Ngày tiếp nhận mủ</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>11-03-2025</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>Số xe vận chuyển</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>60H-12345</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>Số chuyến</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>1</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "55%" }}>
                <Text style={styles.text_2}>Giống cây</Text>
              </View>
              <View style={{ width: "45%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>RRIV 124, RRIV 209</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>Loại mủ</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>Mủ chén</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{ width: "65%" }}>
                <Text style={styles.text_2}>Ngày cạo</Text>
              </View>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                <Text style={styles.text_3}>11-03-2025</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleDropdown(0)}>
              <View style={styles.item}>
                <View style={{ width: "65%" }}>
                  <Text style={styles.text_2}>Lô vườn cây</Text>
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
            {renderDropdownContent(0)}

            <TouchableOpacity onPress={() => toggleDropdown(1)}>
              <View style={styles.item}>
                <View style={{ width: "65%" }}>
                  <Text style={styles.text_2}>Bản đồ vườn cây</Text>
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
            {renderDropdownContent(1)}
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
    height: 580,
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
  dropdownItem: {
    marginTop: 20,
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
});

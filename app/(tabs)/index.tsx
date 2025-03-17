import { Image, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { LinearGradient } from "expo-linear-gradient";
const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
      {/* Header với LinearGradient */}
      <View

      >
        <LinearGradient
          // Button Linear Gradient
          colors={["#05D781", "#039375"]}
        >
          <View
            style={{
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>
              DNK Treacibility
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Nội dung chính */}
      <View style={{ flex: 1, backgroundColor: "#f1f4f2"}}>
        <PagerView style={styles.container} initialPage={1}>
          <View style={styles.page} key="1">
            <View style={{  }}>
              <Image
                source={require("../../assets/images/Slider1.jpg")}
                style={{ width: 400, height: 200, borderRadius: 20 }}
              />
            </View>

          </View>
          <View style={styles.page} key="2">
            <Image
              source={require("../../assets/images/Slider2.jpg")}
              style={{ width: 400, height: 200, borderRadius: 20 }}
            />
          </View>
          <View style={styles.page} key="3">
            <Image
              source={require("../../assets/images/Slider3.jpg")}
              style={{ width: 400, height: 200, borderRadius: 20 }}
            />
          </View>
          <View style={styles.page} key="4">
            <Image
              source={require("../../assets/images/Slider4.jpg")}
              style={{ width: 400, height: 200, borderRadius: 20 }}
            />
          </View>
        </PagerView>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  container: {
    height: 240,
    paddingTop:20
  },
  page: {
    alignItems: "center"
  },
});

import { Image, StyleSheet, SafeAreaView, View, Text } from "react-native";
import PagerView from "react-native-pager-view";
import { LinearGradient } from "expo-linear-gradient";
const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#05D781", "#039375"]}
        style={{ marginBottom: 20 }}
      >
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
            DNK Treacibility
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.container}>
        <PagerView style={styles.container} initialPage={1}>
          <View style={styles.page} key="1">
            <Image
              source={require("../../assets/images/Slider1.jpg")}
              style={{ width: 400, height: 400, borderRadius: 20 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.page} key="2">
            <Image
              source={require("../../assets/images/Slider2.jpg")}
              style={{ width: 400, height: 400 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.page} key="3">
            <Image
              source={require("../../assets/images/Slider3.jpg")}
              style={{ width: 400, height: 400 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.page} key="4">
            <Image
              source={require("../../assets/images/Slider4.jpg")}
              style={{ width: 400, height: 400 }}
              resizeMode="contain"
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
    flex: 1,
  },
  page: {
    alignItems: "center",
    marginTop: -95,
  },
});

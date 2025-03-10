import { Image, StyleSheet, SafeAreaView, View, Text } from "react-native";
import PagerView from "react-native-pager-view";

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <View
        style={{
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#05D781",
          justifyContent: "center",
        }}
      >
        <Text>DNK Traceability</Text>
      </View>

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

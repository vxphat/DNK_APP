import { Image, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
              Lịch sử
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Nội dung chính */}
      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10 }}>

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

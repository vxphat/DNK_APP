import { Image, StyleSheet, SafeAreaView, View, Text } from "react-native";

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <View>
        <Text>History</Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

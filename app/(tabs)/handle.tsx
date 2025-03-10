import { Image, StyleSheet, SafeAreaView, View, Text } from "react-native";

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <View>
        <Text>Handle</Text>
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
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

import { Image, StyleSheet, View, Text, TouchableOpacity, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import PagerView from "react-native-pager-view"
import { LinearGradient } from "expo-linear-gradient"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

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
      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingTop: 20 }}>
        <PagerView style={styles.container} initialPage={1}>
          <View style={styles.page} key="1">
            <View style={{}}>
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
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>CÔNG TY TNHH PHÁT TRIỂN CAO SU ĐỒNG NAI KRATIE</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <MaterialCommunityIcons
              name="home-map-marker"
              size={15}
              color="#333"
            />
            <Text style={{ fontWeight: '400', fontSize: 14, marginLeft: 15 }}>Làng Or'Pras, xã Or'kandear Senchey, huyện Or'Kreang Senchey, tỉnh Kratie</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={()=>{
                const url = "tel:+855979295666";
                Linking.openURL(url);
              }}
            >
              <MaterialCommunityIcons
                name="phone-outline"
                size={15}
                color="#333"
              />
              <Text style={{ fontWeight: '400', fontSize: 14, marginLeft: 10 }}>+855 979295666</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}
              onPress={()=>{
                const url = "tel:+855979298666";
                Linking.openURL(url);
              }}
            >
              <MaterialCommunityIcons
                name="phone-outline"
                size={15}
                color="#333"
              />
              <Text style={{ fontWeight: '400', fontSize: 14, marginLeft: 10 }}>+855 979298666</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={15}
              color="#333"
            />
            <Text style={{ fontWeight: '400', fontSize: 14, marginLeft: 10 }}>caosudnkn@gmail.com</Text>
          </TouchableOpacity>

        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
  },
  page: {
    alignItems: "center"
  },
});

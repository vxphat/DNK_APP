import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { useTranslation } from "react-i18next"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { useRouter } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons'

const Page = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const history = useSelector((state: RootState) => state.history.history);


  const renderItem = ({ item }: { item: { batchCode: string; datetime: string } }) => (
    <TouchableOpacity style={styles.item}
      onPress={() => {
        router.push(`/(tabs)/handle/details_slot?batchCode=${item.batchCode}`)
      }}
    >

      <Ionicons
        name="code-slash"
        size={50}
        color="#039375"
      />
      <View style={{ paddingLeft: 20 }}>
        <Text style={styles.code}>{item.batchCode}</Text>
        <Text style={styles.date}>
        {new Date(item.datetime).toLocaleDateString("en-CA") + " " + new Date(item.datetime).toLocaleTimeString("en-CA", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
        </Text>
      </View>
    </TouchableOpacity>
  );


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
              {t('history')}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Nội dung chính */}
      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10 }}>
        {history.length == 0 && (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Image source={require('../../assets/images/no-data.png')} />
            <Text>{t('noData')} ...</Text>
          </View>
        )}

        <FlatList
          data={history}
          keyExtractor={(item) => item.batchCode}
          renderItem={renderItem}
        />
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
  item: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  code: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

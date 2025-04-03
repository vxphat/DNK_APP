import { StyleSheet, View, Text, TouchableOpacity, Linking, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from "expo-linear-gradient"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { useDispatch } from "react-redux"
import { logout } from "../../../store/slice/authSlice"
import { RootState } from "../../../store"
import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next"


const Setting = () => {
  const router = useRouter();
  
  const { t } = useTranslation();
  const dispatch = useDispatch()

  

  const sendEmail = () => {
    const url = "mailto:caosudnkc@gmail.com?subject=&body=";
    Linking.openURL(url);
  };

  const Call = () => {
    const url = "tel:+855979295666";
    Linking.openURL(url);
  };

  const handleDeleteAccount = () => {
    Alert.alert(t('notification'), t('areYouSureYouWantToDeleteYourAccount'), [
      {
        text: t('cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: t('ok'), onPress: () => console.log('OK Pressed') },
    ]);
  }

  const handleLogout = () => {
    Alert.alert(t('notification'), t('areYouSureYouWanttoLogOutOfYourAccount'), [
      {
        text: t('cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: t('ok'), onPress: () => {
        dispatch(logout());
        router.push("../../login");
      } },
    ]);
  }


  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
      {/* Header với LinearGradient */}
      <View>
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
              {t('setting')}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Nội dung chính */}
      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10, paddingTop: 10 }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/setting/changePassword");
            }}
          >
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Ionicons
                  name="key-outline"
                  size={25}
                  color="#039375"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>{t('changePassword')}</Text>
              </View>
              <View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color="#333333"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={sendEmail}>
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  name="email-fast-outline"
                  size={25}
                  color="#039375"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>{t('supportViaEmail')}</Text>
              </View>
              <View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color="#333333"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={Call}>
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  name="phone-in-talk-outline"
                  size={25}
                  color="#039375"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>{t('supportViaPhone')}</Text>
              </View>
              <View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color="#333333"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/setting/language");
            }}
          >
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Ionicons
                  name="language-outline"
                  size={25}
                  color="#039375"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>{t('language')}</Text>
              </View>
              <View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color="#333333"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://dongnaikratie.com/policy');
            }}
          >
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Ionicons
                  name="earth-outline"
                  size={25}
                  color="#039375"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.color}>{t('policy')}</Text>
              </View>
              <View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color="#333333"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={handleLogout}
          >
            <View style={[styles.item, { backgroundColor: '#fac0c3' }]}>
              <View style={{ flex: 1 }}>
                <Ionicons
                  name="log-out-outline"
                  size={25}
                  color="#fff"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={[styles.color, { color: "#333" }]}>{t('logout')}</Text>
              </View>
              <View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color="#333333"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            onPress={handleDeleteAccount}
          >
            <View style={[styles.item, { backgroundColor: '#730108' }]}>
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  name="account-cancel"
                  size={25}
                  color="#fff"
                />
              </View>
              <View style={{ flex: 6 }}>
                <Text style={[styles.color, { color: "#fff" }]}>{t('deleteAccount')}</Text>
              </View>

            </View>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  color: {
    color: "#039375",
    fontWeight: "600",
    fontSize: 16,
  },
});

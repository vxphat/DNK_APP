import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator} from "react-native"
import { useRouter } from "expo-router"
import React, { useState, useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import axios from "axios"

export default function DoiMatKhauScreen() {
  const router = useRouter();
  const { t, } = useTranslation();
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorConfirmPw, setErrorConfirmPw] = useState(false)
  

  const handleLogin = async () => {
    console.log('change password');
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
      <View>
        <LinearGradient colors={["#05D781", "#039375"]}>
          <View
            style={{
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "5%" }}>
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={28}
                  color="#fff"
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
              <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>
                {t('changePassword')}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={{ flex: 1, backgroundColor: "#f1f4f2", paddingHorizontal: 10, paddingTop: 10 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("../../../assets/images/Logo_DNKC_RGB.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.bgInput}>
            <View style={{ width: '10%' }}>
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={20}
                color="#039375"
              />
            </View>
            <TextInput
              placeholder={t('oldPassword')}
              style={styles.input}
              value={oldPassword}
              secureTextEntry={showPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-outline" : 'eye-off-outline'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.bgInput, {borderWidth: errorConfirmPw ? 1 : 0, borderColor:'#f66'}]}>
            <View style={{ width: '10%' }}>
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={20}
                color="#039375"
              />
            </View>
            <TextInput
              placeholder={t('newPassword')}
              style={[styles.input]}
              value={newPassword}
              secureTextEntry={showPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-outline" : 'eye-off-outline'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.bgInput, {borderWidth: errorConfirmPw ? 1 : 0, borderColor:'#f66'}]}>
            <View style={{ width: '10%' }}>
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={20}
                color="#039375"
              />
            </View>
            <TextInput
              placeholder={t('confirmPassword')}
              style={styles.input}
              value={confirmPassword}
              secureTextEntry={showPassword}
              onChangeText={(text)=>{
                setConfirmPassword(text)
                if(newPassword!=text){
                  setErrorConfirmPw(true)
                }else{
                  setErrorConfirmPw(false)
                }
              }}
            />
            <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-outline" : 'eye-off-outline'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          </View>
         

          <LinearGradient colors={["#05D781", "#039375"]} style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Mật khẩu đã được thay đổi!");
              }}
            >
              {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.text}>{t('changePassword')}</Text>
                )}
              
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    width: "100%",
    height: 45,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 35, height: 50, color: "#000", fontSize: 18, paddingVertical: 0, width: '80%'
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase"
  },
  bgInput: {
    flexDirection: 'row', paddingVertical: 0, padding: 20, marginBottom: 15, borderRadius: 35, backgroundColor: "#fff", height: 50, alignItems: 'center'
  }
});

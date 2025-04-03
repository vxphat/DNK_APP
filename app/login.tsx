import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native"
import React, { useState, useEffect } from 'react'
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { useDispatch, useSelector } from "react-redux"
import { login, setUserInfo } from "../store/slice/authSlice"
import { RootState } from "../store"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from "react-i18next"
import axios from "axios"

export default function DangNhapScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [loading, setLoading] = useState(false)
  const [storePassword, setStorePassword] = useState(false)

  useEffect(() => {
    
    if(user){
      router.push("/(tabs)");
    }
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`https://dongnaikratie.com/api/auth/login`, {
        phonenumber: username,
        password: password,
      });
      if (response.data.status == true) {
        router.push("/(tabs)");
        
        dispatch(setUserInfo({ token: response.data.token, user: response.data.user }));
        dispatch(login({ token: response.data.token, user: response.data.user }));
      } else {
        alert(t('errorLogin'));
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Ẩn bàn phím khi bấm ra ngoài */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Image
                  source={require("../assets/images/Logo_DNKC_RGB.png")}
                  style={{ width: 200, height: 200 }}
                  resizeMode="contain"
                />
              </View>

              <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 20 }}>

                <View style={styles.bgInput}>
                  <View style={{ width: '10%' }}>
                    <MaterialCommunityIcons
                      name="account"
                      size={20}
                      color="#039375"
                    />
                  </View>
                  <TextInput
                    placeholder={t('username')}
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>

                <View style={styles.bgInput}>
                  <View style={{ width: '10%' }}>
                    <MaterialCommunityIcons
                      name="key-variant"
                      size={20}
                      color="#039375"
                    />
                  </View>
                  <TextInput
                    placeholder={t('password')}
                    secureTextEntry={showPassword}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-outline" : 'eye-off-outline'}
                      size={20}
                      color="#333"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }}
                  onPress={() => { setStorePassword(!storePassword) }}
                >
                  <MaterialCommunityIcons
                    name={storePassword ? "checkbox-blank-outline" : 'checkbox-marked-outline'}
                    size={20}
                    color="#039375"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: '500', color: '#' }}>Lưu đăng nhập</Text>
                </TouchableOpacity>
                <LinearGradient colors={["#05D781", "#039375"]} style={styles.button}>
                  <TouchableOpacity
                    onPress={handleLogin}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.text}>{t('login')}</Text>
                    )}


                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20, width: "100%", height: 50, borderRadius: 50, justifyContent: "center",
  },
  input: {
    borderRadius: 35, height: 50, color: "#000", fontSize: 18, paddingVertical: 0, width: '80%'
  },
  text: {
    color: "white", textAlign: "center", fontSize: 18, fontWeight: "700", textTransform: "uppercase"
  },
  bgInput: {
    flexDirection: 'row', paddingVertical: 0, padding: 20, marginBottom: 15, borderRadius: 35, backgroundColor: "#fff", height: 50, alignItems: 'center'
  }
});

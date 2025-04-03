import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { addHistory } from "../../store/slice/historySlice"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"


const Page = () => {
    const [facing, setFacing] = useState<CameraType>('back')
    const dispatch = useDispatch()
    const router = useRouter()
    const [permission, requestPermission] = useCameraPermissions()
    const [scanned, setScanned] = useState(false); // Thêm state để theo dõi trạng thái quét
    const [qrData, setQrData] = useState(""); // Lưu dữ liệu mã QR
    const { t } = useTranslation()

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    {t('weNeedYourPermissionToShowTheCamera')}
                </Text>
                <Button onPress={requestPermission} title={t("grantPermission")} />
            </View>
        );
    }
    const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
            setScanned(true); // Tạm dừng quét
            setQrData(data);
            dispatch(addHistory({ batchCode: data }));
            router.push(`/(tabs)/handle/details_slot?batchCode=${data}`)
        }
    };

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
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
                            flexDirection: 'row'
                        }}
                    >
                        <View style={{ width: '10%' }}>

                        </View>
                        <View style={{ width: '80%', alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>
                                {t('scanQRCode')}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ width: '10%' }} onPress={toggleCameraFacing}>
                            <Ionicons
                                name="camera-reverse"
                                size={30}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>


            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    
                >
                    {/* Overlay để hiển thị khung quét 300x300 */}
                    <View style={styles.overlay}>
                        {/* Lớp mờ trên */}
                        <View style={[styles.mask, { height: "30%" }]} />
                        <View style={{ flexDirection: "row", height: "40%" }}>
                            {/* Lớp mờ bên trái */}
                            <View style={[styles.mask, { width: "15%" }]} />

                            {/* Vùng quét QR */}
                            <View style={[styles.scanArea, {width:'70%'}]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 50, height: 50, borderLeftWidth: 8, borderTopWidth: 8, borderColor: 'white', borderTopLeftRadius:20 }} />
                                    <View style={{ width: 200, height: 50 }} />
                                    <View style={{ width: 50, height: 50, borderRightWidth: 8, borderTopWidth: 8, borderColor: 'white', borderTopRightRadius:20 }} />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 300, height: 200 }} />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 50, height: 50, borderLeftWidth: 8, borderBottomWidth: 8, borderColor: 'white', borderBottomLeftRadius:20 }} />
                                    <View style={{ width: 200, height: 50 }} />
                                    <View style={{ width: 50, height: 50, borderRightWidth: 8, borderBottomWidth: 8, borderColor: 'white', borderBottomRightRadius:20 }} />
                                </View>
                            </View>

                            {/* Lớp mờ bên phải */}
                            <View style={[styles.mask, { width: "15%" }]} />
                        </View>
                        <View style={[styles.mask, { height: "30%" }]} />

                    </View>

                    
                </CameraView>
                {scanned && (
                    <View style={styles.qrResult}>
                        <Text style={styles.qrText}>Dữ liệu QR: {qrData}</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    overlay: {
        height: "100%",
        width: "100%",
        position: "absolute",
        justifyContent: "center",

    },
    mask: {
        // backgroundColor: "rgba(0, 0, 0, 0.7)", // Màu tối mờ
    },
    scanArea: {
        width: 300,
        height: 300,
        backgroundColor: "transparent",


    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    qrResult: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 10,
        borderRadius: 5,
    },
    qrText: {
        color: "white",
        textAlign: "center",
    },
});

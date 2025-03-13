import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false); // Thêm state để theo dõi trạng thái quét
  const [qrData, setQrData] = useState(""); // Lưu dữ liệu mã QR

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  // Hàm xử lý khi quét được mã QR
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data); // Lưu dữ liệu mã QR
    alert(`Mã QR: ${data} (Loại: ${type})`); // Hiển thị thông tin mã QR
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Chỉ quét mã QR
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Chỉ quét khi chưa scanned
      >
        {/* Overlay để hiển thị khung quét 300x300 */}
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          {scanned && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)} // Cho phép quét lại
            >
              <Text style={styles.text}>Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
      {scanned && (
        <View style={styles.qrResult}>
          <Text style={styles.qrText}>Dữ liệu QR: {qrData}</Text>
        </View>
      )}
    </View>
  );
}

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
    width: "100%", // Đảm bảo camera chiếm toàn màn hình
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ bên ngoài khung quét
  },
  scanArea: {
    width: 300, // Kích thước khung quét
    height: 300, // Kích thước khung quét
    borderWidth: 2,
    borderColor: "white", // Viền trắng để nổi bật
    backgroundColor: "transparent", // Vùng quét trong suốt
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

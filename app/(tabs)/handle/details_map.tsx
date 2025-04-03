import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Animated, Linking, Alert, Platform } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import React, { useRef, useEffect, useState } from 'react'
import * as Clipboard from "expo-clipboard"
import { SafeAreaView } from "react-native-safe-area-context"
import MapView, { Polygon, Marker, Callout } from "react-native-maps"
import { useTranslation } from "react-i18next"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import axios from "axios"


interface GeoJson {
    type: 'Polygon' | 'MultiPolygon' | null;
    coordinates: number[][][] | number[][][][];
}

export default function DetailsFarmScreen() {
    const router = useRouter()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [initialRegion, setInitialRegion] = useState<any>(null)
    const [geoJson, setGeoJson] = useState<GeoJson>({ type: null, coordinates: [] })
    const [idPlot, setIDPlot] = useState(null)
    const token = useSelector((state: RootState) => state.auth.token)
    const { idMap, Plot } = useLocalSearchParams()
    const [data, setData] = useState<any>(null);

    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    type Coordinate = [number, number];
    type Polygon = Coordinate[];
    type MultiPolygon = Polygon[];
    const plotData = {
        id: 762,
        producer: "Donaruco",
        country: "Vietnam",
        plantingY: 2015,
        areaHa: 16.50,
        // ... các thông tin khác từ ảnh của bạn
        latitude: 10.1234, // Vĩ độ của lô đất
        longitude: 106.5678 // Kinh độ của lô đất
    };


    useEffect(() => {
        fetchData(idMap)
    }, [idMap])



    const fetchData = async (idMap: any) => {
        setLoading(true)
        // console.log(123, token, batchCode)
        try {
            const response = await axios.get(`https://dongnaikratie.com/api/map/geojson`, {
                params: { idMap: idMap }, // Truyền idMap dưới dạng query params
            });

            if (response.data.status === true) {
                const coordinates = JSON.parse(response.data.result.geometry);
                // console.log(coordinates)
                setGeoJson(coordinates)
                setData(response.data.result)
                setIDPlot(response.data.result.Plot)
                const center = calculateCenter(coordinates)
                setInitialRegion(center)


            } else {
                alert(t('theBatchCodeDoesNotExist'));
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu GET:", error);
        }

        setLoading(false);
    }

    const calculateCenter = (geoJson: { type: string; coordinates: MultiPolygon | MultiPolygon[] }) => {
        let allCoordinates: Coordinate[] = [];
        if (geoJson.type === "Polygon") {
            allCoordinates = geoJson.coordinates[0] as Coordinate[]; // Ép kiểu để TypeScript hiểu đúng
        } else if (geoJson.type === "MultiPolygon") {
            allCoordinates = (geoJson.coordinates as MultiPolygon[]).flat(2); // Làm phẳng MultiPolygon thành danh sách tọa độ
        } else {
            throw new Error("Invalid GeoJSON type");
        }

        const totalPoints = allCoordinates.length;
        if (totalPoints === 0) return null;
        const sum = allCoordinates.reduce(
            (acc, [lon, lat]) => {
                acc.longitude += lon;
                acc.latitude += lat;
                return acc;
            },
            { latitude: 0, longitude: 0 }
        );
        return {
            latitude: sum.latitude / totalPoints,
            longitude: sum.longitude / totalPoints,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#05D781" }} edges={["top"]}>
            <LinearGradient
                colors={["#05D781", "#039375"]}
            >
                <View
                    style={{
                        height: 50,
                        flexDirection: "row",
                    }}
                >
                    <View style={{ width: "10%", justifyContent: 'center', alignItems: 'center' }}>
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
                            {Plot}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={{ flex: 1, backgroundColor: "#f1f4f2" }}>
                {initialRegion && (
                    <>
                        <MapView
                            style={styles.map}
                            initialRegion={initialRegion}
                            zoomEnabled={true}
                            mapType="satellite"
                        >
                            {/* Marker chính với Callout */}
                            <Marker
                                coordinate={{
                                    latitude: initialRegion.latitude,
                                    longitude: initialRegion.longitude
                                }}
                                title={idMap.toString()}
                                onPress={() => setSelectedMarker(data)}
                            >
                                <Callout tooltip>
                                    <View style={styles.calloutContainer}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <Text style={styles.calloutTitle}>{idMap.toString()}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Quốc Gia: </Text>
                                            <Text style={{ fontWeight: 'bold' }}>{data.Country}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Công ty: </Text>
                                            <Text style={{ fontWeight: 'bold' }}>{data.Producer}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Nông Trường: </Text>
                                            <Text style={{ fontWeight: 'bold' }}>{data.Plantation}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Tên lô: </Text>
                                            <Text style={{ fontWeight: 'bold' }}>{data.Plot}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Năm trồng: </Text>
                                            <Text style={{ fontWeight: 'bold' }}>{data.Start_tapping_Year}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Giống: </Text>
                                            <Text style={{ fontWeight: 'bold' }}>{data.Rubber_Species}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Diện tích: </Text>
                                            <Text style={{ fontWeight: 'bold' }}>{data.Area_hectare}hec</Text>
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>

                            {geoJson && geoJson.coordinates && geoJson.coordinates.length > 0 &&
                                geoJson.coordinates.map((polygon, idx) => {
                                    if (!Array.isArray(polygon) || polygon.length === 0) return null;

                                    let coordinates: { latitude: number; longitude: number }[] = [];

                                    if (geoJson.type === 'MultiPolygon') {
                                        coordinates = (polygon[0] as number[][]).map(([longitude, latitude]) => ({
                                            latitude,
                                            longitude
                                        }));
                                    } else {
                                        coordinates = (polygon as number[][]).map(([longitude, latitude]) => ({
                                            latitude,
                                            longitude
                                        }));
                                    }

                                    // Tính toán trung tâm polygon để đặt Marker
                                    const center = coordinates.reduce((acc, point) => {
                                        return {
                                            latitude: acc.latitude + point.latitude,
                                            longitude: acc.longitude + point.longitude
                                        };
                                    }, { latitude: 0, longitude: 0 });

                                    const centerPoint = {
                                        latitude: center.latitude / coordinates.length,
                                        longitude: center.longitude / coordinates.length
                                    };

                                    return (
                                        <React.Fragment key={idx}>
                                            <Polygon
                                                coordinates={coordinates}
                                                strokeWidth={2}
                                                strokeColor="rgba(0, 128, 255, 1)"
                                                fillColor="rgba(0, 128, 255, 0.4)"
                                            />
                                            {/* Marker cho mỗi polygon */}

                                        </React.Fragment>
                                    );
                                })
                            }
                        </MapView>
                        {selectedMarker && Platform.OS === 'android' && (
                            <View style={styles.androidCallout}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={styles.calloutTitle}>{idMap.toString()}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Quốc Gia: </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{data.Country}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Công ty: </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{data.Producer}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Nông Trường: </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{data.Plantation}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Tên lô: </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{data.Plot}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Năm trồng: </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{data.Start_tapping_Year}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Giống: </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{data.Rubber_Species}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Diện tích: </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{data.Area_hectare}hec</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setSelectedMarker(null)}
                                >
                                    <Text style={styles.closeButtonText}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                )}

            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    text_1: {
        fontSize: 35,
        color: "#039375",
        fontWeight: 600,
    },
    text_2: {
        fontSize: 16,
        color: "#039375",
        fontWeight: 600,
    },
    text_3: {
        fontSize: 16,
        color: "#000",
        fontWeight: 600,
    },

    button_slot: {
        marginBottom: 10,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    bg: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        width: "100%",

        alignItems: "center",
        marginBottom: 100,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    item: {
        flexDirection: "row",
        paddingVertical: 15,
        borderBottomColor: "#EDE9E9",
        borderBottomWidth: 1,
        width: "95%",
    },
    dropdownItem: {
        backgroundColor: "#05D781",
        borderRadius: 30,
        padding: 5
    },
    dropdown: {
        width: "90%",
        backgroundColor: "#fff",
        overflow: "hidden",
        borderBottomColor: "#EDE9E9",
    },
    dropdown_1: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    dropdown_2: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    noBoder: {
        borderBottomWidth: 0
    },
    markerContainer: {
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 3,
        borderRadius: 2,
    },
    markerText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 12,
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: 250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tooltipTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: 'blue',
    },
    calloutContainer: {
        width: 200,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6,
    },
    androidCallout: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 6,
        elevation: 5,
    },
    calloutTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
});

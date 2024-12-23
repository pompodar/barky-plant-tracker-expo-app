import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
    const [photosByPlant, setPhotosByPlant] = useState({});

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const savedPhotos = await AsyncStorage.getItem("pics");

                setPhotosByPlant(savedPhotos ? JSON.parse(savedPhotos) : {});
            } catch (error) {
                console.error("Error loading photos:", error);
            }
        };

        loadPhotos();
    }, [photosByPlant]);

    const removePhoto = async (plantName, photoUri) => {
        Alert.alert(
            "Confirm Removal",
            "Are you sure you want to remove this photo?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const storedData =
                                JSON.parse(
                                    await AsyncStorage.getItem("pics")
                                ) || {};

                            // Check if the plant has any photos
                            if (
                                !storedData[plantName] ||
                                storedData[plantName].length === 0
                            ) {
                                console.error("No photos found for this plant");
                                return;
                            }

                            // Filter out the photo you want to remove
                            const updatedPhotos = storedData[plantName].filter(
                                (photo) => photo.uri !== photoUri
                            );

                            // If no photos remain for this plant, remove the plant itself from storage
                            if (updatedPhotos.length === 0) {
                                delete storedData[plantName];
                            } else {
                                storedData[plantName] = updatedPhotos;
                            }

                            // Update the photos in AsyncStorage
                            await AsyncStorage.setItem(
                                "pics",
                                JSON.stringify(storedData)
                            );

                            alert("Photo removed!");
                        } catch (error) {
                            alert("Failed to remove photo.");
                            console.error("Error removing photo:", error);
                        }
                    },
                },
            ]
        );
    };

    const openFullScreen = (uri) => {
        navigation.navigate("FullScreenImageScreen", { uri });
    };

    return (
        <View style={styles.container}>
            <>
                {Object.keys(photosByPlant).length === 0 ? (
                    <Text style={styles.noPhotos}>No photos uploaded yet!</Text>
                ) : (
                    Object.keys(photosByPlant).map((plantName) => (
                        <View key={plantName} style={styles.plantSection}>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <Text style={styles.plantName}>
                                    {plantName}
                                </Text>
                            </View>

                            <FlatList
                                data={photosByPlant[plantName].reverse()}
                                horizontal={true}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.photoContainer}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                openFullScreen(item.uri)
                                            }
                                        >
                                            <Image
                                                source={{ uri: item.uri }}
                                                style={styles.photo}
                                            />
                                            <Text style={styles.dateText}>
                                                {item.date}
                                            </Text>
                                            <TouchableOpacity
                                                style={styles.removeButton}
                                                onPress={() =>
                                                    removePhoto(
                                                        plantName,
                                                        item.uri
                                                    )
                                                }
                                            >
                                                <AntDesign
                                                    name="closecircleo"
                                                    size={24}
                                                    color="red"
                                                />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />

                            <TouchableOpacity
                                style={styles.leaf}
                                onPress={() =>
                                    navigation.navigate("PlantGallery", {
                                        plantName: plantName,
                                        photos: photosByPlant[plantName],
                                    })
                                }
                            >
                                <AntDesign
                                    name="shrink"
                                    size={24}
                                    color="#4A4A4A"
                                />

                                <Text style={styles.compareText}>compare</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </>

            <View style={styles.navigation}>
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => navigation.navigate("Home")}
                >
                    <AntDesign name="home" size={24} color="#F4A460" />

                    <Text style={styles.navigationText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => navigation.navigate("Save Photo")}
                >
                    <AntDesign name="upload" size={24} color="#F4A460" />

                    <Text style={styles.navigationText}>upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "flex-start",
        padding: 16,
        backgroundColor: "#fff",
        fontFamily: "Lora",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        fontFamily: "Lora",
    },
    compareText: {
        color: "#4A4A4A",
        fontSize: 10,
        fontFamily: "Lora",
    },
    plantSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        height: 200,
    },
    plantName: {
        fontSize: 16,
        marginBottom: 8,
        color: "#008080", // Text color
        fontFamily: "Lora",
        alignSelf: "flex-start",
    },
    photoContainer: {
        margin: 5,
        alignItems: "center",
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    noPhotos: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    },
    dateText: {
        fontSize: 12,
        color: "#888",
        fontFamily: "Lora",
    },
    removeButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    removeButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    navigation: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        width: "110%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 42,
        borderTopWidth: 0,
        borderColor: "#ccc",
    },
    navigationItem: {
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    navigationIcon: {
        fontSize: 12,
    },
    navigationText: {
        color: "#F4A460",
        fontSize: 10,
    },
});

export default HomeScreen;

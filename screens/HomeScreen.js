import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
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


    return (
        <View style={styles.container}>
            <Button
                title="Upload Photo"
                onPress={() => navigation.navigate("Save Photo")}
            />

            {Object.keys(photosByPlant).length === 0 ? (
                <Text style={styles.noPhotos}>No photos uploaded yet!</Text>
            ) : (
                Object.keys(photosByPlant).map((plantName) => (
                    <View key={plantName} style={styles.plantSection}>
                        <Text style={styles.plantName}>{plantName}</Text>
                        <FlatList
                            data={photosByPlant[plantName].reverse()}
                            horizontal={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.photoContainer}>
                                    <TouchableOpacity>
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
                                                removePhoto(plantName, item.uri)
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
                    </View>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    plantSection: {
        marginBlock: 20,
    },
    plantName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
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
    },
    removeButton: {
        marginTop: 10,
    },
    removeButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default HomeScreen;

import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native'; // Import the hook

const PlantGalleryScreen = ({ route, navigation }) => {
    const { plantName, photos } = route.params;
    const [selectedPhotos, setSelectedPhotos] = React.useState([]);

     useFocusEffect(
         React.useCallback(() => {
             setSelectedPhotos([]);
         }, [])
     );

    const selectPhoto = (uri, date) => {
        setSelectedPhotos((prevSelectedPhotos) => {
            const updatedSelectedPhotos = [
                ...prevSelectedPhotos,
                { uri, date },
            ];

            if (updatedSelectedPhotos.length === 2) {
                navigation.navigate("CompareScreen", {
                    selectedPhotos: updatedSelectedPhotos,
                });
            }

            return updatedSelectedPhotos;
        });
    };

    const isSelected = (uri, date) => {
        return selectedPhotos.some(
            (photo) => photo.uri === uri && photo.date === date
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{plantName} Gallery</Text>
            {photos.length === 0 ? (
                <Text style={styles.noPhotosText}>
                    No photos available for this plant.
                </Text>
            ) : (
                <FlatList
                    data={photos}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.photoContainer}>
                            <TouchableOpacity
                                onPress={() => selectPhoto(item.uri, item.date)}
                            >
                                <Image
                                    source={{ uri: item.uri }}
                                    style={[
                                        styles.photo,
                                        isSelected(item.uri, item.date) &&
                                            styles.selectedPhoto,
                                    ]}
                                />

                                <Text style={styles.dateText}>{item.date}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    noPhotosText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    },
    photoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    photoContainer: {
        margin: 5,
        alignItems: "center",
    },
    selectedPhoto: {
        opacity: 0.6, // Make the selected photo slightly transparent
    },
    photo: {
        height: 150,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: "#ccc",
    },
});

export default PlantGalleryScreen;

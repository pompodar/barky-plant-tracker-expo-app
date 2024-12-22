import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ComparePhotosScreen() {
    const [photos, setPhotos] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    useEffect(() => {
        const loadPhotos = async () => {
            const storedPhotos =
                JSON.parse(await AsyncStorage.getItem("photos")) || [];
            setPhotos(storedPhotos);
        };
        loadPhotos();
    }, []);

    const toggleSelection = (uri) => {
        if (selectedPhotos.includes(uri)) {
            setSelectedPhotos(selectedPhotos.filter((photo) => photo !== uri));
        } else if (selectedPhotos.length < 2) {
            setSelectedPhotos([...selectedPhotos, uri]);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleSelection(item)}>
                        <Image
                            source={{ uri: item }}
                            style={
                                selectedPhotos.includes(item)
                                    ? styles.selectedImage
                                    : styles.image
                            }
                        />
                    </TouchableOpacity>
                )}
                numColumns={3}
            />
            <View style={styles.comparisonContainer}>
                {selectedPhotos.map((uri, index) => (
                    <Image
                        key={index}
                        source={{ uri: uri }}
                        style={styles.comparisonImage}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    image: { width: 100, height: 100, margin: 5 },
    selectedImage: {
        width: 100,
        height: 100,
        margin: 5,
        borderColor: "blue",
        borderWidth: 2,
    },
    comparisonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    comparisonImage: { width: 150, height: 150, marginHorizontal: 10 },
});

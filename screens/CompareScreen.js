import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const CompareScreen = ({ route }) => {
    const { selectedPhotos } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ScrollView horizontal>
                {selectedPhotos.map((photo, idx) => (
                    <Image
                        key={idx}
                        source={{ uri: photo.uri }}
                        style={styles.photo}
                    />
                ))}
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
    },
    compareColumn: {
        flex: 1,
        marginHorizontal: 8,
    },
    plantName: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    photo: {
        width: 100,
        height: 100,
        marginHorizontal: 4,
    },
});

export default CompareScreen;

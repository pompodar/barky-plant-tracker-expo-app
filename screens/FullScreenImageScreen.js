import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const FullScreenImageScreen = ({ route, navigation }) => {
    const { uri } = route.params; // Get the image URI passed via navigation

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()} // Go back to the previous screen
            >
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            
            <Image source={{ uri }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 5,
    },
    closeText: {
        color: "white",
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: "80%",
        resizeMode: "contain",
    },
});

export default FullScreenImageScreen;

import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const CompareScreen = ({ route, navigation }) => {
    const { selectedPhotos } = route.params;

    const openFullScreen = ( uri ) => {
        navigation.navigate("FullScreenImageScreen", { uri });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={selectedPhotos}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.photoContainer}>
                        <TouchableOpacity
                            onPress={() => openFullScreen(item.uri)}
                        >
                            <Image
                                source={{ uri: item.uri }}
                                style={styles.photo}
                            />

                            <Text style={styles.dateText}>{item.date}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
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
        width: 180,
        height: 180,
        marginHorizontal: 4,
    },
});

export default CompareScreen;

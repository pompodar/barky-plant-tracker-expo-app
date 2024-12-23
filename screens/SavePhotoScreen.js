import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    TextInput,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFont } from "expo-dynamic-fonts";

const SavePhotoScreen = ({ navigation }) => {
    const [photoUri, setPhotoUri] = useState(null);
    const [plantName, setPlantName] = useState("");

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access media library is required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
        }
    };

    const savePhoto = async () => {
        if (!photoUri || !plantName) {
            alert("Please select a photo and enter a plant name.");
            return;
        }

        try {
            const photo = { uri: photoUri, date: new Date().toLocaleString() };
            const storedData =
                JSON.parse(await AsyncStorage.getItem("pics")) || {};
            if (!storedData[plantName]) {
                storedData[plantName] = [];
            }

            storedData[plantName].push(photo);

            // Save the updated photos in AsyncStorage
            await AsyncStorage.setItem("pics", JSON.stringify(storedData));
            alert("Photo saved");
            navigation.navigate("Home");
        } catch (error) {
            alert("Failed to save photo.");
            console.error(error);
        }
    };

    const lora = useFont("Lora");
    const openSansLoaded = useFont("Open Sans");

    if (!lora || !openSansLoaded) {
        return (
            <View>
                <Text>Loading fonts...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter plant name"
                value={plantName}
                onChangeText={setPlantName}
            />
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an image</Text>
            </TouchableOpacity>
            {photoUri && (
                <Image source={{ uri: photoUri }} style={styles.image} />
            )}
            <Button title="Save Photo" onPress={savePhoto} />

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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    input: {
        width: "80%",
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    button: {
        padding: 20,
        paddingBlock: 10,
        borderRadius: 5,
        backgroundColor: "aqua",
        color: "white",
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
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

export default SavePhotoScreen;

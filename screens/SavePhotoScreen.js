import React, { useState } from "react";
import {
    View,
    Button,
    TextInput,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter plant name"
                value={plantName}
                onChangeText={setPlantName}
            />
            <Button title="Pick an Image" onPress={pickImage} />
            {photoUri && (
                <Image source={{ uri: photoUri }} style={styles.image} />
            )}
            <Button title="Save Photo" onPress={savePhoto} />
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
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
});

export default SavePhotoScreen;
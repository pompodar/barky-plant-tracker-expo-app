import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { Shadow } from "react-native-shadow-2";

const SavePhotoScreen = ({ navigation }) => {
    const [photoUri, setPhotoUri] = useState(null);
    const [plantName, setPlantName] = useState("");
    const [plantOptions, setPlantOptions] = useState([]);

    useEffect(() => {
        const loadPlantOptions = async () => {
            try {
                const storedData =
                    JSON.parse(await AsyncStorage.getItem("pics")) || {};
                setPlantOptions(Object.keys(storedData));
            } catch (error) {
                console.error("Failed to load plant options:", error);
            }
        };

        loadPlantOptions();
    }, []);

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
            alert("Please select a photo and choose a plant.");
            return;
        }

        try {
            const photo = {
                uri: photoUri,
                date: new Date().toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                }),
            };

            const storedData =
                JSON.parse(await AsyncStorage.getItem("pics")) || {};
            if (!storedData[plantName]) {
                storedData[plantName] = [];
            }

            storedData[plantName].push(photo);

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
            <Image
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: [{ translateX: -70 }, { translateY: -70 }],
                    width: 140,
                    height: 140,
                }}
                source={require("../assets/images/leaf.png")}
            />

            <Image
                style={{
                    position: "absolute",
                    top: "88%",
                    left: "88%",
                    transform: [{ translateX: -70 }, { translateY: -70 }],
                    width: 100,
                    height: 100,
                }}
                source={require("../assets/images/leaf.png")}
            />
            <View
                style={{
                    position: "relative",
                    width: "100%",
                    borderRadius: 5,
                    overflow: "hidden",
                    alignSelf: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <AntDesign
                    style={{ position: "absolute", right: 55, top: 14 }}
                    name="downcircle"
                    size={24}
                    color="white"
                />

                <Picker
                    selectedValue={plantName}
                    onValueChange={(itemValue) => setPlantName(itemValue)}
                    itemStyle={styles.pickerItem}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a plant" value="" />
                    {plantOptions.map((plant) => (
                        <Picker.Item key={plant} label={plant} value={plant} />
                    ))}
                </Picker>
            </View>

            {plantName && (
                <TouchableOpacity
                    style={{ marginBlock: 20 }}
                    onPress={pickImage}
                >
                    <AntDesign name="addfile" size={34} color="#F4A460" />
                    <Text style={styles.navigationText}>upload</Text>
                </TouchableOpacity>
            )}

            {photoUri && (
                <Shadow>
                    <Image source={{ uri: photoUri }} style={styles.image} />
                </Shadow>
            )}

            {photoUri && (
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={savePhoto}
                >
                    <AntDesign name="save" size={42} color="#FF7F50" />
                    <Text style={styles.navigationText}>save</Text>
                </TouchableOpacity>
            )}

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
                    <Text style={styles.navigationText}>Upload</Text>
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
    picker: {
        width: "80%",
        height: 50,
        marginBottom: 20,
        color: "white",
        backgroundColor: "#F4A460",
        zIndex: -1,
    },
    pickerItem: {
        width: "80%",
        height: 50,
        marginBottom: 20,
        backgroundColor: "#F4A460",
    },
    button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#F4A460",
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 9999,
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
    navigationText: {
        color: "#F4A460",
        fontSize: 10,
    },
});

export default SavePhotoScreen;

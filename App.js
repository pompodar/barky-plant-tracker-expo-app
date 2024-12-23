import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SavePhotoScreen from "./screens/SavePhotoScreen";
import ComparePhotosScreen from "./screens/ComparePhotosScreen";
import PlantGalleryScreen from "./screens/PlantGalleryScreen";
import CompareScreen from "./screens/CompareScreen";
import FullScreenImageScreen from "./screens/FullScreenImageScreen";
import { useFont } from "expo-dynamic-fonts";

const Stack = createStackNavigator();

export default function App() {
    const lora = useFont("Montserrat");
    const openSansLoaded = useFont("Open Sans");

    if (!lora || !openSansLoaded) {
        return (
            <View>
                <Text>Loading fonts...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forRevealFromBottomAndroid,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "Bayka",
                        headerTitleStyle: {
                            fontSize: 24,
                            fontFamily: "Lora",
                            color: "#98FF98", // Text color
                            textAlign: "center", // Title alignment
                        },
                    }}
                />
                <Stack.Screen name="Save Photo" component={SavePhotoScreen} />
                <Stack.Screen
                    name="Compare Photos"
                    component={ComparePhotosScreen}
                />
                <Stack.Screen
                    name="PlantGallery"
                    component={PlantGalleryScreen}
                />
                <Stack.Screen name="CompareScreen" component={CompareScreen} />
                <Stack.Screen
                    name="FullScreenImageScreen"
                    component={FullScreenImageScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

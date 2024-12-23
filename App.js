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
import AntDesign from "@expo/vector-icons/AntDesign";

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
                        headerTitle: () => (
                            <View
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{ fontSize: 18, color: "#98FF98" }}
                                >
                                    Bayka
                                </Text>

                                <View
                                    style={{
                                        width: "20%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <AntDesign
                                        name="login"
                                        size={20}
                                        color="#98FF98"
                                    />

                                    <AntDesign
                                        name="profile"
                                        size={20}
                                        color="#98FF98"
                                    />
                                </View>
                            </View>
                        ),
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

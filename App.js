import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SavePhotoScreen from "./screens/SavePhotoScreen";
import ComparePhotosScreen from "./screens/ComparePhotosScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Save Photo" component={SavePhotoScreen} />
                <Stack.Screen
                    name="Compare Photos"
                    component={ComparePhotosScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
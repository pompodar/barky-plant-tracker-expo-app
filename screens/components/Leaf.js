import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const Leaf = () => {
    const leftLeafAnimation = React.useRef(new Animated.Value(0)).current;
    const middleLeafAnimation = React.useRef(new Animated.Value(0)).current;
    const rightLeafAnimation = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const animateLeaf = (animation, fromValue, toValue) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: toValue,
                        duration: 250,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation, {
                        toValue: fromValue,
                        duration: 250,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        animateLeaf(leftLeafAnimation, -75, -85);
        animateLeaf(middleLeafAnimation, -10, 10);
        animateLeaf(rightLeafAnimation, -5, 5);
    }, [leftLeafAnimation, middleLeafAnimation, rightLeafAnimation]);

    return (
        <View style={styles.pineapple}>
            <Animated.View
                style={[
                    styles.leaf,
                    styles.middle,
                    {
                        transform: [
                            { translateY: middleLeafAnimation },
                            { rotate: "-40deg" },
                        ],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.leaf,
                    styles.left,
                    {
                        transform: [
                            {
                                rotate: leftLeafAnimation.interpolate({
                                    inputRange: [-85, -75],
                                    outputRange: ["-85deg", "-75deg"],
                                }),
                            },
                        ],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.leaf,
                    styles.right,
                    {
                        transform: [
                            {
                                rotate: rightLeafAnimation.interpolate({
                                    inputRange: [-5, 5],
                                    outputRange: ["-5deg", "5deg"],
                                }),
                            },
                        ],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pineapple: {
        fontSize: 90,
        height: "90vmin",
        marginVertical: "5%",
        marginHorizontal: "auto",
        width: "90%",
        position: "relative",
    },
    leaf: {
        position: "absolute",
        backgroundColor: "darkgreen",
        borderRadius: 100,
        height: "20%",
        top: "10%",
        width: "20%",
    },
    left: {
        left: "50%",
        transformOrigin: "bottom left",
    },
    middle: {
        backgroundColor: "green",
        left: "40%",
        top: "5%",
    },
    right: {
        left: "50%",
        transformOrigin: "bottom left",
    },
});

export default Leaf;

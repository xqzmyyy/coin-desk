import React, { useState, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from '@/hooks/useColorScheme';

interface Props {
    notifText: string;
}

export const Notification: React.FC<Props> = ({ notifText }) => {

    const [visible, setVisible] = useState(false);
    const translateAnim = useRef(new Animated.Value(100)).current;

    const colorScheme = useColorScheme() || 'light';

    useEffect(() => {
        if (notifText) {
        setVisible(true);

        Animated.timing(translateAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            hideNotification();
        }, 3000);

        return () => clearTimeout(timeout);
        }
    }, [notifText]);

    const hideNotification = () => {
        Animated.timing(translateAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    if (!visible) return null;

    return (
        <View style={styles.outerContainer}>
        <Animated.View style={[styles.notificationContainer, { transform: [{ translateX: translateAnim }] }, {backgroundColor: Colors[colorScheme].background}]}>
            <Text style={[styles.notifText, {color: Colors[colorScheme].text}]}>{notifText}</Text>
            <TouchableOpacity onPress={hideNotification} style={styles.closeButton}>
            <Text style={[styles.closeButtonText, {color: Colors[colorScheme].text}]}>X</Text>
            </TouchableOpacity> 
        </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    
    outerContainer: {
        position: 'absolute',
        top: 40,
        width: '100%',
        alignItems: 'flex-end',
    },

    notificationContainer: {
        width: '60%',
        backgroundColor: '#fff',
        borderLeftWidth: 5,
        borderLeftColor: '#683142',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    notifText: {
        color: '#000',
        fontSize: 16,
        flex: 1,
    },

    closeButton: {
        marginLeft: 10,
    },

    closeButtonText: {
        color: '#000',
        fontSize: 16,
    },
});

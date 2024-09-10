import React from 'react';
import { CurrentPrice } from "@/components/price/CurrentPrice";
import { HistoricalPrice } from "@/components/price/HistoricalPrice";
import { StyleSheet, View, ScrollView, SafeAreaView, useColorScheme } from "react-native";
import { Colors } from '@/constants/Colors';

export default function PriceScreen() {
    const colorScheme = useColorScheme() || 'light';

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.currentPriceContainer}>
                    <CurrentPrice/>
                </View>
                <View style={styles.historicalPriceContainer}>
                    <HistoricalPrice />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    scrollContent: {
        flexGrow: 1,
    },

    currentPriceContainer: {
        padding: 12,
    },

    historicalPriceContainer: {
        padding: 12,
        // paddingBottom: 70, // check and change this
    }
});
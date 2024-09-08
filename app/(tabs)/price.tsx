import { CurrentPrice } from "@/components/price/CurrentPrice"
import { HistoricalPrice } from "@/components/price/HistoricalPrice"
import { StyleSheet, Text, View } from "react-native"

export default function priceScreen() {
    return (
        <View style={styles.pageCont}>
            <View>
                <CurrentPrice/>
            </View>
            <View style={styles.historicalSection}>
                <View style={styles.historicalContCalendar}>
                    <HistoricalPrice/>
                </View>
                <View style={styles.historicalCont}>
                    <Text>test text</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageCont: {
        display: 'flex',
        flex: 1,
        alignItems: 'center'
    },

    historicalSection: {
        padding: 12,
        width: '100%'
    },

    historicalContCalendar: {
        backgroundColor: '#B7A7AE',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: 12
    },

    historicalCont: {
        backgroundColor: '#E1D5D9',
        padding: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        height: 200 // TEST DELETE THIS
    },
})
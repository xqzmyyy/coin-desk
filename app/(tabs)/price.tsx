import { CurrentPrice } from "@/components/price/CurrentPrice"
import { Text, View } from "react-native"

export default function priceScreen() {
    return (
        <View>
            <Text>Price page</Text>
            <CurrentPrice/>
        </View>
    )
}
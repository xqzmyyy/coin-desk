import { StyleSheet, Text } from "react-native"
import { Image } from "react-native"
import { View } from "react-native"

interface Props {
    text: any
}

export const ErrorBanner: React.FC<Props> = ({text}) => {
    return (
        <View style={styles.positionCont}>
            <View style={styles.errorCont}>
                {/* <Image/> */}
                <Text>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    positionCont: {
        position: 'absolute',
        width: '100%',
        // height: '100%',
    },

    errorCont: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#58545B',
        padding: 10
    }
})
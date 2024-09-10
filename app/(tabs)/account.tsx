import { StyleSheet, View } from "react-native";

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { SignIn } from "@/components/account/SignIn";

export default function accountScreen() {
    const colorScheme = useColorScheme() || 'light';

    return (
        <View style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
            <SignIn/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

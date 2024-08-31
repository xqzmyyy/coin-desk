import { Notification } from "@/components/Notification";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";

export default function accountScreen() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [alertMessage, setAlertMessage] = useState('');

    const eyeIcon = passwordVisible
        ? require('../../assets/icons/eye-closed.png') 
        : require('../../assets/icons/eye-open.png');

        const handleLogin = () => {
            if (!email || !password) return setErrorMessage('Please fill out all fields');
        
            setErrorMessage('');
            setAlertMessage('Successfully logged in');
            setEmail('')
            setPassword('')
        };

    return (
        <View style={styles.container}>
            <Notification notifText={alertMessage} />
            <View style={styles.loginCont}>
                <Text style={styles.loginTitle}>Login to account</Text>
                    <TextInput
                        style={styles.emailInput}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View style={styles.passCont}>
                        <TextInput
                            style={styles.passInput}
                            placeholder="Password"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.showPassButton}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Image source={eyeIcon} style={styles.eyeIcon}/>
                        </TouchableOpacity>
                    </View>
                    {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                    <TouchableHighlight style={styles.loginBtn} underlayColor="#995E7C" onPress={() => handleLogin()}>
                        <Text style={styles.loginBtnText}>Login</Text>
                    </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginCont: {
        width: '100%',
        padding: '15%'
    },

    loginTitle: {
        color: '#683142',
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center'
    },

    emailInput: {
        borderColor: '#995E7C',
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 10,
        paddingLeft: 15,
        marginBottom: 15,
    },
    
    passCont: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#995E7C',
        borderRadius: 8,
        borderWidth: 1,
    },

    passInput: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 15,
    },

    showPassButton: {
        paddingHorizontal: 10,
    },

    eyeIcon: {
        width: 20,
        height: 20
    },

    showPassText: {
        color: '#683142',
    },

    loginBtn: {
        backgroundColor: '#683142',
        borderRadius: 8,
        padding: 10,
        marginTop: 13
    },

    loginBtnText: {
        color: '#D3B19E',
        fontSize: 18,
        textAlign: 'center',
    },

    errorMessage: {
        color: '#AA1803',
        fontSize: 16,
        marginTop: 10
    }
});

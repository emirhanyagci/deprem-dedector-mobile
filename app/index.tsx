import { useAudioPlayer } from 'expo-audio';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';
import { io } from "socket.io-client";
const audioSource = require('../assets/ses.mp3');



export default function HomeScreen() {
    const player = useAudioPlayer(require('../assets/ses.mp3'));
    player.loop = true;
    const [isEnabled, setIsEnabled] = useState(false);
    const [test, setTest] = useState("blabla")
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    console.log("yoo");

    useEffect(() => {

        const socket = io("https://deprem-dedektor-server.onrender.com");

        socket.on("connect", () => {
            console.log("Sunucuya bağlanıldı! ID:", socket.id);
        });
        socket.on("earthquake", (data) => {
            player.play()
        });

        return () => {
            socket.disconnect();
        };

    }, [])
    return (
        <View style={styles.container}>
            <Text>{test}</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Button title="Play Sound" onPress={() => player.play()} />
            <View style={styles.stopButton}>
                <Button title="Stop Sound" onPress={() => player.pause()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
    stopButton: {
        marginTop: 10
    }
});
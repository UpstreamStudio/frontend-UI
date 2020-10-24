import React from 'react';
import {View, Button} from 'react-native';
import {Audio}from 'expo-av';

const sound = new Audio.Sound();
export const Rnaudio = () => {

    const loadSound = async () => {
        await Audio.requestPermissionsAsync();
        const status = {
            shouldPlay: false,
            volume: 1
        }
        await sound.loadAsync({uri: 'https://mostore.s3.ap-northeast-2.amazonaws.com/music/testmusic.mp3'}, status, false);

    }

    loadSound();
    
    const play = async () => {
        await sound.playAsync()
    }
    const pause = async () => {
        await sound.pauseAsync()
    }
    alert('loaded');
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title="play" onPress={ async ()=> 
                await sound.playFromPositionAsync()
            }/>
            <Button title="pause" onPress={ async ()=> 
                await sound.pauseAsync()
            }/>
        </View>
    )
}
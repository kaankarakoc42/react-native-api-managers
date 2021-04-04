import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from "expo-file-system";

class RecordingManager{
  constructor(){
      this.record=''
      this.sound=''
  }
  async startRecording() {
    if(this.record){
      this.stopRecording()
    }
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      this.record=recording
    } catch (err) {
      console.log(err)
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
  }

  async stopRecording() {
    if(this.record){
       await this.record.stopAndUnloadAsync();
       const uri = this.record.getURI(); 
       const info = await FileSystem.getInfoAsync(this.record.getURI() || "");
       console.log(`FILE INFO: ${JSON.stringify(info)}`);
    }
  }

  async playRecord(){
    const {sound} = await this.record.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: false,
        volume: 1.0,
        rate: 1.0,
        shouldCorrectPitch:true,
      },
      ()=>({
        haveRecordingPermissions: true,
        isLoading: false,
        isPlaybackAllowed: true,
        muted: false,
        soundPosition: null,
        soundDuration: null,
        recordingDuration: null,
        shouldPlay: false,
        isPlaying: false,
        isRecording: false,
        fontLoaded: false,
        shouldCorrectPitch: true,
        volume: 1.0,
        rate: 1.0,
      })
    );
    this.sound = await sound;
    await console.log(sound.playAsync())
    await sound.playAsync();  
    await sound.unloadAsync();
  }

}


module.exports = new RecordingManager();
import { Audio } from 'expo-av';

class SoundManager{
    constructor(){
      this.sound=""
      this.soundState=""
    }
    async playSound(source) {
      const { sound } = await Audio.Sound.createAsync(source);
      if(this.sound)
        this.stopSound()
      this.sound = await sound
      this.soundState="playing"
      await sound.playAsync();  
      await sound.unloadAsync();
    }
  
    async stopSound(){
      if(this.sound){
         await this.sound.stopAsync();
         this.soundState="stoped"
         await sound.unloadAsync();
      }
    }
  
    async pauseSound(){
      if(this.sound){
        await this.sound.pauseAsync();
        this.soundState="paused"
      }
    }
  
    async playFromPositionSound(){
      if(this.sound){
        await this.sound.playFromPositionAsync();
        this.soundState="playing"
      }
    }
  
  }
  
module.exports =  new SoundManager()
  
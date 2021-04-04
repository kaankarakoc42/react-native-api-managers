import React, {Component} from 'react';
import {TextInput, View, Keyboard} from 'react-native';
import * as Notifications from 'expo-notifications'
import { Permissions,askAsync} from 'expo-permissions';
import Constants from 'expo-constants';

class NotificationManager{
    constructor(){
      this.settings={
        content: {title:"test mesaji", body: "Hello world"},
        trigger:null,
        repeats:false
      }
    this.sendLocalNotification=this.sendLocalNotification.bind(this)
    }

   async sendLocalNotification(settings=null) {
      if(!settings)
        await Notifications.scheduleNotificationAsync(this.settings);
      else
        await Notifications.scheduleNotificationAsync(settings);
    }

    async getPermission() {
        let result = await askAsync("notifications");
        if (Constants.isDevice && result.status === 'granted') 
            console.log('Notification permissions granted.')
    }

};

module.exports = new NotificationManager()
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

async function saveData(key,value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('## ERROR SAVING ITEM ##: ', error);
  }
}

async function getData(key) {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      setData(value);
    }
  } catch (error) {
    console.log('## ERROR READING ITEM ##: ', error);
  }
}

  async function removeData(key){
      try {
        await AsyncStorage.removeItem(key)
      } catch (e) {
        console.log(e);
      }
    }
  // }

export default {saveData,getData,removeData};

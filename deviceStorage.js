import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DeviceStorage{
    static saveData = async (key, value) => {
      try {
        const result = await AsyncStorage.setItem(key, value)
        console.log('save result', result)
      } catch (e) {
        console.log('error',e)
      }
    }
    static getData = async (key) => {
      try {
        return await AsyncStorage.getItem(key);
      } catch(e) {
        console.log('error',e)
      }
    }

    static removeData = async (key) => {
      try {
        await AsyncStorage.removeItem(key)
      } catch (e) {
        console.log(e);
      }
    }
}
// @flow
import AsyncStorage from "@react-native-community/async-storage";

async function saveItem(key, value) {
  try {
    await AsyncStorage.setItem(
      key,
      typeof value === "object" ? JSON.stringify(value) : String(value)
    );
    return "ItemSaved.";
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getItem(key) {
  try {
    const item = await AsyncStorage.getItem(key);
    return item != null ? JSON.parse(item) : null;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//      
import AsyncStorage from "@react-native-community/async-storage";

export async function saveItem(key        , value                 ) {
  try {
    await AsyncStorage.setItem(
      key,
      typeof value === "object" ? JSON.stringify(value) : value
    );
    return "ItemSaved.";
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getItem(key        ) {
  try {
    const item = await AsyncStorage.getItem(key);
    return item != null ? JSON.parse(item) : null;
  } catch (error) {
    console.log(error);
    return error;
  }
}

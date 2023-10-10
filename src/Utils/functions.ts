import AsyncStorage from "@react-native-async-storage/async-storage";

export function NewNumber(n: number) {
    let seq=1
    if (n > 0) {
        seq = n+1
    }
    return seq;
}

export async function SetDataStorage(key: string, data: string) {
    try {
        const dataStorage = await AsyncStorage.setItem(key, data);
        return JSON.stringify(dataStorage)
    } catch (error) {
        console.log(error)
    }
}

export async function GetDataStorage(key: string) {
    try {
        const dataStorage = await AsyncStorage.getItem(key);
        return dataStorage != null ? JSON.parse(dataStorage) : null;
    } catch (error) {
        console.log(error)
    }
}

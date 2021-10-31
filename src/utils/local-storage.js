import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAuthToken = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)

        await AsyncStorage.setItem('authToken', jsonValue)
    } catch (e) {
        console.log("async error", e)

    }
}

export const getAuthToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('authToken')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("async error", e)
    }
}

export const setSearchItem = async (value) =>{
    try {
        const jsonValue = JSON.stringify(value)

        await AsyncStorage.setItem('searchItems', jsonValue)
    } catch (e) {
        console.log("async error", e)

    }
}


export const getSearchItem = async () =>{
    try {
        const jsonValue = await AsyncStorage.getItem('searchItems')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("async error", e)

    }
}

export const forgetUser = async () =>{
    try {

        await AsyncStorage.removeItem('authDetail');
    } catch (e) {
        console.log("async error", e)

    }
}
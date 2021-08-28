export const saveLocalStorageToken = async (item : string, value : string) => {
    try {
       await localStorage.setItem(item, value);
    } catch (error) {
       throw error;
    }
 };
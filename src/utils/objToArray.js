export const objToArray = (obj, keyName, valueName) => {
    return Object.keys(obj).map(key => {
        return {
            [keyName]: key,
            [valueName]: obj[key],
        };
    });
};
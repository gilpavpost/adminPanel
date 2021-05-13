import i18n from '@/i18n'

const state = {
    postTypes: {
        0: i18n.t('posts.types.photoPost'),
        1: i18n.t('posts.types.videoPost'),
        2: i18n.t('posts.types.stories'),
        3: i18n.t('posts.types.fullVideo'),
        4: i18n.t('posts.types.integration'),
        5: i18n.t('posts.types.preroll'),
    },
    bitlyMode: {
        0: i18n.t('posts.bitly.auto'),
        1: i18n.t('posts.bitly.manual'),
    },
};

const objToArray = (obj, keyName, valueName) => {
    return Object.keys(obj).map(key => {
        return {
            [keyName]: key,
            [valueName]: obj[key],
        };
    });
};

const getters = {
    postTypesForSelect: state => objToArray(state.postTypes, 'value', 'text'),
    bitlyModeForSelect: state => objToArray(state.bitlyMode, 'value', 'text'),
    postTypeName: (state) => (type) => state.postTypes[type],
    isBitlyAutoMode: () => (mode) => parseInt(mode) === 0,
    isPhotoPost: () => (type) => parseInt(type) === 0,
    isVideoPost: () => (type) => parseInt(type) === 1,
    isStory: () => (type) => parseInt(type) === 2,
    isInstagram: () => (type) => [0, 1, 2].includes(parseInt(type)),
    isYoutube: () => (type) => [3, 4, 5].includes(parseInt(type)),
};

export default {
    state,
    getters,
}
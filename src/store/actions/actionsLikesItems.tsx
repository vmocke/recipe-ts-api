import * as actionsType from './actionTypes';

export const onSendItemToServerSuccess = (fireId: string, likesRecipesNew: []) => {
    return {
        type: actionsType.SEND_ITEM_TO_SERVER_SUCCESS,
        likesItemsList: likesRecipesNew,
        fireId: fireId,
    };
};

export const onSendItemToServerFail = (error: string) => {
    return {
        type: actionsType.SEND_ITEM_TO_SERVER_FAIL,
        error: error,
    };
};

export const onSendItemToServer = (likesRecipesNew: [], token: string, userId: string) => {
    return {
        type: actionsType.SEND_ITEM_TO_SERVER_SAGA,
        likesRecipesNew: likesRecipesNew,
        token: token,
        userId: userId,
    };
};
/////////////////////////////////////////////////////////////////////////
export const fecthLikesItemsSuccess = (fetchedLikesList: []) => {
    return {
        type: actionsType.FETCH_LIKES_ITEMS_FROM_SERVER_SUCCESS,
        likesItemsList: fetchedLikesList,
    };
};

export const fecthLikesItemsFail = (error: string) => {
    return {
        type: actionsType.FETCH_LIKES_ITEMS_FROM_SERVER_FAIL,
        error: error,
    };
};

export const fetchLikesItemsList = (token_: string, userId_: string) => {
    return {
        type: actionsType.FETCH_LIKES_ITEMS_FROM_SERVER_SAGA,
        token_: token_,
        userId_: userId_,
    };
};
/////////////////////////////////////////////////////////////////////////
export const onItemDeleteInServerSuccess = (newLikesRescipes: []) => {
    return {
        type: actionsType.REMOVE_ITEM_IN_SERVER_SUCCESS,
        likesRecipes: newLikesRescipes,
    };
};
export const onItemDeleteInServerServerFail = (error: string) => {
    return {
        type: actionsType.REMOVE_ITEM_IN_SERVER_FAIL,
        error: error,
    };
};

export const onItemDeleteInServer = (newLikesRescipes: [], token: string, userId: string) => {
    return {
        type: actionsType.REMOVE_ITEM_IN_SERVER_SAGA,
        newLikesRescipes: newLikesRescipes,
        token: token,
        userId: userId,
    };
};

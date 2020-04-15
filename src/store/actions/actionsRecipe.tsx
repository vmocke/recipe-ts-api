import * as actionTypes from './actionTypes';
////////////////////////////////////////////////////////////////////
export const fetchRecipeFail = (error: any) => {
    return {
        type: actionTypes.FETCH_RECIPE_DATA_FAIL,
        err: error,
    };
};

export const fetchRecipeSuccess = (response: {}) => {
    return {
        type: actionTypes.FETCH_RECIPE_DATA_SUCCESS,
        recipe: response,
    };
};

export const getRecipe = (searchInput: { value: string }) => {
    return {
        type: actionTypes.FETCH_RECIPE_DATA_SAGA,
        searchInput: searchInput,
    };
};
////////////////////////////////////////////////////////////////////
export const getChosenRecipeSuccess = (selectedItem_: [], shoppingIngList_: []) => {
    return {
        type: actionTypes.GET_CHOSEN_RECIPE_SUCCESS,
        chosenRecipe: selectedItem_,
        shoppingIngList: shoppingIngList_,
    };
};
export const onResultItemClick = (selectedItem_: [], shoppingIngList_: []) => {
    return {
        type: actionTypes.GET_CHOSEN_RECIPE_SAGA,
        selectedItem_: selectedItem_,
        shoppingIngList_: shoppingIngList_,
    };
};
////////////////////////////////////////////////////////////////////
export const moveToShoppingListSuccess = (moveToShoppingList_: boolean) => {
    return {
        type: actionTypes.MOVE_ITEM_ING_TO_SHOP_LIST_SUCCESS,
        moveToShoppingList: moveToShoppingList_,
    };
};
export const onShopingListButton = (moveToShoppingList_: boolean) => {
    return {
        type: actionTypes.MOVE_ITEM_ING_TO_SHOP_LIST_SAGA,
        moveToShoppingList_: moveToShoppingList_,
    };
};
///////////////////////////////////////////////////////////////////////
export const deleteShoppingIngSuccess = (newShoppingIngList_: []) => {
    return {
        type: actionTypes.DELETE_SHOPPING_ING_SUCCESS,
        shoppingIngList: newShoppingIngList_,
    };
};
export const onShopingIngDelete = (newShoppingIngList_: []) => {
    return {
        type: actionTypes.DELETE_SHOPPING_ING_SAGA,
        newShoppingIngList_: newShoppingIngList_,
    };
};

export const oldIngListShowSuccess = (shoppingIngListReserved_: []) => {
    return {
        type: actionTypes.OLD_ING_LIST_SHOW_SUCCESS,
        shoppingIngListReserved: shoppingIngListReserved_,
    };
};

export const onAfterAllIngDeleted = (shoppingIngListReserved_: []) => {
    return {
        type: actionTypes.OLD_ING_LIST_SHOW_SAGA,
        shoppingIngListReserved_: shoppingIngListReserved_,
    };
};
///////////////////////////////////////////////////////////////////////////
export const moveItemToLikesSuccess = (likesRecipesNew: []) => {
    return {
        type: actionTypes.MOVE_ITEM_TO_LIKES_SUCCESS,
        likesRecipes: likesRecipesNew,
    };
};

export const onLikeButton = (likesRecipesNew: []) => {
    return {
        type: actionTypes.MOVE_ITEM_TO_LIKES_SAGA,
        likesRecipesNew: likesRecipesNew,
    };
};
///////////////////////////////////////////////////////////////////////////
export const removeLikesItemSuccess = (newLikesRescipes: []) => {
    return {
        type: actionTypes.REMOVE_ITEM_LOCAL_SUCCESS,
        likesRecipes: newLikesRescipes,
    };
};

export const onItemDeleteLocal = (newLikesRescipes: []) => {
    return {
        type: actionTypes.REMOVE_ITEM_LOCAL_SAGA,
        newLikesRescipes: newLikesRescipes,
    };
};
///////////////////////////////////////////////////////////////////////////
export const onDisplayChosenRecipeSuccess = (newChosenRecipe_: [], shoppingIngList: []) => {
    return {
        type: actionTypes.DISPLAY_CHOSEN_LIKE_ITEM_SUCCESS,
        chosenRecipe: newChosenRecipe_,
        shoppingIngList: shoppingIngList,
    };
};

export const onDisplayChosenRecipe = (newChosenRecipe_: [], shoppingIngList: []) => {
    return {
        type: actionTypes.DISPLAY_CHOSEN_LIKE_ITEM_SAGA,
        newChosenRecipe_: newChosenRecipe_,
        shoppingIngList: shoppingIngList,
    };
};
////////////////////////////////////////////////////////////////////
export const onLogoutClearReducers = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_CLEAR,
    };
};

export const onLogoutClear = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_CLEAR_SAGA,
    };
};

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export interface stateTS {
    recipe: null | any;
    recipeShow: boolean;
    chosenRecipe: null | [];
    moveToShoppingList: boolean;
    shoppingIngList: null | [];
    shoppingIngListReserved: null | [];
    likesRecipes: [];
    error: null | string;
    spinnerBig: boolean;
    spinner: boolean;
    spinnerResults: boolean;
    spinnerRecipe: boolean;
    spinnerShoppingList: boolean;
}

const initialState: stateTS = {
    recipe: null,
    recipeShow: false,
    chosenRecipe: null,
    moveToShoppingList: false,
    shoppingIngList: null,
    shoppingIngListReserved: null,
    likesRecipes: [],
    error: null,
    spinnerBig: false,
    spinner: false,
    spinnerResults: false,
    spinnerRecipe: false,
    spinnerShoppingList: false,
};
///////////////////////////////////////////////////////////////////
const getRecipeStart_ = (state: stateTS) => {
    return { ...state, error: null, spinnerBig: true };
};
const getRecipe_ = (state: stateTS, action: { recipe: {} }) => {
    return {
        ...state,
        recipeShow: true,
        recipe: action.recipe,
        moveToShoppingList: false,
        error: null,
        spinnerBig: false,
    };
};
const getRecipeFail_ = (state: stateTS, action: { err: string }) => {
    return { ...state, error: action.err, spinnerBig: false };
};
///////////////////////////////////////////////////////////////////
const onItemPanelClickStart_ = (state: stateTS) => {
    return { ...state, error: null, spinnerRecipe: true };
};
const onItemPanelClick_ = (state: stateTS, action: { chosenRecipe: []; shoppingIngList: [] }) => {
    return {
        ...state,
        chosenRecipe: action.chosenRecipe,
        moveToShoppingList: false,
        shoppingIngList: action.shoppingIngList,
        shoppingIngListReserved: action.shoppingIngList,
        error: null,
        spinnerRecipe: false,
    };
};
///////////////////////////////////////////////////////////////////
const onShopingListButtonStart_ = (state: stateTS) => {
    return { ...state, error: null, spinnerShoppingList: true };
};
const onShopingListButton_ = (state: stateTS, action: { moveToShoppingList: boolean }) => {
    return { ...state, moveToShoppingList: action.moveToShoppingList, error: null, spinnerShoppingList: false };
};
const onShopingIngDelete_ = (state: stateTS, action: { shoppingIngList: [] }) => {
    return { ...state, shoppingIngList: action.shoppingIngList };
};
const onAfterAllIngDeletedStart_ = (state: stateTS) => {
    return { ...state, spinner: true };
};
const onAfterAllIngDeleted_ = (state: stateTS, action: { shoppingIngListReserved: [] }) => {
    return { ...state, shoppingIngList: action.shoppingIngListReserved, spinner: false };
};
///////////////////////////////////////////////////////////////////
const onLikeButton_ = (state: stateTS, action: { likesRecipes: [] }) => {
    return { ...state, likesRecipes: action.likesRecipes };
};
const onItemDeleteLocal_ = (state: stateTS, action: { likesRecipes: [] }) => {
    return { ...state, likesRecipes: action.likesRecipes };
};
const onDisplayChosenRecipe_ = (state: stateTS, action: { chosenRecipe: []; shoppingIngList: [] }) => {
    return {
        ...state,
        recipeShow: true,
        chosenRecipe: action.chosenRecipe,
        shoppingIngList: action.shoppingIngList,
        shoppingIngListReserved: action.shoppingIngList,
        moveToShoppingList: false,
    };
};
///////////////////////////////////////////////////////////////////
const onLogoutClearReducers_ = (state: stateTS) => {
    return {
        ...state,
        recipe: null,
        recipeShow: false,
        chosenRecipe: null,
        moveToShoppingList: false,
        shoppingIngList: null,
        shoppingIngListReserved: null,
        //likesRecipes: [],
        error: null,
        spinnerBig: false,
        spinner: false,
        spinnerResults: false,
        spinnerRecipe: false,
        spinnerShoppingList: false,
    };
};
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////

const reducer = (state = initialState, action: any): stateTS => {
    switch (action.type) {
        case actionTypes.FETCH_RECIPE_DATA_SAGA:
            return getRecipeStart_(state);
        case actionTypes.FETCH_RECIPE_DATA_SUCCESS:
            return getRecipe_(state, action);
        case actionTypes.FETCH_RECIPE_DATA_FAIL:
            return getRecipeFail_(state, action);

        case actionTypes.GET_CHOSEN_RECIPE_SAGA:
            return onItemPanelClickStart_(state);
        case actionTypes.GET_CHOSEN_RECIPE_SUCCESS:
            return onItemPanelClick_(state, action);

        case actionTypes.MOVE_ITEM_ING_TO_SHOP_LIST_SAGA:
            return onShopingListButtonStart_(state);
        case actionTypes.MOVE_ITEM_ING_TO_SHOP_LIST_SUCCESS:
            return onShopingListButton_(state, action);

        case actionTypes.DELETE_SHOPPING_ING_SUCCESS:
            return onShopingIngDelete_(state, action);

        case actionTypes.OLD_ING_LIST_SHOW_SAGA:
            return onAfterAllIngDeletedStart_(state);
        case actionTypes.OLD_ING_LIST_SHOW_SUCCESS:
            return onAfterAllIngDeleted_(state, action);

        case actionTypes.MOVE_ITEM_TO_LIKES_SUCCESS:
            return onLikeButton_(state, action);
        case actionTypes.REMOVE_ITEM_LOCAL_SUCCESS:
            return onItemDeleteLocal_(state, action);
        case actionTypes.DISPLAY_CHOSEN_LIKE_ITEM_SUCCESS:
            return onDisplayChosenRecipe_(state, action);

        case actionTypes.AUTH_LOGOUT_CLEAR:
            return onLogoutClearReducers_(state);
        // from actionsLikesItems
        case actionTypes.FETCH_LIKES_ITEMS_FROM_SERVER_SAGA:
            return updateObject(state, { spinner: true });
        case actionTypes.FETCH_LIKES_ITEMS_FROM_SERVER_SUCCESS:
            return updateObject(state, { likesRecipes: action.likesItemsList, spinner: false });
        case actionTypes.FETCH_LIKES_ITEMS_FROM_SERVER_FAIL:
            return updateObject(state, { spinner: false, error: action.error });
        default:
            return state;
    }
};

export default reducer;

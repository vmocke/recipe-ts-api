import { put, delay } from 'redux-saga/effects';
import * as actionsRecipe from '../actions/actionsRecipe';
import { edamam } from '../../axios-export';

const app_id = '92dc9a8d';
const app_key = '6c2e6d031e734bf9005d68cc87eed15e';

export function* getRecipeSaga(action: { searchInput: { value: string } }) {
    if (action.searchInput.value !== '') {
        try {
            const response = yield edamam.get(
                `search?q=${action.searchInput.value}&app_id=${app_id}&app_key=${app_key}&to=50`,
            );
            console.log(response);
            yield put(actionsRecipe.fetchRecipeSuccess(response));
        } catch (error) {
            console.log(error);
            yield put(actionsRecipe.fetchRecipeFail(error));
        }
    } else {
        yield put(actionsRecipe.fetchRecipeFail(alert('SEARCH FIELD IS EMPTY!!!')));
    }
}

export function* onResultItemClickSaga(action: { selectedItem_: []; shoppingIngList_: [] }) {
    yield delay(500, null);
    yield put(actionsRecipe.getChosenRecipeSuccess(action.selectedItem_, action.shoppingIngList_));
}

export function* onShopingListButtonSaga(action: { moveToShoppingList_: boolean }) {
    yield delay(500, null);
    yield put(actionsRecipe.moveToShoppingListSuccess(action.moveToShoppingList_));
}

export function* onShopingIngDeleteSaga(action: { newShoppingIngList_: [] }) {
    yield put(actionsRecipe.deleteShoppingIngSuccess(action.newShoppingIngList_));
}

export function* onAfterAllIngDeletedSaga(action: { shoppingIngListReserved_: [] }) {
    yield put(actionsRecipe.oldIngListShowSuccess(action.shoppingIngListReserved_));
}

export function* onLikeButtonSaga(action: { likesRecipesNew: [] }) {
    yield put(actionsRecipe.moveItemToLikesSuccess(action.likesRecipesNew));
}
export function* onItemDeleteLocalSaga(action: { newLikesRescipes: [] }) {
    yield put(actionsRecipe.removeLikesItemSuccess(action.newLikesRescipes));
}

export function* onDisplayChosenRecipeSaga(action: { newChosenRecipe_: []; shoppingIngList: [] }) {
    yield put(actionsRecipe.onDisplayChosenRecipeSuccess(action.newChosenRecipe_, action.shoppingIngList));
}

export function* onLogoutClearSaga() {
    yield put(actionsRecipe.onLogoutClearReducers());
}

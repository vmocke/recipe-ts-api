import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './sagaAuth';
import {
    getRecipeSaga,
    onResultItemClickSaga,
    onShopingListButtonSaga,
    onShopingIngDeleteSaga,
    onAfterAllIngDeletedSaga,
    onLikeButtonSaga,
    onItemDeleteLocalSaga,
    onDisplayChosenRecipeSaga,
    onLogoutClearSaga,
} from './sagaRecipe';
import { onSendItemToServerSaga, fetchLikesItemsListSaga, onItemDeleteInServerSaga } from './sagaLikesItems';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_SAGA, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT_SAGA, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE_SAGA, authCheckStateSaga),
        takeEvery(actionTypes.AUTH_LOGOUT_SAGA, logoutSaga),
    ]);
}

export function* watchRecipe() {
    yield all([
        takeEvery(actionTypes.FETCH_RECIPE_DATA_SAGA, getRecipeSaga),
        takeEvery(actionTypes.GET_CHOSEN_RECIPE_SAGA, onResultItemClickSaga),
        takeEvery(actionTypes.MOVE_ITEM_ING_TO_SHOP_LIST_SAGA, onShopingListButtonSaga),
        takeEvery(actionTypes.DELETE_SHOPPING_ING_SAGA, onShopingIngDeleteSaga),
        takeEvery(actionTypes.OLD_ING_LIST_SHOW_SAGA, onAfterAllIngDeletedSaga),
        takeEvery(actionTypes.MOVE_ITEM_TO_LIKES_SAGA, onLikeButtonSaga),
        takeEvery(actionTypes.REMOVE_ITEM_LOCAL_SAGA, onItemDeleteLocalSaga),
        takeEvery(actionTypes.DISPLAY_CHOSEN_LIKE_ITEM_SAGA, onDisplayChosenRecipeSaga),
        takeEvery(actionTypes.AUTH_LOGOUT_CLEAR_SAGA, onLogoutClearSaga),
    ]);
}

export function* watchLikesItems() {
    yield all([
        takeEvery(actionTypes.SEND_ITEM_TO_SERVER_SAGA, onSendItemToServerSaga),
        takeEvery(actionTypes.FETCH_LIKES_ITEMS_FROM_SERVER_SAGA, fetchLikesItemsListSaga),
        takeEvery(actionTypes.REMOVE_ITEM_IN_SERVER_SAGA, onItemDeleteInServerSaga),
    ]);
}

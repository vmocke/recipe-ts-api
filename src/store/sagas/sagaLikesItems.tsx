import { put } from 'redux-saga/effects';
import * as actionsLikesItems from '../actions/actionsLikesItems';
import { fire } from '../../axios-export';

export function* onSendItemToServerSaga(action: { likesRecipesNew: []; token: string; userId: string }) {
    try {
        const response = yield fire.post(
            `likesItems/${action.userId}.json?auth=${action.token}`,
            action.likesRecipesNew,
        );
        yield put(actionsLikesItems.onSendItemToServerSuccess(response.data.name, action.likesRecipesNew));
    } catch (error) {
        yield put(actionsLikesItems.onSendItemToServerFail(error.message));
    }
}

export function* fetchLikesItemsListSaga(action: { token_: string; userId_: string }) {
    try {
        const queryParams = `?auth=${action.token_}"`;
        const response = yield fire.get(`likesItems/${action.userId_}.json${queryParams}`);
        const fetchedLikesList: any = [];
        for (let key in response.data) {
            fetchedLikesList.push({
                ...response.data[key],
            });
        }
        yield put(actionsLikesItems.fecthLikesItemsSuccess(fetchedLikesList));
    } catch (error) {
        yield put(actionsLikesItems.fecthLikesItemsFail(error.message));
    }
}

export function* onItemDeleteInServerSaga(action: { newLikesRescipes: []; token: string; userId: string }) {
    const likesRecipesNew: any = yield { ...action.newLikesRescipes };
    try {
        yield fire.put(`likesItems/${action.userId}.json?auth=${action.token}`, likesRecipesNew);
        yield put(actionsLikesItems.onItemDeleteInServerSuccess(likesRecipesNew));
    } catch (error) {
        yield put(actionsLikesItems.onItemDeleteInServerServerFail(error.message));
    }
}

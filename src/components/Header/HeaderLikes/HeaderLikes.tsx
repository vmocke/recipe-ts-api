import React, { useState } from 'react';
import classes from './HeaderLikes.module.css';
import SVGIcon from '../../../assets/img/SVGIcon';
import ItemPanel from '../../UI/ItemPanel/ItemPanel';
import { useSelector, useDispatch } from 'react-redux';
import * as actionsRecipe from '../../../store/actions/actionsRecipe';
import * as actionsLikesItems from '../../../store/actions/actionsLikesItems';
import { fire } from '../../../axios-export';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
import { spinnerTimeout } from '../../../shared/utility';
import { AppState } from '../../..';

const HeaderLikes = (props: { children: React.ReactNode }) => {
    const [spinnerLocal, setSpinnerLocal] = useState(false);
    const likesRecipes_ = useSelector((state: AppState) => {
        return state.reducer_Recipe.likesRecipes;
    });
    const token_ = useSelector((state: AppState) => {
        return state.reducer_Auth.token;
    });
    const userId_ = useSelector((state: AppState) => {
        return state.reducer_Auth.userId;
    });

    const dispatch = useDispatch();
    const on_Item_Delete_Local_Handler = (newLikesRescipes: any) =>
        dispatch(actionsRecipe.onItemDeleteLocal(newLikesRescipes));
    const on_Display_Chosen_Recipe_Handler = (newChosenRecipe: any, shoppingIngList: any) =>
        dispatch(actionsRecipe.onDisplayChosenRecipe(newChosenRecipe, shoppingIngList));
    const on_Item_Delete_In_Server_Handler = (newLikesRescipes: any, token: string, userId: string) =>
        dispatch(actionsLikesItems.onItemDeleteInServer(newLikesRescipes, token, userId));

    const onDbClickLikesPanelItemHandler = (e: { preventDefault: () => void }, itemId: string) => {
        e.preventDefault();
        const [token, userId]: any = [token_, userId_];
        const newLikesRescipes = likesRecipes_.filter((item: { id: string }) => item.id !== itemId);
        on_Item_Delete_Local_Handler(newLikesRescipes);
        on_Item_Delete_In_Server_Handler(newLikesRescipes, token, userId);
        spinnerTimeout(setSpinnerLocal, 500);
    };

    const onClickLikesPanelItemHandler = (e: { preventDefault: () => void }, item: any) => {
        e.preventDefault();
        const newChosenRecipe = [item];
        // shoppingIngList
        let chosenRecipeIngredients = newChosenRecipe.map((item) => item.recipe.ingredients);
        chosenRecipeIngredients = chosenRecipeIngredients[0];
        // ideto salia objecto kita nauja verte
        const shoppingIngList = [];
        for (let key in chosenRecipeIngredients) {
            shoppingIngList.push({
                id: Math.random().toString(36).slice(2),
                ing: chosenRecipeIngredients[key],
            });
        }

        on_Display_Chosen_Recipe_Handler(newChosenRecipe, shoppingIngList);
    };

    let likesItemPanel = null;

    if (likesRecipes_.length > 0) {
        likesItemPanel = likesRecipes_.map(
            (item: { id: string; recipe: { uri: string; image: string; label: string; source: string } }) => {
                return (
                    <ItemPanel
                        key={item.id}
                        id={item.id}
                        href={item.recipe.uri}
                        logo={item.recipe.image}
                        alt={item.recipe.label}
                        title={item.recipe.label}
                        text={item.recipe.source}
                        onClick={(e: any) => {
                            onClickLikesPanelItemHandler(e, item);
                        }}
                        onDoubleClick={(e: any) => {
                            onDbClickLikesPanelItemHandler(e, item.id);
                        }}
                    />
                );
            },
        );
    }

    return (
        <div className={classes.likes}>
            <div className={classes.likes__field}>
                <SVGIcon name="icon-heart" className={classes.likes__icon} fill="#F59A83" />
            </div>

            <div className={classes.likes__panel}>
                <ul className={classes.ItemPanel_list}>
                    {spinnerLocal ? <Spinner /> : likesItemPanel ? likesItemPanel : <h2>YOUR LIKE LIST IS EMPTY</h2>}
                </ul>
            </div>

            {props.children}
        </div>
    );
};

export default withErrorHandler(HeaderLikes, fire);

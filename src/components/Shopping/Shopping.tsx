import React, { useEffect, useCallback } from 'react';
import classes from './Shopping.module.css';
import ShoppingItem from './ShoppingItem/ShoppingItem';
import { useSelector, useDispatch } from 'react-redux';
import * as actionsRecipe from '../../store/actions/actionsRecipe';
import Spinner from '../UI/Spinner/Spinner';
import { AppState } from '../../index';

const Shopping = () => {
    const moveToShoppingList_ = useSelector((state: AppState) => state.reducer_Recipe.moveToShoppingList);
    const shoppingIngList_ = useSelector((state: AppState) => state.reducer_Recipe.shoppingIngList);
    const shoppingIngListReserved_ = useSelector((state: AppState) => state.reducer_Recipe.shoppingIngListReserved);
    const spinnerShoppingList_ = useSelector((state: AppState) => state.reducer_Recipe.spinnerShoppingList);

    const dispatch = useDispatch();
    const on_Shoping_Ing_Delete_Handler = (newShoppingIngList_: []) =>
        dispatch(actionsRecipe.onShopingIngDelete(newShoppingIngList_));
    const on_After_All_Ing_Deleted_Handler = useCallback(
        (shoppingIngListReserved_) => dispatch(actionsRecipe.onAfterAllIngDeleted(shoppingIngListReserved_)),
        [dispatch],
    );

    const checkShoppingList = useCallback(
        (item) => {
            if (item !== null && item.length === 0) {
                on_After_All_Ing_Deleted_Handler(shoppingIngListReserved_);
            }
        },
        [on_After_All_Ing_Deleted_Handler, shoppingIngListReserved_],
    );

    useEffect(() => {
        checkShoppingList(shoppingIngList_);
    }, [checkShoppingList, shoppingIngList_]);

    const onShopingIngDeleteHandler = (e: { preventDefault: () => void }, itemId: string) => {
        e.preventDefault();
        if (shoppingIngList_ !== null && shoppingIngList_.length !== 0) {
            const newShoppingIngList_: any = shoppingIngList_.filter((item: { id: string }) => item.id !== itemId);
            on_Shoping_Ing_Delete_Handler(newShoppingIngList_);
        }
    };

    let shopItems;

    if (shoppingIngList_ !== null && shoppingIngList_.length > 0 && moveToShoppingList_) {
        shopItems = shoppingIngList_.map((item: { id: string; ing: { weight: number; text: string } }) => {
            return (
                <ShoppingItem
                    key={item.id}
                    id={item.id}
                    value={item.ing.weight.toFixed(2)}
                    name={item.ing.text}
                    onClick={(e: any) => {
                        onShopingIngDeleteHandler(e, item.id);
                    }}
                />
            );
        });
    }

    return (
        <div className={classes.shopping}>
            <h2 className={classes.heading2}>My Shopping List</h2>
            <ul className={classes.shopping__list}>{spinnerShoppingList_ ? <Spinner /> : shopItems}</ul>
        </div>
    );
};

export default Shopping;

import React, { useState } from 'react';
import classes from './HeaderSearch.module.css';
import SVGIcon from '../../../assets/img/SVGIcon';
import Button from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import * as actionsRecipe from '../../../store/actions/actionsRecipe';
import { edamam } from '../../../axios-export';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const HeaderSearch = () => {
    const [searchInput, setSearchInput] = useState({ value: '' });
    console.log(searchInput);

    const dispatch = useDispatch();
    const on_Get_Recipes = (searchInput: { value: string }) => dispatch(actionsRecipe.getRecipe(searchInput));

    const onSearchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const updateSearchInput = { ...searchInput, value: e.target.value };
        setSearchInput(updateSearchInput);
    };

    const onSearchButtonHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        on_Get_Recipes(searchInput);
        // Reset search input
        const resetSearchInput = { ...searchInput, value: '' };
        setSearchInput(resetSearchInput);
    };

    return (
        <form className={classes.search} onSubmit={onSearchButtonHandler}>
            <input
                type="text"
                className={classes.search__field}
                placeholder="Search over 1,000,000 recipes..."
                onChange={(e) => onSearchInputHandler(e)}
                value={searchInput.value}
            />
            <Button classNameButton="btn" onClick={(e: any) => onSearchButtonHandler(e)}>
                <SVGIcon name="icon-magnifying-glass" className={classes.search__icon} fill="#fff" />
                <span>Search</span>
            </Button>
        </form>
    );
};

export default withErrorHandler(HeaderSearch, edamam);

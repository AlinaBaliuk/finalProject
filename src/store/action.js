import * as types from "./actionTypes";
import axios from "axios";

const fetchSearchCockTailStart = () => ({
	type: types.SEARCH_COCKTAIL_START,
});

const fetchSearchCockTailSuccess = (cocktails) => ({
	type: types.SEARCH_COCKTAIL_SUCCESS,
	payload: cocktails,
});

const fetchSearchCockTailFail = (error) => ({
	type: types.SEARCH_COCKTAIL_FAIL,
	payload: error,
});

const fetchSingleCockTailStart = () => ({
	type: types.GET_SINGLE_COCKTAIL_START,
});

const fetchSingleCockTailSuccess = (cocktail) => ({
	type: types.GET_SINGLE_COCKTAIL_SUCCESS,
	payload: cocktail,
});

const fetchSingleCockTailFail = (error) => ({
	type: types.GET_SINGLE_COCKTAIL_FAIL,
	payload: error,
});


export function fetchSearchCocktail(searchTerm) {
	return function (dispatch) {
		dispatch(fetchSearchCockTailStart());
		axios
			.get(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
			)
			.then((response) => {
				const cocktails = response.data.drinks;
				dispatch(fetchSearchCockTailSuccess(cocktails));
			})
			.catch((error) => {
				dispatch(fetchSearchCockTailFail(error));
			});
	};
}

export function fetchSingleCocktail(id) {
	return function (dispatch) {
		dispatch(fetchSingleCockTailStart());
		axios
			.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
			.then((response) => {
				const cocktail = response.data.drinks;
				dispatch(fetchSingleCockTailSuccess(cocktail));
			})
			.catch((error) => {
				dispatch(fetchSingleCockTailFail(error));
			});
	};
}

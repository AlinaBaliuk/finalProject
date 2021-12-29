import * as types from "./actionTypes";

const initialState = {
	cocktails: [],
	cocktail: [],
	loading: false,
	error: null,
};

const cockTailReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SEARCH_COCKTAIL_START:
			return {
				...state,
				loading: true,
			};
		case types.SEARCH_COCKTAIL_SUCCESS:
			return {
				...state,
				loading: false,
				cocktails: action.payload,
			};
		case types.SEARCH_COCKTAIL_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case types.GET_SINGLE_COCKTAIL_START:
			return {
				...state,
				loading: true,
			};
		case types.GET_SINGLE_COCKTAIL_SUCCESS:
			return {
				...state,
				loading: false,
				cocktail: action.payload,
			};
		case types.GET_SINGLE_COCKTAIL_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default cockTailReducer;
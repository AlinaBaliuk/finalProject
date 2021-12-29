import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchCocktail } from "../store/action";
import { SearchForm } from './SearchForm';
import { CocktailList } from './CocktailList';

export const Home = () => {
	const { cocktails, loading } = useSelector((state) => ({ ...state.data }));
	const [initial, setInitial] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [modifiedCocktail, setModifiedCocktail] = useState([]);

	let dispatch = useDispatch();
	useEffect(() => {
		let localSearchTerm = window.sessionStorage.getItem('seacrhTerm');
		if(!localSearchTerm){
			setInitial(true);
		} else {
			document.querySelector('#searchInput').value = localSearchTerm;
			setSearchTerm(localSearchTerm);
			dispatch(fetchSearchCocktail(searchTerm));
		}  
	}, [searchTerm]);

	useEffect(() => {
		if(searchTerm === '') {
			setInitial(true);
		} else {
			const timer = setTimeout(() => {
				setInitial(false);
					if(cocktails) {
						const newCocktails = cocktails.map(element => {
							const { idDrink, strDrink, strDrinkThumb, strAlcoholic } = element;
							return {
								id: idDrink,
								name: strDrink,
								image: strDrinkThumb,
								alcoholic: strAlcoholic
							};
						});
						setModifiedCocktail(newCocktails);
					} else {
						setModifiedCocktail([]);
					}
			}, 500);
			return () => clearTimeout(timer);
		}    
	}, [cocktails]);

	return (
		<>
			<SearchForm setSearchTerm={setSearchTerm} />
			<CocktailList loading={loading} cocktails={modifiedCocktail} initial={initial} />
		</>
	);
}

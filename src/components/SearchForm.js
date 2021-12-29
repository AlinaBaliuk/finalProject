import React, { useRef } from 'react';

export const SearchForm = ({ setSearchTerm }) => {
	const searchValue = useRef('');

	const handleSubmit = (event) => {
		event.perventDefault();
	}
	
	const searchCocktail = () => {
		setSearchTerm(searchValue.current.value);
		window.sessionStorage.setItem('seacrhTerm', searchValue.current.value);
	}

	return(
		<form onSubmit={handleSubmit} autoComplete="off">
			<input
				name="searchInput"
				id="searchInput"
				placeholder="Seacrh cocktails"
				onChange={searchCocktail}
				ref={searchValue}
			/>
		</form>
	);
}

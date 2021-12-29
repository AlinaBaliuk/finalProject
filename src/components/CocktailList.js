import React from 'react';
import { Cocktail } from './Cocktail';
import { LoadingCircle } from './LoadingCircle';

export const CocktailList = ({ cocktails, loading, initial }) => {
	if(initial) {
		return(
			<div className="coctail-img">
				<img src={'images/coctails.png'} />
				<p className="text-center">Please, search coctail.</p>
			</div>
		);
	} else {
		if(loading) {
			return(
				<LoadingCircle />
			);
		} else {
			if(!cocktails.length) {
				return(
					<p>Sorry! We do not have that cocktail.</p>
				)
			} else {
				return(
					<div className="container-cocktails-list">
						{cocktails.map(element => {
							return(
								<Cocktail {...element} key={element.id}/>
							);
						})}
					</div>
				);
			}
		}
	}
}

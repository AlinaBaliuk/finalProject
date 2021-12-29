import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Cocktail = ({ id, name, image, alcoholic }) => {
	return (
		<div className="coctail-card">
			<a href={`/cocktail/${id}`}>
				<div className="coctail-img">
					<img src={image} alt={name} />
				</div>
			</a>
			<div className="container-cocktail-info">
				<span>
					{alcoholic}
				</span>
				<span>
					{name}
				</span>
				<a
					href={`/cocktail/${id}`} className="view-recipe-btn"
				>
					View Recipe
				</a>
			</div>
		</div>
	);
}
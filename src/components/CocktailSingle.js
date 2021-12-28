import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingCircle } from './LoadingCircle';
import { BackHomeButton } from './BackHomeButton';

export const CocktailSingle = () => {
  const { id } = useParams();

  const [ loading, setLoading ] = useState(false);
  const [ cocktail, setCocktail ] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getCocktail = async() => {
      try {
        const result = await (await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        )).json();

        if(result.drinks) {
          const {strDrink:name,
            strDrinkThumb:image,
            strCategory:category,
            strAlcoholic:alcoholic,
            strGlass:glass,
            strInstructions:instructions,
            strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient14, strIngredient15,
            strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure14, strMeasure15
          } = result.drinks[0];
          const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient14, strIngredient15].filter((element) => { return element != null; });
          const measures = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure14, strMeasure15].slice(0, ingredients.length).map(element => { return element; });

          const newCocktail = {name, image, category, alcoholic, glass, instructions, ingredients, measures};
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch(error) {
        console.log('error: ', error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);

  if(loading) {
    return <LoadingCircle />;
  }
  if(!cocktail) {
    return(
      <p>Sorry! We do not have that cocktail.</p>
    );
  } else {
    const {name, image, category, alcoholic, glass, instructions, ingredients, measures} = cocktail;

    return(
      <div className="container-block-receipt">
        <div className="block-receipt">
          <div className="container-coctail-img">
            <img src={image} alt={name} />
          </div>
          <div className="container-ingredients">
            <div>
              <h2>
                {name}
              </h2>
              <div className="dsp-f dsp-f-sp-bt">
                {category ?
                  <div className="text-center">
                    <div>{category}</div>
                  </div>
                  :
                  null
                }
                {alcoholic ?
                  <div className="text-center">
                    {alcoholic === 'Non alcoholic' ?
                      <div>{alcoholic}</div>
                      :
                      <div>{alcoholic}</div>
                    }
                  </div>
                  :
                  null
                }
                {ingredients.length ?
                  <div className="text-center">
                    <div>
                      {ingredients.length}
                      {ingredients.length > 1 ?
                        ' Ingredients'
                        :
                        ' Ingredient'
                      }
                    </div>                      
                  </div>
                  :
                  null
                }
              </div>                
            </div>
            {ingredients.length ?
              ingredients.map((element, iterator) => {
                return(
                  element ?
                  <div key={iterator}>
                    <div className="dsp-f container-ingredient">
                      <div className="container-ingredient-img" style={{ 
                        backgroundImage: `url("//www.thecocktaildb.com/images/ingredients/${element}-Small.png")`}}>
                      </div>
                      <div>
                        <div>
                          Ingredient {iterator + 1}
                        </div>
                        <div>{element}</div>
                        {measures[iterator] ?
                          <div>
                            {measures[iterator]}
                          </div>
                          :
                          null
                        }
                      </div>
                    </div>
                  </div>
                  :
                  null
                );
              })
              :
              null
            }
            <div>
              {
                glass ?
                  <div style={{marginBottom: '20px'}}>Served in {glass}</div>
                :
                null
              }
              <span>Instructions</span>
              <div>{instructions}</div>
            </div>
          </div>
        </div>
        <div>
          <BackHomeButton />
        </div>        
      </div>
    );
  }
}
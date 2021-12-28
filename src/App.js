import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { Home } from './components/Home';
import { CocktailSingle } from './components/CocktailSingle';
import './style.css'

export const App = () => {

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return(
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router basename="/react-cocktail-database">
      <GlobalStyles/>
      <div className="container-header">
        <h1>Cocktail Recipes</h1>
        <button className="back-home-btn change-theme-btn" onClick={toggleTheme}>Toggle theme</button>
      </div>
        <Switch>
          <Route path="/cocktail/:id" exact>
            <CocktailSingle />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*" >
          </Route>        
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
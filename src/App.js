import React, { Component } from 'react'
import PropTypes from 'prop-types'
// CSS
import './App.css'

import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'

import withFirebase from './hoc/withFirebase'

import ColorContext from './components/Color'

//Firebase
import base from './base'

const App = ({ recettes,
               ajouterRecette, 
               majRecette, 
               supprimerRecette, 
               chargerExemple, 
               match }) => {
  console.log('render');
    const cards = Object.keys( recettes) //on change state à props
    .map(key => <Card key={ key } details={ recettes[key] }/>) //parcourt chaque recette par clés
    console.log(cards);
    return (
      <ColorContext>
        <div className='box'>
          <Header pseudo={ match.params.pseudo }/>
            <div className='cards'>
              { cards }
            </div>
          <Admin
            recettes={ recettes }
            ajouterRecette={ ajouterRecette }
            majRecette={ majRecette }
            supprimerRecette={ supprimerRecette }
            chargerExemple={ chargerExemple }
            pseudo={ match.params.pseudo} /> 
            {/* On ajoute props parce que les props sont dans le HOC */}
        </div>
      </ColorContext>
    )
}
App.propTypes = { // permet de vérifier si la valeur retournée est du type spécifié
  recettes: PropTypes.object.isRequired, // vérifier si la valeur de recette est du type objet
  ajouterRecette: PropTypes.func.isRequired,
  majRecette: PropTypes.func.isRequired,
  supprimerRecette: PropTypes.func.isRequired,
  chargerExemple: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

const wrappedComponent = withFirebase(App)

export default wrappedComponent

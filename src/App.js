import React, { Component } from 'react'
// CSS
import './App.css'

import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'

import withFirebase from './hoc/withFirebase'

//Firebase
import base from './base'

const App = ({ recettes, ajouterRecette, majRecette, supprimerRecette, chargerExemple, match }) => {
  console.log('render');
    const cards = Object.keys( recettes) //on change state à props
    .map(key => <Card key={ key } details={ recettes[key] }/>) //parcourt chaque recette par clés
    console.log(cards);
    return (
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
    )
}

const wrappedComponent = withFirebase(App)

export default wrappedComponent

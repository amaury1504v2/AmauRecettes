import React, { Component } from 'react'
// CSS
import './App.css'

import Header from './components/Header'
import recettes from './recettes'
import Admin from './components/Admin'
import Card from './components/Card'

//Firebase
import base from './base'

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  }

  componentDidMount() {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this, //synchronise le state
      state: 'recettes' //syncronise les recettes
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref) //on supprime le syncState
  }

  chargerExemple = () => this.setState({ recettes })
  
  render () {
    const cards = Object.keys(this.state.recettes)
    .map(key => <Card key={ key } details={ this.state.recettes[key] }/>) //parcourt chaque recette par clés
    console.log(cards);
    return (
      <div className='box'>
        <Header pseudo={ this.state.pseudo }/>
        <div className='cards'>
          <div className='card'>
            { cards }
          </div>
        </div>
        <Admin
          chargerExemple={ this.chargerExemple }></Admin>
      </div>
    )
  }
}

export default App

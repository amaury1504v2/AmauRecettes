import React from 'react'
import { Redirect } from 'react-router-dom'

class Connexion extends React.Component {
  state = {
    pseudo: '',
    goToApp: false
  }

  goToApp = event => {
    event.preventDefault() //si tu envoies après n'avoir rien écrit dans le pseudo
    this.setState({ goToApp: true })
  }

  handleChange = event => { //affecte la valeur mise dans l'input au state
    const pseudo = event.target.value //on affecte à pseudo la valeur tapée dans l'input
    this.setState({ pseudo }) //on affecte cette valeur tapée dans le state
  }

  render () {
    if (this.state.goToApp) {
      return <Redirect push to={`/pseudo/${this.state.pseudo}`} /> //on redirige vers le pseudo 
      //si la page est true
    }

    return (
      <div className='connexionBox'>
        <form className='connexion' onSubmit={this.goToApp} >
          <h1>Ma Boîte à Recettes</h1>
          <input
            type='text'
            value={this.state.pseudo} //on stocke la valeur dans le pseudo
            onChange={this.handleChange} //on effectue le changement
            placeholder='Nom du Chef'
            pattern='[A-Za-z-]{1,}'
            required />
          <button type='submit'>GO</button>
          <p>Pas de caractères spéciaux.</p>
        </form>
      </div>
    )
  }
}

export default Connexion

import React, { Component } from 'react'

const ColorContext = React.createContext() //contexte chargé dedans

class ColorProvider extends Component { //permet d'englober la zone du contexte qu'on veut mettre à disposition
    state = { //on simule le fait que l'utilisateur choisisse une couleur
        color: 'orange'
    }
    render() {
        return (
            <ColorContext.Provider 
            value={{
                state: this.state
            }}> {/* Le provider permet de définir qui fournit le contexte le consumer permet d'utiliser le contexte */}
            { this.props.children } {/* Tous les composants seront rendus ici avec en parent le state */}
            </ColorContext.Provider>
        )
    }
}

export { ColorContext }

export default ColorProvider

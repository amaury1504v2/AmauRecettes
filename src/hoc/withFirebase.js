import React, { Component } from 'react'
import base from '../base'
import recettes from '../recettes'

    const withFirebase = WrappedComponent => (
        class HOC extends Component {
            state = {
                pseudo: this.props.match.params.pseudo,
                recettes: {}
            }

            componentDidMount() { //componentDidMount permet de charger des données externes telles que celles d'API
                    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, { //on souscrit à la base de données via un lien
                    context: this, //synchronise le state
                    state: 'recettes' //syncronise les recettes
                    })
                    this.setState({ update: true })
                    console.log('ComponentDidMount')
                }

                componentDidUpdate() {
                    const update = !this.state.update // on crée un bool pour savoir s'il faut update
                    if (this.state.update === true) { 
                    this.setState({ update })
                    console.log('ComponentDidUpdateCondition')
                    }
                    console.log('ComponentDidUpdate')
                }

                componentWillUnmount() { // Permet de désouscrire de la base de données
                    base.removeBinding(this.ref) //on supprime le syncState
                }

                ajouterRecette = recette => {
                    const recettes = { ...this.state.recettes } //on copie le state recettes
                    recettes[`recette-${Date.now()}`] = recette //la recette concernée est donné une clé unique (Date.now())
                    this.setState({ recettes })
                }

                majRecette = (key, newRecette) => {
                    const recettes = { ...this.state.recettes } //on copie le state recettes
                    recettes[key] = newRecette // on met à jour la clé ?
                    this.setState({ recettes })
                }

                supprimerRecette = key => {
                    const recettes = { ...this.state.recettes }
                    recettes[key] = null
                    this.setState({ recettes })
                }

                chargerExemple = () => this.setState({ recettes })
            render() {
            return (
                <WrappedComponent 
                    recettes={this.state.recettes}
                    ajouterRecette={this.ajouterRecette}
                    majRecette={this.majRecette}
                    supprimerRecette={this.supprimerRecette}
                    chargerExemple={this.chargerExemple}
                    { ...this.props }/>
            )
        }
    }
)

export default withFirebase

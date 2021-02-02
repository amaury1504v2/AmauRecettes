import React, { Component } from 'react'
import AjouterRecette from './AjouterRecette'

export default class Admin extends Component {
    render() {
        return (
            <div className='cards'>
                <AjouterRecette ajouterRecette={this.props.ajouterRecette}/>
                <footer>
                    <button onClick={this.props.chargerExemple}>Remplir</button>
                </footer>
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class AjouterRecette extends Component {
    state = {
        nom: '',
        image: '',
        ingredients: '',
        instructions: ''
    }

    handleChange = event => {
        const { name, value } = event.target //grâce au nom on peut changer la valeur
        this.setState({ [name]: value }) //on met met en place le changement de la valeur à partir du nom
    }

    handleSubmit = event => {
        event.preventDefault()
        const recette = { ...this.state } //on fait une copie de l'objet dans recette
        this.props.ajouterRecette(recette)
        Object.keys(recette).forEach(item => { //on parcourt les clés de recette, pour chaque item,
            recette[item] = '' //on vide la valeur de chaque case du formulaire
            this.setState({ ...recette }) //on applique ça à chaque élément de l'objet dans le state
        })
    }

    render() {
        return (
            <div className="card">
                <form action="" className="admin-form ajouter-recette" onSubmit={this.handleSubmit}>
                    <input value={ this.state.nom } onChange={ this.handleChange } name="nom" type="text" placeholder="Nom de la recette"/>
                    <input value={ this.state.image } onChange={ this.handleChange } name="image" type="text" placeholder="Nom de l'image"/>
                    <textarea value={ this.state.ingredients } onChange={this.handleChange } name="ingredients" id="" rows="3" placeholder="Ingrédients"></textarea>
                    <textarea value={ this.state.instructions } onChange={ this.handleChange } name="instructions" id="" rows="15" placeholder="Instructions"></textarea>
                    <button type="submit">+ Ajouter une recette</button>
                </form>
            </div>
        )
    }
}

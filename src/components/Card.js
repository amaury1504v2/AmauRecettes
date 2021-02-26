//rafce
import React from 'react'
import { ColorContext } from './Color'

const Card = ({ details }) => {
    const ingredients = details.ingredients 
        .split(',') //on sépare par une virgule tous les ingrédients
        .map(item => <li>{item}</li>) //chaque item devient un li d'une liste
        console.log(ingredients);

    const instructions = details.instructions
        .split('\n') //on sépare par un retour à la ligne tous les ingrédients
        .map(item => <li>{item}</li>)
        console.log(instructions); 
    
    const requireImage = chemin => { //si l'image ne trouve pas le chemin entré par l'utilisateur, elle va prendre celle par défaut
        try  {
            return require(`../img/${chemin}`)
        } catch (err) {
            return require(`../img/default.jpeg`)
        }
    }
    return (
        //rebellote le contexte
        <ColorContext.Consumer> 
            {context => (
                <div className="card" style={{ backgroundColor: context.state.color }}>
                <div className="image">
                    <img src={requireImage(details.image)} alt={details.nom}/> 
                    {/* permet de récupérer une image via le lien qui redirige vers son dossier */}
                </div>
                <h2>{ details.nom }</h2>
                <ul className="liste-ingrédients">
                    { ingredients }
                </ul>
                <ol className="liste-instructions">
                    { instructions }
                </ol>
            </div>
            )}
        </ColorContext.Consumer>
    )
}

export default Card

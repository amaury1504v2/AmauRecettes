import React from 'react'

const AdminForm = ({
    id: key,
    majRecette,
    recettes,
    supprimerRecette
}) => {
    const recette = recettes[key]

    const handleChange = (event, key) => {
        const { name, value } = event.target // on prend le nom et la valeur de l'input
        const recette = recettes[key] // la constante recette est une copie du state recette
        recette[name] = value // sur cette copie de recette, on y met la valeur modifiée
        majRecette(key, recette) // prend le state, la clé, la nouvelle recette et mettre à jour l'ancienne
    }
    
    return (
        <div>
            <div className="card">
                <form action="" className="admin-form">

                    <input value={ recette.nom } onChange={ e => handleChange(e, key) } name="nom" type="text" placeholder="Nom de la recette"/>

                    <input value={ recette.image } onChange={ e => handleChange(e, key) } name="image" type="text" placeholder="Nom de l'image"/>

                    <textarea value={ recette.ingredients } onChange={ e => handleChange(e, key) } name="ingredients" id="" rows="3" placeholder="Ingrédients"></textarea>

                    <textarea value={ recette.instructions } onChange={ e => handleChange(e, key) } name="instructions" id="" rows="15" placeholder="Instructions"></textarea>

                </form>
                <button onClick={() => supprimerRecette(key)}>Supprimer</button> 
                {/* () => permet de lancer la fonction uniquement au click */}
            </div>
        </div>
    )
}

export default AdminForm

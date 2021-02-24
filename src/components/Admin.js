import React, { Component } from 'react'
import AjouterRecette from './AjouterRecette'
import AdminForm from './AdminForm'
import Login from './Login'

import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../base'

export default class Admin extends Component {

    state = {
        uid: null, //identifiant unique d'utilisateur
        chef: null //correspond au chef de la page
    }

    // si après m'être connecté, je change l'url ex je tape url/pseudo/Jean, une fois connecté à ce dernier,
    // si je retourne en arrière, je vais pouvoir retrouver ma page avec ses données intactes

    componentDidMount () { // faire persister la connexion entre les sessions
        firebase.auth().onAuthStateChanged( user => { // quand qqchse change sur l'utilisateur
        // on passe une fonction avec user
            if (user) { // s'il y a un utilisateur connecté
                this.handleAuth({ user }) // on met en place notre propre système d'auth
                // en passant l'objet auth en destructuring (à authData de la fonction en dessous)
            }
        }) // dès qu'un état va changer
    }

    handleAuth = async authData => { //async placé devant une fonction permet de placer un await dedans
        const box = await base.fetch(this.props.pseudo, { context: this }) //on récupère le pseudo, {...} indique qu'on est dans le component admin
        //await: avant de passer à la suite, attendre que x commande est effectuée
        if (!box.chef) { // si je n'ai pas enregistré chef dans la base de données au dessus de l'onglet utilisateur
            await base.post(`${this.props.pseudo}/chef`, { //on poste le pseudo dirigé vers le chemin d'accès chef
                data: authData.user.uid //avec en paramètre l'UID de l'utilisateur
            }) 
        }

        this.setState({
            uid: authData.user.uid, //on met à jour l'uid
            chef: box.chef || authData.user.uid //on envoie soit box.chef s'il est présent, sinon on envoie l'uid
        })
    }

    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider() //on crée une nouvelle instance de authProvider
        firebaseApp
            .auth() //se connecter
            .signInWithPopup(authProvider) //avec le '...' provider (renvoie une promesse)
            .then(this.handleAuth) // après la promesse
    }

    logout = async () => {
        console.log('déconnexion');
        await firebase.auth().signOut() // on attend cette méthode qui permet de se déconnecter
        this.setState({ uid : null }) // on supprime l'uid présent en rendant la valeur uid nulle
    }

    render() {
        const { recettes, ajouterRecette, majRecette, chargerExemple, supprimerRecette } = this.props

        const logout = <button onClick={this.logout}>Déconnexion</button>

        // Si l'utilisateur n'est pas connecté
        if(!this.state.uid)  {// s'il n'y a pas d'indentifiant unique
            return <Login authenticate={this.authenticate}></Login>
        }

        if(this.state.uid !== this.state.chef) {
            return (
                <div>
                    <p>Tu n'es pas le chef de cette boîte.</p>
                    {logout}
                </div>
            )
        }
        
        return (
            <div className='cards'>
                <AjouterRecette ajouterRecette={ ajouterRecette }/>
                { 
                    Object.keys(recettes) //pour chacune des clés, ajouter un component qui s'appelle adminForm
                        .map(key => <AdminForm
                        key={ key }
                        id={ key }
                        majRecette={ majRecette }
                        supprimerRecette={ supprimerRecette }
                        recettes={ recettes }></AdminForm>)
                }
                <footer>
                    <button onClick={ chargerExemple }>Remplir</button>
                    {logout}
                </footer>
            </div>
        )
    }
}

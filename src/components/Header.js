//rafce emmet shortcut
import React from 'react'

const Header = ({ pseudo }) => {
    const formatPseudo = pseudo => /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`
    //regex : vérifie si un format de qqchse correspond à autrechose i:peu importe si c'est en maj ou pas
    //test() = tester la regex; pseudo[0] = valeur qui a comme index 0 de pseudo donc la première lettre du mot pseudo
    return (
        <header>
            <h1>La boîte à recettes { formatPseudo(pseudo) }</h1>
        </header>
    )
}

export default Header


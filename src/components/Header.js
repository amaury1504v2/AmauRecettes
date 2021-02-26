//rafce emmet shortcut
import React from 'react'

import { ColorContext } from './Color'

const Header = ({ pseudo }) => {
    const formatPseudo = pseudo => /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`
    //regex : vérifie si un format de qqchse correspond à autrechose i:peu importe si c'est en maj ou pas
    //test() = tester la regex; pseudo[0] = valeur qui a comme index 0 de pseudo donc la première lettre du mot pseudo
    return (
        // permet de doner un contexte
        <ColorContext.Consumer> 
            {context => (
                <header style={{ backgroundColor: context.state.color }}>
                    <h1>La boîte à recettes {formatPseudo(pseudo)}</h1>
                </header>
            )}
        </ColorContext.Consumer>
    )
}

export default Header


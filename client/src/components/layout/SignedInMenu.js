import React from 'react'

const SignedInMenu = ({logout}) => {
    return (
        <>
          <li onClick={logout} ><a className="blue-text text-lighten-2" href="#">Logout</a></li>  
        </>
    )
}

export default SignedInMenu

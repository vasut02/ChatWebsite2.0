import React from 'react'

const SignedOutMenu = () => {
    return (
        <>
            <li><a className="blue-text text-lighten-2" href="/login">Login</a></li>
            <li><a className="blue-text text-lighten-2" href="/signup">Sign Up</a></li>
        </>
    )
}

export default SignedOutMenu

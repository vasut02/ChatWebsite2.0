import React, { useContext } from 'react'
import { UserContext } from "../../UserContext";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu  from "./SignedOutMenu";
import serverURL from "../../constant"


const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      const res = await fetch(`http://${serverURL}/logout`, {
        credentials: 'include'
      });
      const data = res.json();
      console.log('logout data', data);
      setUser(null);
    } catch (error) {
      console.log(error);
    }

  }
  const menu = user?<SignedInMenu logout={logout}/>:<SignedOutMenu/>;

  return (
    <>
      <nav >
        <div className="black nav-wrapper ">
          <a href="/" className="blue-text text-lighten-2 brand-logo">Chat</a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down " >
            {menu}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {menu}
      </ul>

    </>
  )
}

export default Navbar

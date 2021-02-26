import { useState } from 'react'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [ active, setActive ] = useState(false)

    return(
        <div className="mx-auto bg-gradient-to-r from-purple-800 to-blue-500 text-white font-bold">
            <nav className="grid grid-cols-2 md:grid-cols-3">
                <div className="p-4 col-span-2 md:col-span-1 flex justify-between items-center md:hidden ">
                    <Icon icon={active ? faTimes : faBars}
                    onClick={() => setActive(!active)}
                    className="text-2xl m-1" />
                </div>
                <ul className={`${ active ? "" : "hidden" } ` + "md:flex md:col-span-3 justify-around"}>
                    <li className="p-5 w-1/3 text-center hover:bg-purple-500 hover:animate-pulse"><a href="">Home</a></li>
                    <li className="p-5 w-1/3 text-center hover:bg-purple-500 hover:animate-pulse"><a href="">Builds</a></li>
                    <li className="p-5 w-1/3 text-center hover:bg-purple-500 hover:animate-pulse"><a href=""><Icon icon={faSignOutAlt} className="mr-3" /> Cerrar sesión</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
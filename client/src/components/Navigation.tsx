import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">
                        <button>Home</button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Admin">
                        <button>Admin</button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <button>Home</button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
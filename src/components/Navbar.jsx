import { NavLink, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
      <nav className="bg-primary text-white px-6 py-4">
        <ul className="flex space-x-6 max-w-4xl mx-auto">
          <li>
            <NavLink to="/allrocks" className="hover:text-secondary transition-colors">
              All Rocks
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" className="hover:text-secondary transition-colors">
              Collect a Rock
            </NavLink>
          </li>
          <li>
            <NavLink to="/mine" className="hover:text-secondary transition-colors">
              My Rocks
            </NavLink>
          </li>
          {localStorage.getItem("rock_token") ? (
            <li>
              <button
                className="hover:text-secondary transition-colors"
                onClick={() => {
                  localStorage.removeItem("rock_token")
                  navigate('/login')
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="hover:text-secondary transition-colors">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="hover:text-secondary transition-colors">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    )
}
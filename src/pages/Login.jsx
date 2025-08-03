import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"

export const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const existDialog = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add("auth-page")
    return () => {
      document.body.classList.remove("auth-page")
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    fetch(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.valid) {
          localStorage.setItem("rock_token", JSON.stringify(authInfo))
          navigate("/")
        } else {
          existDialog.current.showModal()
        }
      })
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form
          onSubmit={handleLogin}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h1 className="text-3xl font-heading text-center">Rock of Ages</h1>
          <h2 className="text-lg text-center text-neutral-600">
            Please sign in
          </h2>
          <div>
            <label htmlFor="inputEmail" className="block text-sm font-medium text-neutral-700">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              required
              autoFocus
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="inputPassword" className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          <Link to="/register" className="underline hover:text-secondary">
            Not a member yet?
          </Link>
        </p>
      </section>
    </main>
  )
}

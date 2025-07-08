import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const RockForm = ({ fetchRocks }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const initialRockState = {
    name: "",
    weight: 0,
    typeId: 0,
  }

  const [types, changeTypes] = useState([
    { id: 1, label: "Igneous" },
    { id: 2, label: "Volcanic" },
  ])
  const [rock, updateRockProps] = useState(initialRockState)
  const navigate = useNavigate()

  const fetchTypes = async () => {
    const response = await fetch(`${apiUrl}/types`, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rock_token")).token
        }`,
      },
    })
    const types = await response.json()
    changeTypes(types)
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  const collectRock = async (evt) => {
    evt.preventDefault()

    await fetch(`${apiUrl}/rocks`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rock_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rock),
    })

    await fetchRocks()

    navigate("/allrocks")
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <section>
        <form
          onSubmit={collectRock}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h1 className="text-3xl font-heading text-center">Collect a Rock</h1>

          <div>
            <label htmlFor="rock" className="block text-sm font-medium text-neutral-700">
              Name:
            </label>
            <input
              id="rock"
              type="text"
              value={rock.name}
              onChange={(e) => {
                const copy = { ...rock }
                copy.name = e.target.value
                updateRockProps(copy)
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-neutral-700">
              Weight in kg:
            </label>
            <input
              id="weight"
              type="number"
              value={rock.weight}
              onChange={(e) => {
                const copy = { ...rock }
                copy.weight = e.target.value
                updateRockProps(copy)
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-neutral-700">
              Type
            </label>
            <select
              id="type"
              value={rock.typeId}
              onChange={(e) => {
                const copy = { ...rock }
                copy.typeId = parseInt(e.target.value)
                updateRockProps(copy)
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
            >
              <option value={0}>Select a type</option>
              {types.map((t) => (
                <option key={`type-${t.id}`} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
            >
              Collect Rock
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

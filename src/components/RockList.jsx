import { useEffect } from "react"

export const RockList = ({ rocks, fetchRocks, showAll }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  useEffect(() => {
    fetchRocks(showAll)
  }, [showAll])

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-heading">Rock List</h1>
      {rocks && rocks.length > 0 ? (
        <div className="space-y-6">
          {rocks.map((rock) => (
            <div key={rock.id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-heading">
                {rock.name} ({rock.type.label})
              </h3>
              <p>
                In the collection of {rock.user.first_name} {rock.user.last_name}
              </p>
              {!showAll && (
                <button
                  onClick={async () => {
                    const response = await fetch(`${apiUrl}/rocks/${rock.id}`, {
                      method: 'DELETE',
                      headers: {
                        Authorization: `Token ${JSON.parse(
                          localStorage.getItem('rock_token')
                        ).token}`,
                      },
                    })

                    if (response.status === 204) {
                      fetchRocks(showAll)
                    }
                  }}
                  className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Rocks...</p>
      )}
    </div>
  )
}

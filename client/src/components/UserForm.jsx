import React, { useState } from "react"
import { useUserStore } from "../stores/userStore.jsx"
import { api } from "../endpoints/api.js"

const UserForm = () => {
  const setUser = useUserStore((state) => state.setUser)

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setName(e.target.value)
  }

  const createUser = async () => {
    if (!name) return alert("Username is required")

    setLoading(true)
    try {
      const res = await api.post("/users", { username: name })
      setUser(res.data.id)
      setName("")
    } catch (err) {
      alert(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 w-80 mx-auto">
      <h3 className="text-lg font-medium text-center">User Form</h3>
      <div className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter your username"
          className="border border-gray-300 p-2 rounded"
        />

        <button
          onClick={createUser}
          disabled={loading}
          className={`rounded px-3 py-2 transition 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          {loading ? "Loading..." : "Connect"}
        </button>
      </div>
    </div>
  )
}

export default UserForm

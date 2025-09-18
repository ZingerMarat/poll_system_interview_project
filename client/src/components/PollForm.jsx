import React, { useState } from "react"
import { useUserStore } from "../stores/userStore.jsx"
import { api } from "../endpoints/api.js"
import { usePollsStore } from "../stores/pollStore.jsx"

const PollForm = () => {
  const userId = useUserStore((state) => state.userId)
  const { loadPolls } = usePollsStore()

  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [loading, setLoading] = useState(false)

  const filledOptions = options.filter((opt) => opt.trim() !== "")
  const isValid = question.trim().length > 0 && filledOptions.length >= 2
  const isDisabled = loading || !isValid

  const updateOption = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value

    if (index === newOptions.length - 1 && value.trim() !== "" && newOptions.length < 8) {
      newOptions.push("")
    }

    const filled = newOptions.filter((opt) => opt.trim() !== "")
    const last = newOptions[newOptions.length - 1]

    let result = last.trim() === "" ? [...filled, ""] : [...filled, ""]

    if (result.length < 2) {
      while (result.length < 2) result.push("")
    }

    if (result.length > 8) {
      result = result.slice(0, 8)
    }

    setOptions(result.length === 0 ? ["", ""] : result)
  }

  const createPoll = async () => {
    setLoading(true)
    try {
      await api.post("/polls", {
        creatorId: userId,
        question,
        options: filledOptions,
      })
      setQuestion("")
      setOptions(["", ""])
      await loadPolls(userId)
    } catch (err) {
      alert(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 w-80 mx-auto mt-20">
      <h3 className="text-lg font-medium text-center">Poll Form</h3>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your poll question"
          className="border border-gray-300 p-2 rounded"
        />

        <div className="flex flex-col gap-2">
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="border border-gray-300 p-2 rounded"
            />
          ))}
        </div>

        <button
          onClick={createPoll}
          className={`rounded px-3 py-2 transition text-white
    ${
      isDisabled || loading
        ? "bg-gray-400 cursor-not-allowed opacity-50"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
        >
          {loading ? "Loading..." : "Submit Poll"}
        </button>
      </div>
    </div>
  )
}

export default PollForm

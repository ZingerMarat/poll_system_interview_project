import { useEffect } from "react"
import { usePollsStore } from "../stores/pollStore"
import { useUserStore } from "../stores/userStore"
import { api } from "../endpoints/api"
import { useState } from "react"

const PollSingle = ({ pollId }) => {
  const userId = useUserStore((state) => state.userId)
  const [loading, setLoading] = useState(false)
  const [poll, setPoll] = useState(null)

  const fetchPoll = async () => {
    const { data } = await api.get(`/polls/${pollId}`)
    setPoll(data)
    console.log(data)
  }

  useEffect(() => {
    console.log("Fetching poll with ID:", pollId)
    fetchPoll()
  }, [pollId])

  if (!poll) return <div className="text-center mt-10">Poll not found</div>

  const hasVoted = poll.options.some((opt) => opt.votes?.some((v) => v.userId === userId))
  const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes?.length || 0), 0)

  const vote = async (optionId) => {
    setLoading(true)
    try {
      await api.post(`/polls/${poll.id}/vote`, { userId, optionId })
      await fetchPoll()
    } catch (err) {
      alert(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-gray-300 p-4 rounded w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">{poll.question}</h2>
      <ul className="flex flex-col gap-3">
        {poll.options.map((option) => {
          const votes = option.votes?.length || 0
          const percent = totalVotes ? Math.round((votes / totalVotes) * 100) : 0
          return (
            <li key={option.id} className="flex items-center gap-2">
              <div className="relative w-full bg-gray-200 rounded h-5 overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
                  style={{ width: `${percent}%` }}
                />
                <div className="relative z-10 flex justify-between items-center px-2 text-sm text-white">
                  <span className="truncate">{option.text}</span>
                  <span>
                    {votes} ({percent}%)
                  </span>
                </div>
              </div>
              {!hasVoted && (
                <button
                  onClick={() => vote(option.id)}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  Vote
                </button>
              )}
            </li>
          )
        })}
      </ul>
      <p className="mt-4 text-xs text-gray-500 text-center">Total votes: {totalVotes}</p>
    </div>
  )
}

export default PollSingle

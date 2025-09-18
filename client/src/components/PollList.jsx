import { useEffect, useState } from "react"
import { useUserStore } from "../stores/userStore.jsx"
import { api } from "../endpoints/api.js"
import { usePollsStore } from "../stores/pollStore.jsx"

const PollList = () => {
  const userId = useUserStore((state) => state.userId)
  const { polls, loadPolls } = usePollsStore()
  const [showLinkId, setShowLinkId] = useState(null)

  useEffect(() => {
    if (!userId) return
    loadPolls(userId)
  }, [userId, loadPolls])

  const vote = async (pollId, optionId) => {
    try {
      await api.post(`/polls/${pollId}/vote`, { userId, optionId })
      await loadPolls(userId)
    } catch (err) {
      alert(err.response?.data?.error || err.message)
    }
  }

  if (!userId) return null

  return (
    <div className="flex flex-col gap-3 w-96 mx-auto">
      <h3 className="text-lg font-medium text-center">Poll List</h3>

      <div className="flex flex-col gap-2">
        {polls.map((poll) => {
          const hasVoted = poll.options.some((opt) => opt.votes?.some((v) => v.userId === userId))

          const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes?.length || 0), 0)

          return (
            <div key={poll.id} className="border border-gray-300 p-3 rounded">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold mb-2">{poll.question}</p>
                <div className="flex items-center gap-2">
                  {showLinkId === poll.id && (
                    <input
                      type="text"
                      readOnly
                      value={"http://localhost:3000/polls/" + poll.id}
                      className="border px-2 py-1 rounded text-sm w-40"
                      onFocus={(e) => e.target.select()}
                    />
                  )}

                  <button
                    onClick={() => setShowLinkId(showLinkId === poll.id ? null : poll.id)}
                    className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    {showLinkId === poll.id ? "Hide" : "Share"}
                  </button>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
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
                          onClick={() => vote(poll.id, option.id)}
                          className=" text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                          Vote
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>

              <p className="mt-2 text-xs text-gray-500">Total votes: {totalVotes}</p>
            </div>
          )
        })}
      </div>

      {polls.length === 0 && <p className="text-center text-gray-500">No polls available</p>}
    </div>
  )
}

export default PollList

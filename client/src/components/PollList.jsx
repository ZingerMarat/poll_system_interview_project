import { useEffect, useState } from "react"
import { useUserStore } from "../stores/userStore.jsx"
import { api } from "../endpoints/api.js"
import { usePollsStore } from "../stores/pollStore.jsx"
import PollCard from "./PollCard"

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
            <PollCard
              key={poll.id}
              poll={poll}
              userId={userId}
              hasVoted={hasVoted}
              totalVotes={totalVotes}
              showLinkId={showLinkId}
              setShowLinkId={setShowLinkId}
              vote={vote}
            />
          )
        })}
      </div>
      {polls.length === 0 && <p className="text-center text-gray-500">No polls available</p>}
    </div>
  )
}

export default PollList

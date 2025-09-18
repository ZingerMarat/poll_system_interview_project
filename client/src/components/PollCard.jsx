import PollOption from "./PollOption"
import PollShareLink from "./PollShareLink"

const PollCard = ({ poll, userId, hasVoted, totalVotes, showLinkId, setShowLinkId, vote }) => (
  <div className="border border-gray-300 p-3 rounded">
    <div className="flex justify-between items-center mb-2">
      <p className="font-semibold mb-2">{poll.question}</p>
      <div className="flex items-center gap-2">
        <PollShareLink
          pollId={poll.id}
          show={showLinkId === poll.id}
          onToggle={() => setShowLinkId(showLinkId === poll.id ? null : poll.id)}
        />
      </div>
    </div>
    <ul className="flex flex-col gap-2">
      {poll.options.map((option) => {
        const votes = option.votes?.length || 0
        const percent = totalVotes ? Math.round((votes / totalVotes) * 100) : 0
        return (
          <PollOption
            key={option.id}
            option={option}
            percent={percent}
            votes={votes}
            canVote={!hasVoted}
            onVote={() => vote(poll.id, option.id)}
          />
        )
      })}
    </ul>
    <p className="mt-2 text-xs text-gray-500">Total votes: {totalVotes}</p>
  </div>
)

export default PollCard

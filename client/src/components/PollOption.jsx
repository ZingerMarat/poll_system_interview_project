const PollOption = ({ option, percent, votes, canVote, onVote }) => (
  <li className="flex items-center gap-2">
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
    {canVote && (
      <button
        onClick={onVote}
        className=" text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
      >
        Vote
      </button>
    )}
  </li>
)

export default PollOption

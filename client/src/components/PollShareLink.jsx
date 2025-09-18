const PollShareLink = ({ pollId, show, onToggle }) => (
  <>
    {show && (
      <div className="flex gap-2 items-center">
        <input
          type="text"
          readOnly
          value={"http://localhost:5173/polls/" + pollId}
          className="border px-2 py-1 rounded text-sm w-40"
          onFocus={(e) => e.target.select()}
        />
      </div>
    )}
    <button
      onClick={onToggle}
      className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
    >
      {show ? "Hide" : "Share"}
    </button>
  </>
)

export default PollShareLink

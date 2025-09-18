const PollShareLink = ({ pollId, show, onToggle }) => (
  <>
    {show && (
      <input
        type="text"
        readOnly
        value={"http://localhost:3000/polls/" + pollId}
        className="border px-2 py-1 rounded text-sm w-40"
        onFocus={(e) => e.target.select()}
      />
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

import PollSingle from "../components/PollSingle"
import { useParams } from "react-router-dom"
import UserForm from "../components/UserForm.jsx"
import { useUserStore } from "../stores/userStore"

const PollPage = () => {
  const { id } = useParams()
  const userId = useUserStore((state) => state.userId)

  return (
    <div className="flex flex-col items-center gap-4 mb-4">
      <UserForm />
      {!userId && (
        <p className="text-gray-600 text-sm">
          Please connect your account to participate in the poll.
        </p>
      )}
      {userId && <PollSingle pollId={id} />}
    </div>
  )
}

export default PollPage

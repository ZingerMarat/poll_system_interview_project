import UserForm from "../components/UserForm.jsx"
import PollForm from "../components/PollForm.jsx"
import { useUserStore } from "../stores/userStore.jsx"
import PollList from "../components/PollList.jsx"

const HomePage = () => {
  const userId = useUserStore((state) => state.userId)

  return (
    <div className="flex gap-4 item-start">
      <div className="flex flex-col items-center gap-4 mb-4">
        <UserForm />
        {userId && <PollForm />}
      </div>
      {userId && <PollList />}
    </div>
  )
}

export default HomePage

import RequireAuth from "../_components/require-auth"

const ProfilePage = () => {
  return (
    <RequireAuth>
      <div>
        <h1>Profile Page</h1>
      </div>
    </RequireAuth>
  )
}

export default ProfilePage

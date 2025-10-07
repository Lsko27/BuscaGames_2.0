"use client"

import RequireAuth from "../_components/require-auth"
import ProfileHeader from "../_components/profile-header"

const ProfilePage = () => {
  return (
    <RequireAuth>
      <ProfileHeader />
      
    </RequireAuth>
  )
}

export default ProfilePage

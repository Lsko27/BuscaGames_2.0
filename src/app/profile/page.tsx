"use client"

import { useState } from "react"
import RequireAuth from "@/components/require-auth"
import ProfileHeader from "@/components/profile-header"
import OverviewTab from "./_components/overview-tab"
import LibraryTab from "./_components/library-tab"
import FavoriteTab from "./_components/favorite-tab"
import { Button } from "@/components/ui/button"
import AchievementsTab from "./_components/achievements-tab"

const tabs = [
  { key: "overview", label: "Visão Geral" },
  { key: "library", label: "Biblioteca" },
  { key: "favorites", label: "Favoritos" },
  { key: "achievements", label: "Conquistas" },
]

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "library":
        return <LibraryTab />
      case "favorites":
        return <FavoriteTab />
      case "achievements":
        return <AchievementsTab />
      default:
        return null
    }
  }

  return (
    <RequireAuth>
      <div className="w-full">
        <ProfileHeader />

        {/* MENU DE ABAS */}
        <div className="flex flex-wrap gap-4 px-16 pt-6">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "scale-105 bg-purple-700 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* CONTEÚDO DA ABA */}
        <div className="min-h-[60vh] px-16 py-10 transition-all duration-500">
          {renderTab()}
        </div>
      </div>
    </RequireAuth>
  )
}

export default ProfilePage

import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'
import { useNavigate } from '@tanstack/react-router'
import { logoutUser } from '../api/user.api'

const DashboardPage = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate({ to: '/' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white -mt-20 p-8 rounded-lg shadow-md w-full max-w-4xl">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">URL Shortener</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>

        <UrlForm />
        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage
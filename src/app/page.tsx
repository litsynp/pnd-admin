'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-xl font-bold">Welcome to PND Admin</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push('/auth/login')}
        >
          Sign in
        </button>
      </div>
    </main>
  )
}

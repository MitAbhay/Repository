import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main>
          {/* sidebar */}
          <p className="text-white">Repository</p>
          <Sidebar />

            {/* center */}
      </main>
    </div>
  )
}

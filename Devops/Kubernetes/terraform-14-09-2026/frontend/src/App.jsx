import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [error, setError] = useState('')
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/`)
        if (!response.ok) {
          throw new Error('Backend request failed')
        }

        const data = await response.json()
        setMessage(data.message || 'Backend is connected')
      } catch (err) {
        setError(err.message)
        setMessage('Frontend is running, but backend is not connected.')
      }
    }

    fetchData()
  }, [apiUrl])

  return (
    <main className="app-shell">
      <section className="card">
        <span className="badge">React Frontend</span>
        <h1>Welcome</h1>
        <p className="status">{message}</p>
        {error && <p className="error">{error}</p>}

        <div className="meta">
          <p>API URL: {apiUrl}</p>
          <p>App Name: {import.meta.env.VITE_APP_NAME || 'My App'}</p>
        </div>
      </section>
    </main>
  )
}

export default App

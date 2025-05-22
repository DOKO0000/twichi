import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('streamToken', data.token)
        router.push('/admin/dashboard')
      } else {
        setError(data.message || 'Error de autenticación')
      }
    } catch (err) {
      setError('Error de conexión')
    }
  }

  return (
    <div className="login-page">
      <Head>
        <title>Admin Login</title>
      </Head>
      
      <form onSubmit={handleSubmit}>
        <h2>Acceso Administrador</h2>
        {error && <p className="error">{error}</p>}
        
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}
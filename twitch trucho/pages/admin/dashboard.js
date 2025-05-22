import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const [streamConfig, setStreamConfig] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('streamToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Obtener configuración del stream
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/auth/config', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setStreamConfig(data)
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchConfig()
  }, [router])

  return (
    <div className="dashboard">
      <Head>
        <title>Panel de Control</title>
      </Head>
      
      <h1>Panel de Control del Stream</h1>
      
      {streamConfig && (
        <div className="stream-config">
          <h2>Configuración para OBS</h2>
          <div className="config-item">
            <label>Servidor RTMP:</label>
            <code>{streamConfig.rtmpServer}</code>
          </div>
          <div className="config-item">
            <label>Clave de Stream:</label>
            <code>{streamConfig.streamKey}</code>
          </div>
          
          <div className="obs-instructions">
            <h3>Instrucciones para OBS:</h3>
            <ol>
              <li>Abre OBS Studio</li>
              <li>Ve a Configuración {'>'} Emisión</li>
              <li>Servicio: Personalizado</li>
              <li>Servidor: Ingresa el RTMP Server de arriba</li>
              <li>Clave de Stream: Ingresa la clave proporcionada</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
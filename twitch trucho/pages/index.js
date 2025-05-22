import { useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../public/styles/globals.css'

export default function Home() {
  const videoRef = useRef(null)
  const chatContainerRef = useRef(null)
  const messageInputRef = useRef(null)

  useEffect(() => {
    // Cargar scripts dinámicamente
    const loadScripts = async () => {
      const playerModule = await import('../public/scripts/player.js')
      playerModule.initializePlayer(videoRef.current)
      
      const chatModule = await import('../public/scripts/chat.js')
      chatModule.initializeChat(chatContainerRef.current, messageInputRef.current)
    }
    
    loadScripts()
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Streaming en Vivo</title>
        <meta name="description" content="Transmisión en vivo" />
      </Head>

      <main>
        <h1>Transmisión en Vivo</h1>
        
        <div className="video-container">
          <video
            ref={videoRef}
            id="video-player"
            controls
            playsInline
            className="video-js"
          />
        </div>
        
        <div className="chat-box">
          <div className="chat-messages" ref={chatContainerRef}></div>
          <div className="chat-input">
            <input
              type="text"
              ref={messageInputRef}
              placeholder="Escribe tu mensaje..."
            />
            <button>Enviar</button>
          </div>
        </div>
      </main>
    </div>
  )
}
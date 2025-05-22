export function initializePlayer(videoElement) {
  // Configuración del reproductor de video
  if (typeof window !== 'undefined') {
    const videoJs = require('video.js')
    
    const player = videoJs(videoElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      responsive: true,
      fluid: true,
      sources: [{
        src: process.env.NEXT_PUBLIC_STREAM_URL,
        type: 'application/x-mpegURL'
      }]
    })
    
    player.ready(() => {
      console.log('Reproductor listo')
    })
    
    return player
  }
}
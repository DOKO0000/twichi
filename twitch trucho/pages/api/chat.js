import { Server } from 'socket.io'

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')
    
    const io = new Server(res.socket.server)
    
    io.on('connection', (socket) => {
      console.log('Nuevo cliente conectado')
      
      socket.on('message', (msg) => {
        io.emit('message', {
          ...msg,
          timestamp: new Date().toISOString()
        })
      })
      
      socket.on('disconnect', () => {
        console.log('Cliente desconectado')
      })
    })
    
    res.socket.server.io = io
  }
  res.end()
}
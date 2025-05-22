import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body

    try {
      // Verificar credenciales (en producción usa variables de entorno)
      const isAdmin = username === process.env.ADMIN_USER && 
                     await compare(password, process.env.ADMIN_PASSWORD_HASH)

      if (!isAdmin) {
        return res.status(401).json({ message: 'Credenciales inválidas' })
      }

      // Crear token JWT
      const token = sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      res.status(200).json({ 
        token,
        streamConfig: {
          rtmpServer: process.env.NEXT_PUBLIC_RTMP_URL,
          streamKey: process.env.STREAM_KEY
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' })
    }
  } else if (req.method === 'GET') {
    // Verificar token para dashboard
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    try {
      // En producción verificarías el token con jsonwebtoken
      // Esto es solo para demostración
      res.status(200).json({
        rtmpServer: process.env.NEXT_PUBLIC_RTMP_URL,
        streamKey: process.env.STREAM_KEY
      })
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
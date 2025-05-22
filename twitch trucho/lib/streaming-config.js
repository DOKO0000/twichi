export const streamingConfig = {
  rtmpUrl: process.env.NEXT_PUBLIC_RTMP_URL,
  streamUrl: process.env.NEXT_PUBLIC_STREAM_URL,
  streamKey: process.env.STREAM_KEY,
  wsUrl: process.env.NEXT_PUBLIC_WS_URL
}

export const adminConfig = {
  username: process.env.ADMIN_USER,
  passwordHash: process.env.ADMIN_PASSWORD_HASH,
  jwtSecret: process.env.JWT_SECRET
}
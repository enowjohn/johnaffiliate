module.exports = {
  build: {
    output: 'dist',
    env: {
      VITE_API_URL: process.env.VITE_API_URL
    }
  },
  routes: [
    {
      src: '/api/(.*)',
      dest: '/api/$1'
    },
    {
      src: '/(.*)',
      dest: '/index.html'
    }
  ],
  env: {
    VITE_API_URL: process.env.VITE_API_URL
  }
}

// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};

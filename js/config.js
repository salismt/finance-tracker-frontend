// config.js
const config = (() => {
  switch (window.location.hostname) {
    case 'localhost':
      return {
        API_URL: 'http://localhost:3000/',
        FRONTEND_URL: 'http://localhost:8080/',
        NODE_ENV: 'development',
        URL_PREFIX: '/'
      };
    default:
      return {
        API_URL: 'https://finance-tracker-backend-zbxuhg7gpq-as.a.run.app/',
        FRONTEND_URL: 'https://salismt.github.io/finance-tracker-frontend/',
        NODE_ENV: 'production',
        URL_PREFIX: '/'
      };
  }
})();

export default config;

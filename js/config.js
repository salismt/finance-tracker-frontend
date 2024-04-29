// config.js
const config = (() => {
  switch (window.location.hostname) {
    case 'localhost':
      return {
        API_URL: 'http://localhost:3000/',
        NODE_ENV: 'development',
        URL_PREFIX: '/'
      };
    default:
      return {
        API_URL: 'https://finance-tracker-backend-zbxuhg7gpq-as.a.run.app/',
        NODE_ENV: 'production',
        URL_PREFIX: '/'
      };
  }
})();

export default config;

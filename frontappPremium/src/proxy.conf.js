const PROXY_CONFIG = [
  {
    context: [
      "/premiumcalc",
    ],
    target: "http://localhost:5225",
    secure: false,
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;

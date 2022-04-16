const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast","/premiumcalc",
    ],
    target: "http://localhost:5225",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AWRjp2WBzJTaT8BzGLhdf8SX3vV4BNj6YTuwWU8TWw-AHcMgP3xpXESOB99L9_0ZvUzEVg2YcJvWB6YR",
  client_secret: "EHo3p2iuEc8yzJUi2xdbm_1qDrKBS1w12gcSFFu5i21ApHIXQpExDX8arMuCvZBwnUE4xcYufFLrCnVR",
});

module.exports = paypal;

//sb-va1go34760110@personal.example.com
//3tW"*X8X
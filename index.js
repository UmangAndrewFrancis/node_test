const express = require('express');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());

const sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}))
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}))
app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    payment: ['example.com'],
    syncXhr: ["'none'"]
  }
}))

app.get('/', (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
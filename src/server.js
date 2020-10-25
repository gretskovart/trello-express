const { PORT } = require('./common/config');
const app = require('./app');
const { connectDB } = require('./common/db-client');

connectDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

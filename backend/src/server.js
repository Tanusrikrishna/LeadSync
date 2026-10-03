require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);

const webhookRoutes = require('./routes/webhookRoutes');
const { initializeSocket } = require('./socket/socket');
const { startPolling } = require('./services/pollService');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});
app.use('/webhook', webhookRoutes);

initializeSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> {
  console.log(`Server is running on the port ${PORT}`);
  startPolling();
});
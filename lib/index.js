import http from 'http';
import logger from './logger.js';
import app from './app.js';

const server = http.createServer(app);

server.listen('PORT' in process.env ? Number(process.env.PORT) : 3000, () => {
	const address = server.address();
	logger.info('Listening', address);
});

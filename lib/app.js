import { promises as fs } from 'fs';
import path from 'path';
import express from 'express';
import url from 'url';
import { stagesDirectory, pipelineFile } from './config.js';

const directoryName = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

export { app as default };

app.use(express.json());

app.use('/s', express.static(path.resolve(directoryName, '..', 'public')));

async function loadPipeline() {
	return [];
	try {
		const pipelineContent = await fs.readFile(pipelineFile);

		return JSON.parse(pipelineContent);
	} catch (e) {
		if (e.code === 'ENOENT') {
			return [];
		}

		throw e;
	}
}

async function addMissingStages(pipelineContent) {
	const files = await fs.readdir(stagesDirectory);

	const availableChanges = await Promise.all(
		files
			.filter(filename => filename.endsWith('.js'))
			.map(async filename => [
				filename.slice(0, -3),
				await import(path.join(stagesDirectory, filename))
			])
	);

	return Object.fromEntries(availableChanges.map(([stageName, { inputs, output }], i) => [
		stageName,
		{
			inputs,
			output,
			position: { x: 100, y: i * 50 }
		}
	]));
}

app.get('/pipeline', async (req, res, next) => {
	try {
		const currentPipeline = await loadPipeline();

		res.send(await addMissingStages(currentPipeline));
	} catch (e) {
		next(e);
	}
});

const frontendPath = path.resolve(directoryName, '..', 'dist');
app.use('/', express.static(frontendPath));
app.use((req, res, next) => {
	res.sendFile(path.join(frontendPath, 'index.html'), e => {
		if (e) {
			if (e.code === 'ENOENT') {
				res.sendStatus(404);
			} else {
				next(e);
			}
		}
	});
});

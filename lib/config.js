import path from 'path';

export const stagesDirectory = path.resolve(
	process.argv.length > 3
		? process.argv.splice(2, 1)[0]
		: path.resolve(process.cwd(), 'stages')
);

export const pipelineFile = path.resolve(
	process.argv.length > 2
		? process.argv.splice(2, 1)[0]
		: path.resolve(process.cwd(), 'pipeline.json')
);

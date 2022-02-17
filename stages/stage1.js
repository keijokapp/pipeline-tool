export const inputs = 0;

export const output = 'iterator';

export default function stage1() {
	return {
		async next() {
			await new Promise(resolve => { setTimeout(resolve, 1000); });

			return Math.floor(Math.random() * 100000);
		}
	};
}

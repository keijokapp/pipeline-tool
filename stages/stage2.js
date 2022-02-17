export const inputs = 1;

export const output = 'interator';

export default async function stage2(iterator) {
	return {
		async next() {
			const { done, value } = iterator.next();

			if (done) {
				return { done: true };
			}

			return { value: value > 0.5 };
		}
	};
}

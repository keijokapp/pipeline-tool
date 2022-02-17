export const inputs = 1;

export default function stage3(iterator) {
	for (let { done, value } = iterator.next(); !done; { done, value } = iterator.next()) {
		console.log(value);
	}
}

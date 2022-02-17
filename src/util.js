// eslint-disable-next-line import/prefer-default-export
export function mergeRefs(...refs) {
	return value => {
		refs.forEach(ref => {
			if (typeof ref === 'function') {
				ref(value);
			} else {
				ref.current = value;
			}
		});
	};
}

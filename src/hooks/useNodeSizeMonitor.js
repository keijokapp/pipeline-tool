import { useEffect, useState } from 'react';
import useStore from './useStore.js';

export default function useNodeSizeMonitor(id) {
	const [element, setElement] = useState();
	const nodeSizeUpdated = useStore(state => state.nodeSizeUpdated);

	useEffect(() => {
		if (element) {
			const observer = new ResizeObserver(entries => {
				const lastEntry = entries[entries.length - 1];

				nodeSizeUpdated(id, {
					width: lastEntry.contentRect.width,
					height: lastEntry.contentRect.height
				});
			});

			observer.observe(element);

			return () => {
				observer.destroy();
			};
		}
	}, [id, element]);

	return setElement;
}

import {
	useCallback, useEffect, useMemo, useRef
} from 'react';
import useStore from './useStore.js';

export default function useContextMenu() {
	const contextMenu = useStore(state => state.contextMenu);
	const contextMenuChanged = useStore(state => state.contextMenuChanged);
	const id = useMemo(() => { console.log('Generating memo'); return +new Date(); }, []);
	const ref = useRef();

	const set = useCallback(data => {
		contextMenuChanged({ id, data });
	}, []);

	useEffect(() => {
		function keydown(e) {
			if (e.key === 'Escape') {
				contextMenuChanged();
			}
		}

		function mousedown(e) {
			if (!ref.current || !ref.current.contains(e.target)) {
				contextMenuChanged();
			}
		}

		if (contextMenu?.id === id) {
			window.addEventListener('keydown', keydown);
			window.addEventListener('mousedown', mousedown);

			return () => {
				window.removeEventListener('keydown', keydown);
				window.removeEventListener('mousedown', mousedown);
			};
		}
	}, [contextMenu]);

	return [contextMenu?.id === id ? contextMenu.data : undefined, set, ref];
}

import React, { useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import useStore from '../hooks/useStore.js';
import Area from './Area.js';

export default function App() {
	const nodes = useStore(state => state.nodes);
	const setNodes = useStore(state => state.setNodes);

	useEffect(() => {
		fetch('/pipeline')
			.then(response => response.json())
			.then(setNodes);
	}, []);

	const onPipelineChange = useCallback(pipeline => {
		setNodes(pipeline);

		fetch('/pipeline', {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(pipeline)
		});
	}, []);

	return (
		<DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
			{nodes && <Area />}
		</DndProvider>
	);
}

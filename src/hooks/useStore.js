import create from 'zustand';

export default create((set, get) => ({
	edges: {},
	nodeSizes: {},
	handlePositions: {},
	setNodes(nodes) {
		set({ nodes });
	},
	nodePositionUpdated(id, position) {
		const { nodes } = get();

		console.assert(id in nodes);

		set({ nodes: { ...nodes, [id]: { ...nodes[id], position } } });
	},
	nodeSizeUpdated(id, size) {
		const { nodeSizes } = get();

		set({
			nodeSizes: {
				...nodeSizes,
				[id]: size
			}
		});
	},
	handlePositionUpdated(nodeId, handleId, position) {
		const { handlePositions } = get();

		set({
			handlePositions: {
				...handlePositions,
				[nodeId]: {
					...handlePositions[nodeId] ?? {},
					[handleId]: position
				}
			}
		});
	},
	edgeConnected(edgeId, sourceId, sourceHandleId, targetId, targetHandleId) {
		if (sourceId === targetId
			|| (sourceHandleId === 'output' && targetHandleId === 'output')
			|| (sourceHandleId !== 'output' && targetHandleId !== 'output')) {
			return;
		}

		if (targetHandleId === 'output') {
			[sourceId, targetId] = [targetId, sourceId];
			[sourceHandleId, targetHandleId] = [targetHandleId, sourceHandleId];
		}

		const { nodes, edges } = get();

		const source = nodes[sourceId];
		const target = nodes[targetId];

		const inputId = +targetHandleId.match(/^input([0-9]+)$/)[1];
		console.assert(source && target);
		console.assert(source.output && target.inputs && target.inputs.length > inputId);

		const id = edgeId ?? `${targetId}_${inputId}`;

		console.log('edgeConnected', id, sourceId, targetId, sourceHandleId, targetHandleId);

		set({
			edges: {
				...edges,
				[id]: {
					sourceId, targetId, sourceHandleId, targetHandleId
				}
			}
		});
	},
	edgeDeleted(nodeId, handleId) {
		const { edges } = get();

		const m = handleId.match(/^input([0-9]+)$/);

		if (!m) {
			return;
		}

		const inputId = +m[1];
		const edgeId = `${nodeId}_${inputId}`;

		const newEdges = { ...edges };

		delete newEdges[edgeId];

		set({
			edges: newEdges
		});
	},
	contextMenuChanged(contextMenu) {
		set({ contextMenu });
	}
}));

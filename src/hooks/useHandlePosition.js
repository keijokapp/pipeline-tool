import useStore from './useStore.js';

export default function useHandlePosition(nodeId, handleId) {
	const position = useStore(state => state.handlePositions[nodeId]?.[handleId]);

	return position;
}

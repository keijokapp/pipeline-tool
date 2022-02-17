import useStore from './useStore.js';

export default function useNodePosition(nodeId) {
	const position = useStore(state => state.nodes[nodeId].position);

	return position;
}

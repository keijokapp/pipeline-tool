import useStore from './useStore.js';

export default function useNodeSize(nodeId) {
	const size = useStore(state => state.nodeSizes[nodeId]);

	return size;
}

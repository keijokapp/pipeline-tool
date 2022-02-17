import useStore from './useStore.js';

export default function useEdge(edgeId) {
	return useStore(state => state.edges[edgeId]);
}

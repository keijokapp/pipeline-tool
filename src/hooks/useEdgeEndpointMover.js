import { useDrag } from 'react-dnd';
import useEdge from './useEdge.js';

export default function useEdgeEndpointMover(edgeId, nodeId, handleId) {
	const edge = useEdge(edgeId);

	const [otherNodeId, otherHandleId] = edge.sourceId === nodeId && edge.sourceHandleId === handleId
		? [edge.targetId, edge.targetHandleId]
		: [edge.sourceId, edge.sourceHandleId];

	const [, dragRef] = useDrag({
		type: 'handle',
		item: { edgeId, nodeId: otherNodeId, handleId: otherHandleId }
	});

	return dragRef;
}

import React from 'react';
import useEdge from '../hooks/useEdge.js';
import useEdgeEndpointMover from '../hooks/useEdgeEndpointMover.js';
import useHandlePosition from '../hooks/useHandlePosition.js';

export default function Edge({ id }) {
	const {
		sourceId, targetId, sourceHandleId, targetHandleId
	} = useEdge(id);
	const sourceHandlePosition = useHandlePosition(sourceId, sourceHandleId);
	const targetHandlePosition = useHandlePosition(targetId, targetHandleId);

	const edgeSourceMoverRef = useEdgeEndpointMover(id, sourceId, sourceHandleId);
	const edgeTargetMoverRef = useEdgeEndpointMover(id, targetId, targetHandleId);

	return (
		<>
			<line
				x1={sourceHandlePosition.x}
				y1={sourceHandlePosition.y}
				x2={targetHandlePosition.x}
				y2={targetHandlePosition.y}
				stroke="black"
				markerEnd="url(#arrow-head)"
			/>
			<circle
				ref={edgeSourceMoverRef}
				style={{ cursor: 'move' }}
				cx={sourceHandlePosition.x + 5}
				cy={sourceHandlePosition.y}
				r={5}
				stroke="transparent"
				fill="transparent"
			/>
			<circle
				ref={edgeTargetMoverRef}
				style={{ cursor: 'move' }}
				cx={targetHandlePosition.x - 5}
				cy={targetHandlePosition.y}
				r={5}
				stroke="transparent"
				fill="transparent"
			/>
		</>
	);
}

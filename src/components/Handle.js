import React from 'react';
import styled from 'styled-components';
import useHandle from '../hooks/useHandle.js';
import useHandlePositionMonitor from '../hooks/useHandlePositionMonitor.js';

const IOEffectArea = styled.div`
	padding: 0.3em 0.25em;
	margin: 0.2em -0.25em;
`;

const IO = styled.div`
	border-radius: 50%;
	outline: 2px solid white;
	z-index: 9;
	background-color: #2659ff;
	width: 6px;
	height: 6px;
`;

export default function Handle({ nodeId, handleId }) {
	const handleRef = useHandle(nodeId, handleId);

	const positionMonitor = useHandlePositionMonitor(nodeId, handleId);

	return (
		<IOEffectArea ref={handleRef}>
			<IO ref={positionMonitor} />
		</IOEffectArea>
	);
}

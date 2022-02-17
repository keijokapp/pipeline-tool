import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import useNodePosition from '../hooks/useNodePosition.js';
import useNodeSizeMonitor from '../hooks/useNodeSizeMonitor.js';
import Handle from './Handle.js';

const IOContainer = styled.div`
	position: absolute;
	display: flex,
	flex-direction: column;
`;

const InputsContainer = styled(IOContainer)`
	left: -2.5px;
`;

const OutputsContainer = styled(IOContainer)`
	right: -2.5px;
`;

const Content = styled.div`
	border: 1px solid #5ed6e8;
	border-radius: 5px;
	font-size: 2em;
	font-weight: bold;
	padding: 0.15em 0.5em;
	cursor: grab;
	box-sizing: border-box;
`;

const WindowWrap = styled.div`
	display: inline-flex;
	align-items: center;
	position: absolute;
	left: ${({ position: { x } }) => `${x}px`};
	top: ${({ position: { y } }) => `${y}px`};
	white-space: nowrap;
	opacity: ${({ isDragging }) => isDragging ? 0.5 : 1}
`;

export default function Node({ id, inputs = [], output }) {
	const position = useNodePosition(id);

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: 'window',
		item: { id },
		collect(monitor) {
			return {
				isDragging: monitor.isDragging()
			};
		}
	}), []);

	const sizeMonitor = useNodeSizeMonitor(id);

	return (
		<WindowWrap ref={sizeMonitor} position={position} isDragging={isDragging}>
			<InputsContainer>
				{Array.from({ length: inputs }).map((_, i) => <Handle key={i} nodeId={id} handleId={`input${i}`} />)}
			</InputsContainer>
			<Content ref={dragRef}>
				{id}
			</Content>
			<OutputsContainer>
				{output != null && <Handle nodeId={id} handleId="output" />}
			</OutputsContainer>
		</WindowWrap>
	);
}

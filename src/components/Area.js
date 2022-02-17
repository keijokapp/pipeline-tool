import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import useStore from '../hooks/useStore.js';
import Node from './Node.js';
import Edge from './Edge.js';
import ContextMenu from './ContextMenu.js';
import useContextMenu from '../hooks/useContextMenu.js';

const AreaWrap = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: relative;
`;

const ContextMenuWrap = styled.div`
	display: inline-block;
	position: absolute;
	left: ${({ position }) => position.x}px;
	top: ${({ position }) => position.y}px;
`;

const contextMenuItems = [
	'item 1',
	'item 2',
	'item 3'
];

export default function Area() {
	const nodes = useStore(state => state.nodes);
	const edges = useStore(state => state.edges);
	const nodePositionUpdated = useStore(state => state.nodePositionUpdated);
	const edgeDeleted = useStore(state => state.edgeDeleted);
	const [contextMenu, setContextMenu, contextMenuRef] = useContextMenu();

	const [, areaRef] = useDrop({
		accept: ['window', 'handle'],
		drop(item, monitor) {
			// TODO: cannot set multiple drop handlers for a single element
			switch (monitor.getItemType()) {
			case 'window': {
				const { id } = item;
				const delta = monitor.getDifferenceFromInitialOffset();
				const { position } = nodes[id];
				const x = position.x + delta.x;
				const y = position.y + delta.y;

				nodePositionUpdated(id, { x, y });
				break;
			}
			case 'handle': {
				if (!monitor.didDrop()) {
					edgeDeleted(item.nodeId, item.handleId);
				}
			}
			}
		}
	});

	return (
		<AreaWrap
			ref={areaRef}
			onContextMenu={e => {
				e.preventDefault();
				setContextMenu({ x: e.pageX, y: e.pageY });
			}}
		>
			<svg
				style={{
					position: 'absolute', width: '100%', height: '100%', left: 0, top: 0
				}}
			>
				<defs>
					<marker
						id="arrow-head"
						viewBox="0 0 10 10"
						refX="10"
						refY="5"
						markerUnits="strokeWidth"
						markerWidth="10"
						markerHeight="10"
						orient="auto"
					>
						<path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
					</marker>
				</defs>
				{
					Object.keys(edges).map(id => (
						<Edge key={id} id={id} />
					))
				}
			</svg>
			{
				Object.entries(nodes).map(([id, { inputs, output }]) => (
					<Node key={id} id={id} inputs={inputs} output={output}>{id}</Node>
				))
			}
			{contextMenu && (
				<ContextMenuWrap ref={contextMenuRef} position={contextMenu}>
					<ContextMenu items={contextMenuItems} />
				</ContextMenuWrap>
			)}
		</AreaWrap>
	);
}

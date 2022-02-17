import { useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import useStore from './useStore.js';
import { mergeRefs } from '../util.js';

export default function useHandle(nodeId, handleId) {
	const edgeConnected = useStore(state => state.edgeConnected);

	const [, dragRef] = useDrag({
		type: 'handle',
		item: { nodeId, handleId }
	});

	const [, dropRef] = useDrop({
		accept: 'handle',
		drop(item) {
			edgeConnected(item.edgeId, item.nodeId, item.handleId, nodeId, handleId);
		}
	});

	const inputRef = useMemo(
		() => mergeRefs(dragRef, dropRef),
		[dragRef, dropRef]
	);

	return inputRef;
}

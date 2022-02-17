import { useEffect, useState } from 'react';
import useNodePosition from './useNodePosition.js';
import useNodeSize from './useNodeSize.js';
import useStore from './useStore.js';

export default function useHandlePositionMonitor(nodeId, handleId) {
	const nodePosition = useNodePosition(nodeId);
	const nodeSize = useNodeSize(nodeId);
	const [element, setElement] = useState();
	const handlePositionUpdated = useStore(state => state.handlePositionUpdated);

	useEffect(() => {
		if (element) {
			const rect = element.getBoundingClientRect();

			handlePositionUpdated(nodeId, handleId, {
				x: (rect.left + rect.right) / 2,
				y: (rect.top + rect.bottom) / 2
			});
		}
	}, [nodeId, handleId, nodePosition, nodeSize, element]);

	return setElement;
}

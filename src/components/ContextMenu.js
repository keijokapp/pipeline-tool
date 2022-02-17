import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	z-index: 999;
	width: 100%;
	border: 1px solid #a6a6a6;
	padding: 0px 2px;
	border-radius: 5px;
	box-sizing: border-box;
	background-color: white;
	white-space: nowrap;
`;

const Item = styled.div`
	width: 100%;
	border-radius: 2px;
	box-sizing: border-box;
	margin: 2px 0px;
	padding: 0.3em 1.2em;

	&:hover {
		background-color: #ededff
	}
`;

export default function ContextMenu({ items }) {
	return (
		<Container>
			{items.map((item, i) => (
				<Item key={i}>{item}</Item>
			))}
		</Container>
	);
}

/* eslint-disable no-unused-vars */
/* global document */
import { performance } from 'perf_hooks';
import React, { useState, useEffect } from 'react';
import ReactReconciler from 'react-reconciler';
import util from 'util';

function traceWrap(hostConfig) {
	const traceWrappedHostConfig = {};
	Object.keys(hostConfig).map(key => {
		const func = hostConfig[key];
		traceWrappedHostConfig[key] = (...args) => {
			// console.trace(key);
			console.error('Called', key);
			return func(...args);
		};
	});
	return traceWrappedHostConfig;
}

const hostConfig = {
	supportsMutation: true,
	createInstance(type, props, rootContainer, hostContext, internalHandle) {
		return {
			type,
			props: { ...props },
			children: [],
			visible: true
		};
	},
	createTextInstance(text) {
		return {
			text,
			visible: true
		};
	},
	appendInitialChild(parent, child) {
		parent.children.push(child);
	},
	finalizeInitialChildren(instance, type, props, rootContainer, hostContext) {},
	prepareUpdate(instance, type, oldProps, newProps, rootContainer, hostContext) {
		return true;
	},
	shouldSetTextContent(type, props) {
		return false;
	},
	getRootHostContext(rootContainer) { return null; },
	getChildHostContext(parentHostContext, type, rootContainer) { return parentHostContext; },
	getPublicInstance(instance) { return instance; },
	prepareForCommit(containerInfo) { return null; },
	resetAfterCommit(containerInfo) {},
	preparePortalMount(containerInfo) {},
	now: performance.now,
	// scheduleTimeout: setTimeout,
	// cancelTimeout: clearTimeout,
	// noTimeout: null,
	isPrimaryRenderer: false,

	appendChild(parent, child) {
		parent.children.push(child);
	},
	appendChildToContainer(parent, child) {
		parent.children.push(child);
	},
	// insertBefore(parentInstance, child, beforeChild) {},
	// insertInContainerBefore(container, child, beforeChild) {},
	removeChild(parentInstance, child) {
		parentInstance.removeChild(child);
	},
	removeChildFromContainer(parentInstance, child) {
		parentInstance.removeChild(child);
	},
	// resetTextContent(instance) {}
	commitTextUpdate(textInstance, prevText, nextText) {
		textInstance.text = nextText;
	},
	// commitMount(instance, type, props, internalHandle) {},

	commitUpdate(instance, updatePayload, type, prevProps, nextProps, internalHandle) {
		Object.assign(instance.props, nextProps);
	},
	hideInstance(instance) {
		instance.visible = false;
	},
	hideTextInstance(textInstance) {
		textInstance.visible = false;
	},
	unhideInstance(instance, props) {
		instance.visible = true;
	},
	unhideTextInstance(textInstance, text) {
		textInstance.visible = true;
	},
	clearContainer(container) {} // TODO
};

const ReactReconcilerInst = ReactReconciler(traceWrap(hostConfig));

const CustomRenderer = {
	render(reactElement, domElement, callback) {
		if (!domElement._rootContainer) {
			domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
		}

		return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
	}
};

export default CustomRenderer;

function Koer() {
	const [shit, setShit] = useState(0);

	useEffect(() => {
		console.log('running effect');
		const s = setTimeout(() => setShit(shit + 1), 1000);

		return () => {
			clearTimeout(s);
		};
	}, [shit]);

	return React.createElement('koer', { shit });
}

const root = { children: [] };

CustomRenderer.render(React.createElement('sitah2da', { koer: { a: 3 } }, [React.createElement(Koer)]), root);

setTimeout(() => {
	console.log(util.inspect(root.children, { depth: Infinity, colors: true }));
}, 1000);


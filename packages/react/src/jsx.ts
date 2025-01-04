import { Key } from './../../../.history/packages/shared/ReactTypes_20250104162455';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { Type, Key, Ref, Props, ReactElement } from 'shared/ReactElementType';
import { ElementType } from '../../shared/ReactTypes';

/**
 * @des 一个创建 React 元素的工厂方法。它接受多个参数，包括 type、key、ref 和 props，并返回一个表示 React 元素的对象。
 * @param {string} type - React 元素的类型。
 * @param {string} key - 用于标识元素的唯一键。
 * @param {string} ref - 元素的引用。
 * @param {object} props - 元素的属性。
 * @returns {object} React 元素对象。
 */
export const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__author: 'zono'
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...children: any) => {
	// 单独处理两个特殊的属性
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	// 处理 config 对象
	for (const prop in config) {
		const value = config[prop]; // 属性值
		// key 属性
		if (prop === 'key') {
			if (value !== undefined) {
				key = '' + value;
			}
			continue;
		}
		// ref 属性
		if (prop === 'ref') {
			if (value !== undefined) {
				ref = value;
			}
			continue;
		}
		// 其他属性,如果是对象的自有属性,则添加到 props 对象中
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = value;
		}
	}

	// 处理 children,如果只有一个子元素,则直接赋值给 props.children,否则赋值为数组
	if (children.length === 1) {
		props.children = children[0];
	} else if (children.length > 1) {
		props.children = children;
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx; // 实际React包中，实现不同，会有一些代码检测逻辑

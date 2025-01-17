import { Container } from 'hostConfig';
import { Flags, NoFlags } from './fiberFlags';
import { WorkTag } from './workTags';
import { Ref, Props, Key } from 'shared/ReactTypes';

export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null; // 用于双缓存技术,链接到上一次的FiberNode
	flags: Flags; // 副作用,标记
	updateQueue: unknown; // 更新队列

	/**
	 * @description 标记当前节点的类型
	 * @param {type}
	 * @param {tag}
	 * @param {Props}pendingProps 接下来有哪些props需要更新
	 * @param {Key}key 对应ReactElement的key
	 * @returns
	 * */
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key;
		// HostComponent <div> div DOM
		this.stateNode = null;
		// FunctionComponent () => {}
		this.type = null;
		// 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;
		this.ref = null;
		// 作为工作单元
		this.pendingProps = pendingProps; //工作单元刚开始的时候，pendingProps是真实的props
		this.memoizedProps = null; //工作完成之后，新的props
		this.memoizedState = null; //工作完成之后，新的state
		this.updateQueue = null; //更新队列
		this.alternate = null;

		// 副作用
		this.flags = NoFlags;
	}
}
/** @des fiber挂载节点的根节点，current连接*/
export class FiberRootNode {
	// 用于挂载的节点
	container: Container; //用于连接真实DOM
	current: FiberNode; //指向hostRootFiber
	finishedWork: FiberNode | null; //指向更新完成的hostRootFiber
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
) => {
	let wip = current.alternate;
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;
		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;
	return wip;
};

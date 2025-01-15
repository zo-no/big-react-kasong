import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
/** @des 按照node规范，打包到dist/node_modules下，这样可以直接被node引用*/
const distPath = path.resolve(__dirname, '../../dist/node_modules');

/**
 * @des 获取将被打包的包的pkg.json路径
 * @param {string}pkgName 包名
 * @param {boolean} isDist 是否是打包后的路径
 * @returns
 * */
export const resolvePkgPath = (pkgName, isDist = false) => {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
};

/** @des 获取包的package.json*/
export const getPackageJSON = (pkgName) => {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, 'utf-8');
	return JSON.parse(str);
};

/** @des 获取rollup的plugin的通用方法*/
export const getBaseRollupPlugins = (typescript = {}) => {
	return [cjs(), ts()];
};

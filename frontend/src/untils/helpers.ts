import { Matrix } from '../types';

/**
 * 检查字符串是否为有效数字
 */
export const isValidNumber = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};

/**
 * 将字符串数组转换为数字数组
 */
export const parseNumberArray = (values: string[]): number[] => {
  return values.map(value => parseFloat(value));
};

/**
 * 验证矩阵是否有效（所有行长度相同）
 */
export const isValidMatrix = (matrix: Matrix): boolean => {
  if (matrix.length === 0) return false;
  
  const rowLength = matrix[0].length;
  return matrix.every(row => row.length === rowLength);
};

/**
 * 创建指定大小的空矩阵
 */
export const createEmptyMatrix = (rows: number, cols: number): Matrix => {
  return Array(rows).fill(0).map(() => Array(cols).fill(0));
};

/**
 * 格式化数字，限制小数位数
 */
export const formatNumber = (value: number, decimals: number = 4): string => {
  return value.toFixed(decimals);
};

/**
 * 解析CSV文本为数字数组
 */
export const parseCSV = (text: string): number[] => {
  return text.split(',')
    .map(item => item.trim())
    .filter(item => isValidNumber(item))
    .map(item => parseFloat(item));
};

/**
 * 解析多行文本为数字数组
 */
export const parseMultilineText = (text: string): number[] => {
  return text.split(/[\n\r,\s]+/)
    .map(item => item.trim())
    .filter(item => isValidNumber(item))
    .map(item => parseFloat(item));
}; 
// 基本运算类型
export type BasicOperation = 'add' | 'subtract' | 'multiply' | 'divide' | 'power';

// 统计运算类型
export type StatisticalOperation = 'mean' | 'median' | 'std_dev';

// 矩阵运算类型
export type MatrixOperation = 'multiply' | 'transpose' | 'determinant';

// 矩阵类型
export type Matrix = number[][];

// 错误状态类型
export interface ErrorState {
  hasError: boolean;
  message: string;
}

// 加载状态类型
export interface LoadingState {
  isLoading: boolean;
} 
import axios from 'axios';

// API基础URL
const API_BASE_URL = 'http://localhost:8000/api';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 接口类型定义
export interface BasicOperationRequest {
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power';
  a: number;
  b: number;
}

export interface BasicOperationResponse {
  result: number;
}

export interface StatisticalRequest {
  operation: 'mean' | 'median' | 'std_dev';
  values: number[];
}

export interface StatisticalResponse {
  result: number;
}

export interface MatrixOperationRequest {
  operation: 'multiply' | 'transpose' | 'determinant';
  matrix_a: number[][];
  matrix_b?: number[][];
}

export interface MatrixResponse {
  result: number[][] | number;
}

export interface RegressionRequest {
  x: number[];
  y: number[];
}

export interface RegressionResponse {
  slope: number;
  intercept: number;
  predictions: number[];
  r_squared: number;
}

// API服务类
export const calculatorApi = {
  // 基本运算
  basicOperation: async (data: BasicOperationRequest): Promise<BasicOperationResponse> => {
    const response = await api.post<BasicOperationResponse>('/basic', data);
    return response.data;
  },

  // 统计计算
  statisticalCalculation: async (data: StatisticalRequest): Promise<StatisticalResponse> => {
    const response = await api.post<StatisticalResponse>('/stats', data);
    return response.data;
  },

  // 矩阵运算
  matrixOperation: async (data: MatrixOperationRequest): Promise<MatrixResponse> => {
    const response = await api.post<MatrixResponse>('/matrix', data);
    return response.data;
  },

  // 线性回归
  linearRegression: async (data: RegressionRequest): Promise<RegressionResponse> => {
    const response = await api.post<RegressionResponse>('/regression', data);
    return response.data;
  },
}; 
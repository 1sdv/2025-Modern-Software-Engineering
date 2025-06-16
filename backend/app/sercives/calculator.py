from typing import List, Dict, Any, Tuple
import numpy as np
import cpp_calculator as calc
from backend.app.core.errors import CalculationError, MatrixError, StatisticalError, RegressionError


class CalculatorService:
    """计算器服务类，封装对C++计算模块的调用"""
    
    @staticmethod
    def basic_operation(operation: str, a: float, b: float) -> float:
        """执行基本数学运算
        
        Args:
            operation: 运算类型 ('add', 'subtract', 'multiply', 'divide', 'power')
            a: 第一个操作数
            b: 第二个操作数
            
        Returns:
            float: 计算结果
            
        Raises:
            CalculationError: 计算错误
        """
        try:
            if operation == "add":
                return calc.add(a, b)
            elif operation == "subtract":
                return calc.subtract(a, b)
            elif operation == "multiply":
                return calc.multiply(a, b)
            elif operation == "divide":
                if b == 0:
                    raise CalculationError("除数不能为零")
                return calc.divide(a, b)
            elif operation == "power":
                return calc.power(a, b)
            else:
                raise CalculationError(f"不支持的运算: {operation}")
        except Exception as e:
            raise CalculationError(f"计算错误: {str(e)}")
    
    @staticmethod
    def statistical_calculation(operation: str, values: List[float]) -> float:
        """执行统计计算
        
        Args:
            operation: 统计运算类型 ('mean', 'median', 'std_dev')
            values: 数据集
            
        Returns:
            float: 计算结果
            
        Raises:
            StatisticalError: 统计计算错误
        """
        try:
            if operation == "mean":
                return calc.mean(values)
            elif operation == "median":
                return calc.median(values)
            elif operation == "std_dev":
                return calc.std_dev(values)
            else:
                raise StatisticalError(f"不支持的统计运算: {operation}")
        except Exception as e:
            raise StatisticalError(f"统计计算错误: {str(e)}")
    
    @staticmethod
    def matrix_operation(operation: str, matrix_a: List[List[float]], matrix_b: List[List[float]] = None) -> Any:
        """执行矩阵运算
        
        Args:
            operation: 矩阵运算类型 ('multiply', 'transpose', 'determinant')
            matrix_a: 矩阵A
            matrix_b: 矩阵B (仅乘法需要)
            
        Returns:
            Any: 计算结果 (矩阵或标量)
            
        Raises:
            MatrixError: 矩阵计算错误
        """
        try:
            if operation == "multiply":
                if matrix_b is None:
                    raise MatrixError("矩阵乘法需要提供第二个矩阵")
                return calc.matrix_multiply(matrix_a, matrix_b)
            elif operation == "transpose":
                return calc.matrix_transpose(matrix_a)
            elif operation == "determinant":
                if len(matrix_a) != len(matrix_a[0]):
                    raise MatrixError("计算行列式需要方阵")
                return calc.matrix_determinant(matrix_a)
            else:
                raise MatrixError(f"不支持的矩阵运算: {operation}")
        except Exception as e:
            raise MatrixError(f"矩阵计算错误: {str(e)}")
    
    @staticmethod
    def regression_analysis(x: List[float], y: List[float]) -> Dict[str, Any]:
        """执行线性回归分析
        
        Args:
            x: 自变量数据
            y: 因变量数据
            
        Returns:
            Dict: 包含斜率、截距、预测值和决定系数的字典
            
        Raises:
            RegressionError: 回归分析错误
        """
        try:
            # 调用C++模块进行线性回归计算
            result = calc.linear_regression(x, y)
            
            # 解包结果
            slope = result[0]
            intercept = result[1]
            
            # 计算预测值
            predictions = [slope * xi + intercept for xi in x]
            
            # 计算决定系数 R²
            y_mean = sum(y) / len(y)
            ss_total = sum((yi - y_mean) ** 2 for yi in y)
            ss_residual = sum((yi - (slope * xi + intercept)) ** 2 for xi, yi in zip(x, y))
            r_squared = 1 - (ss_residual / ss_total) if ss_total != 0 else 0
            
            return {
                "slope": slope,
                "intercept": intercept,
                "predictions": predictions,
                "r_squared": r_squared
            }
        except Exception as e:
            raise RegressionError(f"回归分析错误: {str(e)}")


# 创建服务实例
calculator_service = CalculatorService() 
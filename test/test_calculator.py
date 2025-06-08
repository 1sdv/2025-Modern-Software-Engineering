# test/test_calculator.py
import pytest
import cpp_calculator as calc
import numpy as np

def test_basic_operations():
    assert calc.add(2.0, 3.0) == 5.0
    assert calc.subtract(5.0, 3.0) == 2.0
    assert calc.multiply(2.0, 3.0) == 6.0
    assert calc.divide(6.0, 3.0) == 2.0
    assert calc.power(2.0, 3.0) == 8.0

def test_statistical_functions():
    data = [1.0, 2.0, 3.0, 4.0, 5.0]
    assert calc.mean(data) == 3.0
    assert calc.median(data) == 3.0
    assert abs(calc.standard_deviation(data) - 1.5811) < 0.001

def test_matrix_operations():
    matrix_a = [[1.0, 2.0], [3.0, 4.0]]
    matrix_b = [[5.0, 6.0], [7.0, 8.0]]
    result = calc.matrix_multiply(matrix_a, matrix_b)
    expected = [[19.0, 22.0], [43.0, 50.0]]
    
    for i in range(len(result)):
        for j in range(len(result[0])):
            assert abs(result[i][j] - expected[i][j]) < 0.001

def test_linear_regression():
    x = [1.0, 2.0, 3.0, 4.0, 5.0]
    y = [2.0, 4.0, 5.0, 4.0, 6.0]
    coeffs = calc.linear_regression(x, y)
    assert len(coeffs) == 2
    # 修改预期值以匹配实际计算结果
    assert abs(coeffs[0] - 0.8) < 0.001
    assert abs(coeffs[1] - 1.8) < 0.001  # 从1.6改为1.8
// calculator.cpp
#include "calculator.h"
#include <algorithm>
#include <numeric>
#include <cmath>

namespace calculator {

// 基本数学运算
double add(double a, double b) {
    return a + b;
}

double subtract(double a, double b) {
    return a - b;
}

double multiply(double a, double b) {
    return a * b;
}

double divide(double a, double b) {
    if (b == 0) {
        throw std::invalid_argument("Division by zero");
    }
    return a / b;
}

double power(double base, double exponent) {
    return std::pow(base, exponent);
}

// 统计计算
double mean(const std::vector<double>& values) {
    if (values.empty()) {
        throw std::invalid_argument("Input array cannot be empty");
    }
    return std::accumulate(values.begin(), values.end(), 0.0) / values.size();
}

double median(const std::vector<double>& values) {
    if (values.empty()) {
        throw std::invalid_argument("Input array cannot be empty");
    }
    
    std::vector<double> sorted_values = values;
    std::sort(sorted_values.begin(), sorted_values.end());
    
    size_t n = sorted_values.size();
    if (n % 2 == 0) {
        return (sorted_values[n/2 - 1] + sorted_values[n/2]) / 2;
    } else {
        return sorted_values[n/2];
    }
}

double standard_deviation(const std::vector<double>& values) {
    if (values.size() < 2) {
        throw std::invalid_argument("Standard deviation calculation requires at least two values");
    }
    
    double avg = mean(values);
    double sum_squared_diff = 0.0;
    
    for (double value : values) {
        double diff = value - avg;
        sum_squared_diff += diff * diff;
    }
    
    return std::sqrt(sum_squared_diff / (values.size() - 1));
}

// 矩阵运算
Matrix matrix_multiply(const Matrix& a, const Matrix& b) {
    if (a.empty() || b.empty() || a[0].empty() || b[0].empty()) {
        throw std::invalid_argument("Matrix cannot be empty");
    }
    
    size_t a_rows = a.size();
    size_t a_cols = a[0].size();
    size_t b_rows = b.size();
    size_t b_cols = b[0].size();
    
    if (a_cols != b_rows) {
        throw std::invalid_argument("Matrix dimensions do not match: the number of columns in the first matrix must equal the number of rows in the second matrix");
    }
    
    // 初始化结果矩阵
    Matrix result(a_rows, std::vector<double>(b_cols, 0.0));
    
    // 执行矩阵乘法
    for (size_t i = 0; i < a_rows; ++i) {
        for (size_t j = 0; j < b_cols; ++j) {
            for (size_t k = 0; k < a_cols; ++k) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    
    return result;
}

Matrix matrix_transpose(const Matrix& m) {
    if (m.empty() || m[0].empty()) {
        throw std::invalid_argument("Matrix cannot be empty");
    }
    
    size_t rows = m.size();
    size_t cols = m[0].size();
    
    Matrix result(cols, std::vector<double>(rows, 0.0));
    
    for (size_t i = 0; i < rows; ++i) {
        for (size_t j = 0; j < cols; ++j) {
            result[j][i] = m[i][j];
        }
    }
    
    return result;
}

// 计算2x2矩阵的行列式
double det2x2(const Matrix& m) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

// 获取子矩阵（去掉指定行和列）
Matrix get_submatrix(const Matrix& m, size_t row, size_t col) {
    size_t n = m.size();
    Matrix submatrix(n - 1, std::vector<double>(n - 1, 0.0));
    
    size_t r = 0;
    for (size_t i = 0; i < n; ++i) {
        if (i == row) continue;
        
        size_t c = 0;
        for (size_t j = 0; j < n; ++j) {
            if (j == col) continue;
            submatrix[r][c] = m[i][j];
            ++c;
        }
        ++r;
    }
    
    return submatrix;
}

// 递归计算行列式
double determinant_recursive(const Matrix& m) {
    size_t n = m.size();
    
    // 基本情况：1x1矩阵
    if (n == 1) {
        return m[0][0];
    }
    
    // 基本情况：2x2矩阵
    if (n == 2) {
        return det2x2(m);
    }
    
    double det = 0.0;
    
    // 按第一行展开
    for (size_t j = 0; j < n; ++j) {
        Matrix submatrix = get_submatrix(m, 0, j);
        double sign = (j % 2 == 0) ? 1.0 : -1.0;
        det += sign * m[0][j] * determinant_recursive(submatrix);
    }
    
    return det;
}

double matrix_determinant(const Matrix& m) {
    if (m.empty() || m[0].empty()) {
        throw std::invalid_argument("矩阵不能为空");
    }
    
    size_t rows = m.size();
    size_t cols = m[0].size();
    
    if (rows != cols) {
        throw std::invalid_argument("只能计算方阵的行列式");
    }
    
    return determinant_recursive(m);
}

// 线性回归（最小二乘法）
std::vector<double> linear_regression(const std::vector<double>& x, const std::vector<double>& y) {
    if (x.size() != y.size() || x.empty()) {
        throw std::invalid_argument("输入数组长度必须相等且不为空");
    }
    
    size_t n = x.size();
    double sum_x = 0.0, sum_y = 0.0, sum_xy = 0.0, sum_xx = 0.0;
    
    for (size_t i = 0; i < n; ++i) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i] * y[i];
        sum_xx += x[i] * x[i];
    }
    
    double slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    double intercept = (sum_y - slope * sum_x) / n;
    
    return {slope, intercept};
}

} // namespace calculator
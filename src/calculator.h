// calculator.h
#pragma once
#include <vector>
#include <stdexcept>
#include <cmath>

namespace calculator {

// 基本数学运算
double add(double a, double b);
double subtract(double a, double b);
double multiply(double a, double b);
double divide(double a, double b);
double power(double base, double exponent);

// 统计计算
double mean(const std::vector<double>& values);
double median(const std::vector<double>& values);
double standard_deviation(const std::vector<double>& values);

// 矩阵运算
using Matrix = std::vector<std::vector<double>>;
Matrix matrix_multiply(const Matrix& a, const Matrix& b);
Matrix matrix_transpose(const Matrix& m);
double matrix_determinant(const Matrix& m);

// 高级计算
std::vector<double> linear_regression(const std::vector<double>& x, const std::vector<double>& y);

} // namespace calculator
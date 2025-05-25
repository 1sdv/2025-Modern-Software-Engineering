// binding.cpp
#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include "calculator.h"

namespace py = pybind11;

PYBIND11_MODULE(cpp_calculator, m) {
    m.doc() = "C++ calculation module providing high-performance math and statistical functions";
    
    // Basic math operations
    m.def("add", &calculator::add, "Addition of two numbers", py::arg("a"), py::arg("b"));
    m.def("subtract", &calculator::subtract, "Subtraction of two numbers", py::arg("a"), py::arg("b"));
    m.def("multiply", &calculator::multiply, "Multiplication of two numbers", py::arg("a"), py::arg("b"));
    m.def("divide", &calculator::divide, "Division of two numbers", py::arg("a"), py::arg("b"));
    m.def("power", &calculator::power, "Power calculation", py::arg("base"), py::arg("exponent"));
    
    // Statistical calculations
    m.def("mean", &calculator::mean, "Calculate mean value", py::arg("values"));
    m.def("median", &calculator::median, "Calculate median value", py::arg("values"));
    m.def("standard_deviation", &calculator::standard_deviation, "Calculate standard deviation", py::arg("values"));
    
    // Matrix operations
    m.def("matrix_multiply", &calculator::matrix_multiply, "Matrix multiplication", py::arg("a"), py::arg("b"));
    m.def("matrix_transpose", &calculator::matrix_transpose, "Matrix transpose", py::arg("m"));
    m.def("matrix_determinant", &calculator::matrix_determinant, "Calculate matrix determinant", py::arg("m"));
    
    // Advanced calculations
    m.def("linear_regression", &calculator::linear_regression, 
          "Linear regression, returns [slope, intercept]", py::arg("x"), py::arg("y"));
}
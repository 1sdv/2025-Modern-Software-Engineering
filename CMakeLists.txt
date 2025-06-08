# CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(cpp_calculator)

# 设置C++标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 查找pybind11
find_package(pybind11 REQUIRED)

# 添加源文件
set(SOURCES
    src/calculator.cpp
)

# 创建Python模块
pybind11_add_module(cpp_calculator ${SOURCES} src/binding.cpp)
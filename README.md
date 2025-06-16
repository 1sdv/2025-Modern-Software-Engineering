<div align="center">

# 🧮 高性能计算器应用

</div>
<div align="center">

![C++](https://img.shields.io/badge/C++-17-blue.svg?style=for-the-badge&logo=c%2B%2B)
![Python](https://img.shields.io/badge/Python-3.8+-blue.svg?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18.x-blue.svg?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-blue.svg?style=for-the-badge&logo=fastapi)

</div>


<p align="center">
  一个基于C++、Python和TypeScript的高性能计算器应用，采用三层架构设计，提供强大的数学和统计计算功能。
</p>

<div align="center">


[特性](#特性) •
[架构](#架构) •
[安装](#安装) •
[使用](#使用) •
[API文档](#api文档) •
[贡献](#贡献) •
[许可证](#许可证)

</div>


## ✨ 特性

- **🔢 基本数学运算**
  - 加、减、乘、除、幂运算
  - 高精度计算

- **📈 统计计算**
  - 平均值、中位数
  - 标准差
  - 数据分析

- **🧩 矩阵运算**
  - 矩阵乘法
  - 矩阵转置
  - 行列式计算

- **📊 线性回归分析**
  - 最小二乘法拟合
  - 数据可视化

### 项目结构

```
├── src/                    # C++计算模块源代码
│   ├── calculator.cpp      # 计算函数实现
│   ├── calculator.h        # 头文件
│   └── binding.cpp         # Python绑定
├── backend/                # Python后端API
│   ├── app/                # 应用代码
│   │   ├── api/            # API路由
│   │   ├── core/           # 核心配置和错误处理
│   │   └── services/       # 服务层
│   └── requirements.txt    # 依赖项
├── frontend/               # TypeScript前端
│   ├── public/             # 静态资源
│   ├── src/                # 源代码
│   │   ├── components/     # UI组件
│   │   ├── services/       # API服务
│   │   ├── types/          # 类型定义
│   │   └── utils/          # 工具函数
│   ├── package-lock.json   # 依赖项
│   └── tsconfig.json       # TypeScript配置
├── test/                   # 测试文件
│   └── test_calculator.py  # 计算模块测试
├── setup.py                # C++模块构建脚本
└── CMakeLists.txt          # CMake配置
```

## 🚀 安装

### 先决条件

- **Python 3.8+**：用于运行后端和C++模块
- **Node.js和npm**：用于运行前端
  - 可以从[Node.js官网](https://nodejs.org/)下载安装包
  - 安装完成后，在命令行中运行`node -v`和`npm -v`验证安装是否成功

### 1. 克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/high-performance-calculator.git
cd high-performance-calculator
```

### 2. 安装C++计算模块

```bash
# 安装C++模块
pip install -e .
```

### 3. 运行Python后端

```bash
# 安装依赖
cd backend
pip install -r requirements.txt
cd ..

# 启动服务
# 确保在项目根目录运行
uvicorn backend.app.main:app --reload
```

后端API将在 http://localhost:8000 上运行，API文档可在 http://localhost:8000/docs 访问。

### 4. 运行前端

```bash
# 安装依赖
cd frontend
# 在Windows PowerShell中可能需要使用以下命令
cmd /c "npm install"
# 或直接在cmd中运行
npm install

# 启动开发服务器
npm start
```

前端应用将在 http://localhost:3000 上运行。

## 📝 使用

### 基本计算器

输入两个数值和操作符，点击"计算"按钮获取结果。

```typescript
// 前端API调用示例
const result = await calculatorApi.basicOperation({
  a: 10,
  b: 5,
  operation: "add"
});
console.log(result); // 15
```

### 统计计算器

输入一组数据，选择统计函数，获取统计结果。

```typescript
// 前端API调用示例
const result = await calculatorApi.statisticalOperation({
  values: [1, 2, 3, 4, 5],
  operation: "mean"
});
console.log(result); // 3
```

### 矩阵计算器

输入两个矩阵，选择矩阵操作，获取计算结果。

```typescript
// 前端API调用示例
const result = await calculatorApi.matrixOperation({
  matrix_a: [[1, 2], [3, 4]],
  matrix_b: [[5, 6], [7, 8]],
  operation: "multiply"
});
console.log(result); // [[19, 22], [43, 50]]
```

### 线性回归分析

输入x和y数据点，获取回归线参数和可视化图表。

```typescript
// 前端API调用示例
const result = await calculatorApi.regressionAnalysis({
  x_values: [1, 2, 3, 4, 5],
  y_values: [2, 4, 5, 4, 5]
});
console.log(result); // { slope: 0.6, intercept: 2.2 }
```

## 📚 API文档

完整的API文档可在后端服务运行时访问：http://localhost:8000/docs

### 主要API端点

| 端点 | 方法 | 描述 | 参数 |
|------|------|------|------|
| `/api/basic` | POST | 基本数学运算 | `a`, `b`, `operation` |
| `/api/statistical` | POST | 统计计算 | `values`, `operation` |
| `/api/matrix` | POST | 矩阵运算 | `matrix_a`, `matrix_b`, `operation` |
| `/api/regression` | POST | 线性回归分析 | `x_values`, `y_values` |

## 🤝 贡献

欢迎贡献代码、报告问题或提出改进建议！

1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

### 开发环境设置

```bash
# 安装开发依赖
pip install -e ".[dev]"
npm install --save-dev

# 运行测试
pytest test/
npm test
```

## 📄 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件


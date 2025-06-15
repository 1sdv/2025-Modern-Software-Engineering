from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from pydantic import BaseModel, Field, validator

from backend.app.services.calculator import calculator_service

router = APIRouter()


# 请求和响应模型
class BasicOperationRequest(BaseModel):
    operation: str = Field(..., description="运算类型 (add, subtract, multiply, divide, power)")
    a: float = Field(..., description="第一个操作数")
    b: float = Field(..., description="第二个操作数")
    
    @validator("operation")
    def validate_operation(cls, v):
        allowed_operations = ["add", "subtract", "multiply", "divide", "power"]
        if v not in allowed_operations:
            raise ValueError(f"不支持的运算类型: {v}，允许的类型: {allowed_operations}")
        return v


class BasicOperationResponse(BaseModel):
    result: float = Field(..., description="计算结果")


class StatisticalRequest(BaseModel):
    operation: str = Field(..., description="统计运算类型 (mean, median, std_dev)")
    values: List[float] = Field(..., description="数据集")
    
    @validator("operation")
    def validate_operation(cls, v):
        allowed_operations = ["mean", "median", "std_dev"]
        if v not in allowed_operations:
            raise ValueError(f"不支持的统计运算类型: {v}，允许的类型: {allowed_operations}")
        return v
    
    @validator("values")
    def validate_values(cls, v):
        if len(v) < 1:
            raise ValueError("数据集不能为空")
        return v


class StatisticalResponse(BaseModel):
    result: float = Field(..., description="计算结果")


class MatrixOperationRequest(BaseModel):
    operation: str = Field(..., description="矩阵运算类型 (multiply, transpose, determinant)")
    matrix_a: List[List[float]] = Field(..., description="矩阵A")
    matrix_b: List[List[float]] = Field(None, description="矩阵B (仅用于乘法运算)")
    
    @validator("operation")
    def validate_operation(cls, v):
        allowed_operations = ["multiply", "transpose", "determinant"]
        if v not in allowed_operations:
            raise ValueError(f"不支持的矩阵运算类型: {v}，允许的类型: {allowed_operations}")
        return v
    
    @validator("matrix_a")
    def validate_matrix_a(cls, v):
        if len(v) == 0 or len(v[0]) == 0:
            raise ValueError("矩阵A不能为空")
        
        # 检查所有行的长度是否相同
        row_length = len(v[0])
        for row in v:
            if len(row) != row_length:
                raise ValueError("矩阵A的所有行长度必须相同")
        
        return v


class MatrixResponse(BaseModel):
    result: Any = Field(..., description="计算结果 (可能是矩阵或标量)")


class RegressionRequest(BaseModel):
    x: List[float] = Field(..., description="自变量数据")
    y: List[float] = Field(..., description="因变量数据")
    
    @validator("x", "y")
    def validate_data(cls, v, values):
        if len(v) < 2:
            raise ValueError("回归分析至少需要两个数据点")
        
        if "x" in values and len(values["x"]) != len(v):
            raise ValueError("x和y的长度必须相同")
        
        return v


class RegressionResponse(BaseModel):
    slope: float = Field(..., description="斜率")
    intercept: float = Field(..., description="截距")
    r_squared: float = Field(..., description="决定系数")
    predictions: List[float] = Field(..., description="预测值")


# API路由
@router.post("/basic", response_model=BasicOperationResponse)
async def basic_operation(request: BasicOperationRequest):
    """
    执行基本数学运算
    """
    result = calculator_service.basic_operation(
        operation=request.operation,
        a=request.a,
        b=request.b
    )
    return {"result": result}


@router.post("/stats", response_model=StatisticalResponse)
async def statistical_calculation(request: StatisticalRequest):
    """
    执行统计计算
    """
    result = calculator_service.statistical_calculation(
        operation=request.operation,
        values=request.values
    )
    return {"result": result}


@router.post("/matrix", response_model=MatrixResponse)
async def matrix_operation(request: MatrixOperationRequest):
    """
    执行矩阵运算
    """
    result = calculator_service.matrix_operation(
        operation=request.operation,
        matrix_a=request.matrix_a,
        matrix_b=request.matrix_b if request.operation == "multiply" else None
    )
    return {"result": result}


@router.post("/regression", response_model=RegressionResponse)
async def regression_analysis(request: RegressionRequest):
    """
    执行线性回归分析
    """
    result = calculator_service.regression_analysis(
        x=request.x,
        y=request.y
    )
    return result 
from fastapi import HTTPException, status


class CalculationError(HTTPException):
    """计算错误异常类"""
    
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
        )


class MatrixError(CalculationError):
    """矩阵计算错误异常类"""
    pass


class StatisticalError(CalculationError):
    """统计计算错误异常类"""
    pass


class RegressionError(CalculationError):
    """回归分析错误异常类"""
    pass 
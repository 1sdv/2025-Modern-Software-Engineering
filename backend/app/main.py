from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError

# 修改导入路径
from backend.app.api.routes import router as api_router
from backend.app.core.config import settings

# 创建FastAPI应用实例
app = FastAPI(
    title="计算器API",
    description="提供高性能数学和统计计算功能的API",
    version="1.0.0",
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册API路由
app.include_router(api_router, prefix="/api")

# 错误处理
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"detail": "输入数据验证错误", "errors": str(exc)},
    )

@app.exception_handler(ValidationError)
async def pydantic_validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"detail": "数据验证错误", "errors": exc.errors()},
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "服务器内部错误", "errors": str(exc)},
    )

# 根路由
@app.get("/")
async def root():
    return {"message": "欢迎使用计算器API，访问 /docs 查看API文档"} 
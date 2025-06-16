from typing import List
from pydantic import BaseSettings


class Settings(BaseSettings):
    """应用配置类"""
    
    # API配置
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "计算器API"
    
    # CORS配置
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173", "*"]
    
    class Config:
        case_sensitive = True


# 创建设置实例
settings = Settings() 
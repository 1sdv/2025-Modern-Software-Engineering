import sys
from PyQt5.QtWidgets import QApplication
from calculatorGUI import calculatorGUI

if __name__ == '__main__':
    # 创建应用程序对象
    app = QApplication(sys.argv)

    # 创建计算器界面对象
    calculator = calculatorGUI()

    # 运行应用程序并进入主循环
    sys.exit(app.exec_())

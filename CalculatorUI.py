# calculator_ui.py

from PyQt5.QtWidgets import QMainWindow, QLineEdit, QPushButton, QGridLayout, QWidget, QDesktopWidget
from PyQt5.QtCore import Qt
from CalculatorLogic import CalculatorLogic

class CalculatorUI(QMainWindow):
    def __init__(self):
        super().__init__()
        self.result_display = QLineEdit(self)
        self.result_display1 = QLineEdit(self)
        self.calculator_logic = CalculatorLogic()
        self.initUI()

    def initUI(self):
        # 设置窗口标题和大小，并居中显示
        self.setWindowTitle('Simple Calculator')
        self.setGeometry(300, 300, 420, 420)
        self.center()
        self.setObjectName('QMain')

        # 创建显示结果的文本框
        self.result_display.setReadOnly(True)
        self.result_display.setAlignment(Qt.AlignRight)
        self.result_display.resize(400, 40)

        self.result_display1.setReadOnly(True)
        self.result_display1.setAlignment(Qt.AlignRight)
        self.result_display1.resize(400, 40)

        # 创建按钮并添加到布局中
        self.create_buttons()
        layout = QGridLayout()
        layout.addWidget(self.result_display, 0, 0, 1, 4)
        layout.addWidget(self.result_display1, 1, 0, 1, 4)
        self.add_buttons_to_layout(layout)

        # 设置布局和样式，并显示窗口
        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)
        self.setStyleSheet(
            "#QMain{background-color:rgb(253,253,253)}"
            "QPushButton{width:100%;height:100%;font-size:20px;font-family:KaiTi;border:none}"
            "QPushButton:hover{background-color:rgb(244,244,244);border-top:2px solid rgb(141,141,141);border-left:3px solid rgb(141,141,141);}"
            "QLineEdit{border:none;font-size:20px;font-family:KaiTi}"
            "#QMainWindow:{background-color:white}"
        )
        self.show()

    # 窗口居中显示
    def center(self):
        fw = self.frameGeometry()
        cp = QDesktopWidget().availableGeometry().center()
        fw.moveCenter(cp)
        self.move(fw.topLeft())

    # 创建按钮
    def create_buttons(self):
        self.num_buttons = []
        for i in range(10):
            button = QPushButton(str(i), self)
            button.clicked.connect(self.on_number_click)
            self.num_buttons.append(button)

        # 创建其他功能按钮，并连接到相应的槽函数
        self.add_button = QPushButton('+', self)
        self.add_button.clicked.connect(self.on_operator_click)
        self.subtract_button = QPushButton('-', self)
        self.subtract_button.clicked.connect(self.on_operator_click)
        self.multiply_button = QPushButton('*', self)
        self.multiply_button.clicked.connect(self.on_operator_click)
        self.divide_button = QPushButton('/', self)
        self.divide_button.clicked.connect(self.on_operator_click)
        self.clear_button = QPushButton('C', self)
        self.clear_button.clicked.connect(self.on_clear_click)
        self.point_button = QPushButton('.', self)
        self.point_button.clicked.connect(self.on_number_click)
        self.left_bracket_button = QPushButton('(', self)
        self.left_bracket_button.clicked.connect(self.on_number_click)
        self.right_bracket_button = QPushButton(')', self)
        self.right_bracket_button.clicked.connect(self.on_number_click)
        self.equal_button = QPushButton('=', self)
        self.equal_button.clicked.connect(self.on_equal_click)
        self.sin_button = QPushButton('sin', self)
        self.sin_button.clicked.connect(self.on_tri_click)
        self.cos_button = QPushButton('cos', self)
        self.cos_button.clicked.connect(self.on_tri_click)
        self.asin_button = QPushButton('asin', self)
        self.asin_button.clicked.connect(self.on_tri_click)
        self.atan_button = QPushButton('atan', self)
        self.atan_button.clicked.connect(self.on_tri_click)
        self.pow_button = QPushButton('^', self)
        self.pow_button.clicked.connect(self.on_number_click)
        self.back_button = QPushButton('back', self)
        self.back_button.clicked.connect(self.on_back_click)

    # 将按钮添加到布局中
    def add_buttons_to_layout(self, layout):
        buttons = [
            (self.num_buttons, (2, 0), (10, 3)),
            (self.add_button, (2, 3)),
            (self.subtract_button, (3, 3)),
            (self.multiply_button, (4, 3)),
            (self.divide_button, (5, 3)),
            (self.clear_button, (6, 0)),
            (self.point_button, (6, 1)),
            (self.left_bracket_button, (6, 2)),
            (self.right_bracket_button, (6, 3)),
            (self.equal_button, (5, 1)),
            (self.sin_button, (2, 4)),
            (self.cos_button, (3, 4)),
            (self.asin_button, (4, 4)),
            (self.atan_button, (5, 4)),
            (self.pow_button, (6, 4)),
            (self.back_button, (5, 2))
        ]

        # 遍历按钮列表并添加到布局中
        for button in buttons:
            if isinstance(button[0], list):
                for i, num_button in enumerate(button[0]):
                    layout.addWidget(num_button, button[1][0] + i // 3, button[1][1] + i % 3)
            else:
                layout.addWidget(button[0], *button[1], 1, 1)

    # 处理三角函数按钮点击事件
    def on_tri_click(self):
        func = self.sender().text()
        self.result_display.setText(self.result_display.text() + func + '(')

    # 处理数字按钮点击事件
    def on_number_click(self):
        num = self.sender().text()
        self.result_display.setText(self.result_display.text() + num)

    # 处理运算符按钮点击事件
    def on_operator_click(self):
        op = self.sender().text()
        self.result_display.setText(self.result_display.text() + op)

    # 处理清除按钮点击事件
    def on_clear_click(self):
        self.result_display.clear()

    # 处理等号按钮点击事件
    def on_equal_click(self):
        try:
            cal = self.result_display.text()
            result = self.calculator_logic.calculate(cal)
            self.result_display1.setText(str(result))
        except:
            self.result_display1.setText('Error')

    # 处理后退按钮点击事件
    def on_back_click(self):
        content = self.result_display.text()
        new_content = self.calculator_logic.remove_last_character(content)
        self.result_display.setText(new_content)

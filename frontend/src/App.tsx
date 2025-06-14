import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

// 导入组件
import Layout from './components/common/Layout';
import BasicCalculator from './components/BasicCalculator';
import StatisticalCalculator from './components/StatisticalCalculator';
import MatrixCalculator from './components/MatrixCalculator';
import RegressionAnalysis from './components/RegressionAnalysis';

// 创建主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<BasicCalculator />} />
              <Route path="/stats" element={<StatisticalCalculator />} />
              <Route path="/matrix" element={<MatrixCalculator />} />
              <Route path="/regression" element={<RegressionAnalysis />} />
            </Routes>
          </Container>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
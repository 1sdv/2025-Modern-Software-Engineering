import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import { calculatorApi } from '../services/api';
import { parseMultilineText } from '../utils/helpers';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Scatter,
} from 'recharts';

interface RegressionResult {
  slope: number;
  intercept: number;
  r_squared: number;
  predictions: number[];
}

const RegressionAnalysis: React.FC = () => {
  const [xValues, setXValues] = useState<string>('');
  const [yValues, setYValues] = useState<string>('');
  const [result, setResult] = useState<RegressionResult | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleXValuesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setXValues(event.target.value);
  };

  const handleYValuesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYValues(event.target.value);
  };

  const validateInputs = (): boolean => {
    const x = parseMultilineText(xValues);
    const y = parseMultilineText(yValues);
    
    if (x.length < 2 || y.length < 2) {
      setError('请至少输入两个有效的x和y值');
      return false;
    }

    if (x.length !== y.length) {
      setError('x和y值的数量必须相同');
      return false;
    }

    return true;
  };

  const handleCalculate = async () => {
    setError('');
    
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const x = parseMultilineText(xValues);
      const y = parseMultilineText(yValues);
      
      const response = await calculatorApi.linearRegression({
        x,
        y,
      });

      setResult({
        slope: response.slope,
        intercept: response.intercept,
        r_squared: response.r_squared,
        predictions: response.predictions,
      });
    } catch (err) {
      setError('计算出错，请稍后再试');
      console.error('计算错误:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setXValues('');
    setYValues('');
    setResult(null);
    setError('');
  };

  const renderChart = () => {
    if (!result) return null;
    
    const x = parseMultilineText(xValues);
    const y = parseMultilineText(yValues);
    
    // 创建图表数据
    const chartData = x.map((xVal, index) => ({
      x: xVal,
      y: y[index],
      prediction: result.predictions[index],
    }));
    
    return (
      <Box sx={{ height: 400, mt: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x" 
              name="X" 
              label={{ value: 'X值', position: 'insideBottomRight', offset: -10 }} 
            />
            <YAxis 
              name="Y" 
              label={{ value: 'Y值', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip />
            <Legend />
            <Scatter name="实际数据点" dataKey="y" fill="#8884d8" />
            <Line
              name="回归线"
              type="monotone"
              dataKey="prediction"
              stroke="#ff7300"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  const renderResultTable = () => {
    if (!result) return null;
    
    const x = parseMultilineText(xValues);
    const y = parseMultilineText(yValues);
    
    return (
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>X值</TableCell>
              <TableCell>实际Y值</TableCell>
              <TableCell>预测Y值</TableCell>
              <TableCell>误差</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {x.map((xVal, index) => (
              <TableRow key={index}>
                <TableCell>{xVal}</TableCell>
                <TableCell>{y[index]}</TableCell>
                <TableCell>{result.predictions[index].toFixed(4)}</TableCell>
                <TableCell>{(y[index] - result.predictions[index]).toFixed(4)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          线性回归分析
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="X值 (每行一个数字，或用逗号分隔)"
              variant="outlined"
              value={xValues}
              onChange={handleXValuesChange}
              multiline
              rows={4}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Y值 (每行一个数字，或用逗号分隔)"
              variant="outlined"
              value={yValues}
              onChange={handleYValuesChange}
              multiline
              rows={4}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">
              提示：输入的X和Y值数量必须相同，每个值可以单独一行或用逗号分隔
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalculate}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                计算回归
              </Button>
              <Button variant="outlined" onClick={handleClear}>
                清除
              </Button>
            </Box>
          </Grid>
          
          {result && (
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  回归结果:
                </Typography>
                <Typography variant="body1">
                  回归方程: Y = {result.slope.toFixed(4)}X + {result.intercept.toFixed(4)}
                </Typography>
                <Typography variant="body1">
                  决定系数 (R²): {result.r_squared.toFixed(4)}
                </Typography>
              </Paper>
              
              {renderChart()}
              {renderResultTable()}
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RegressionAnalysis; 
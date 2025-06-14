import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { BasicOperation } from '../types';
import { calculatorApi } from '../services/api';
import { isValidNumber } from '../utils/helpers';

const BasicCalculator: React.FC = () => {
  const [operation, setOperation] = useState<BasicOperation>('add');
  const [valueA, setValueA] = useState<string>('');
  const [valueB, setValueB] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const operationLabels: Record<BasicOperation, string> = {
    add: '加法 (+)',
    subtract: '减法 (-)',
    multiply: '乘法 (×)',
    divide: '除法 (÷)',
    power: '幂运算 (^)',
  };

  const handleOperationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOperation(event.target.value as BasicOperation);
  };

  const handleValueAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueA(event.target.value);
  };

  const handleValueBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueB(event.target.value);
  };

  const validateInputs = (): boolean => {
    if (!isValidNumber(valueA) || !isValidNumber(valueB)) {
      setError('请输入有效的数字');
      return false;
    }

    if (operation === 'divide' && parseFloat(valueB) === 0) {
      setError('除数不能为零');
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
      const response = await calculatorApi.basicOperation({
        operation,
        a: parseFloat(valueA),
        b: parseFloat(valueB),
      });

      setResult(response.result);
    } catch (err) {
      setError('计算出错，请稍后再试');
      console.error('计算错误:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setValueA('');
    setValueB('');
    setResult(null);
    setError('');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          基本计算器
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="operation-label">运算</InputLabel>
              <Select
                labelId="operation-label"
                id="operation"
                value={operation}
                label="运算"
                onChange={handleOperationChange}
              >
                {(Object.keys(operationLabels) as BasicOperation[]).map((op) => (
                  <MenuItem key={op} value={op}>
                    {operationLabels[op]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="数值 A"
              variant="outlined"
              value={valueA}
              onChange={handleValueAChange}
              type="number"
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="数值 B"
              variant="outlined"
              value={valueB}
              onChange={handleValueBChange}
              type="number"
            />
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
                计算
              </Button>
              <Button variant="outlined" onClick={handleClear}>
                清除
              </Button>
            </Box>
          </Grid>
          
          {result !== null && (
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mt: 2,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                }}
              >
                <Typography variant="h6" component="div">
                  计算结果:
                </Typography>
                <Typography variant="h4" component="div">
                  {result}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BasicCalculator; 
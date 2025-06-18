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
  Divider,
} from '@mui/material';
import { StatisticalOperation } from '../types';
import { calculatorApi } from '../services/api';
import { parseMultilineText } from '../utils/helpers';

const StatisticalCalculator: React.FC = () => {
  const [operation, setOperation] = useState<StatisticalOperation>('mean');
  const [valuesInput, setValuesInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const operationLabels: Record<StatisticalOperation, string> = {
    mean: '平均值',
    median: '中位数',
    std_dev: '标准差',
  };

  const handleOperationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOperation(event.target.value as StatisticalOperation);
  };

  const handleValuesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuesInput(event.target.value);
  };

  const validateInputs = (): boolean => {
    const values = parseMultilineText(valuesInput);
    
    if (values.length < 1) {
      setError('请至少输入一个有效数字');
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
      const values = parseMultilineText(valuesInput);
      
      const response = await calculatorApi.statisticalCalculation({
        operation,
        values,
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
    setValuesInput('');
    setResult(null);
    setError('');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          统计计算
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="operation-label">统计运算</InputLabel>
              <Select
                labelId="operation-label"
                id="operation"
                value={operation}
                label="统计运算"
                onChange={handleOperationChange}
              >
                {(Object.keys(operationLabels) as StatisticalOperation[]).map((op) => (
                  <MenuItem key={op} value={op}>
                    {operationLabels[op]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="数据集 (每行一个数字，或用逗号分隔)"
              variant="outlined"
              value={valuesInput}
              onChange={handleValuesChange}
              multiline
              rows={4}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              提示：可以输入多行数字，或使用逗号分隔的数字列表
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
                  {operationLabels[operation]}:
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

export default StatisticalCalculator; 
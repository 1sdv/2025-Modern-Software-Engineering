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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { MatrixOperation, Matrix } from '../types';
import { calculatorApi } from '../services/api';
import { createEmptyMatrix, isValidMatrix } from '../utils/helpers';

const MatrixCalculator: React.FC = () => {
  const [operation, setOperation] = useState<MatrixOperation>('multiply');
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);
  const [matrixA, setMatrixA] = useState<Matrix>(createEmptyMatrix(2, 2));
  const [matrixB, setMatrixB] = useState<Matrix>(createEmptyMatrix(2, 2));
  const [result, setResult] = useState<Matrix | number | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const operationLabels: Record<MatrixOperation, string> = {
    multiply: '矩阵乘法',
    transpose: '矩阵转置',
    determinant: '行列式',
  };

  const handleOperationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOperation(event.target.value as MatrixOperation);
  };

  const handleSizeChange = () => {
    setMatrixA(createEmptyMatrix(rows, cols));
    setMatrixB(createEmptyMatrix(cols, rows));
    setResult(null);
  };

  const handleMatrixAChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = [...matrixA];
    newMatrix[rowIndex][colIndex] = value === '' ? 0 : parseFloat(value);
    setMatrixA(newMatrix);
  };

  const handleMatrixBChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = [...matrixB];
    newMatrix[rowIndex][colIndex] = value === '' ? 0 : parseFloat(value);
    setMatrixB(newMatrix);
  };

  const validateInputs = (): boolean => {
    if (!isValidMatrix(matrixA)) {
      setError('矩阵A格式无效');
      return false;
    }

    if (operation === 'multiply' && !isValidMatrix(matrixB)) {
      setError('矩阵B格式无效');
      return false;
    }

    if (operation === 'multiply' && matrixA[0].length !== matrixB.length) {
      setError('矩阵乘法要求：矩阵A的列数必须等于矩阵B的行数');
      return false;
    }

    if (operation === 'determinant' && matrixA.length !== matrixA[0].length) {
      setError('计算行列式要求矩阵必须是方阵');
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
      const requestData = {
        operation,
        matrix_a: matrixA,
        ...(operation === 'multiply' ? { matrix_b: matrixB } : {}),
      };
      
      const response = await calculatorApi.matrixOperation(requestData);
      setResult(response.result);
    } catch (err) {
      setError('计算出错，请稍后再试');
      console.error('计算错误:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMatrixA(createEmptyMatrix(rows, cols));
    setMatrixB(createEmptyMatrix(cols, rows));
    setResult(null);
    setError('');
  };

  const renderMatrix = (matrix: Matrix, onChange?: (row: number, col: number, value: string) => void) => {
    return (
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableBody>
            {matrix.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex} padding="none" sx={{ width: '60px' }}>
                    {onChange ? (
                      <TextField
                        size="small"
                        value={cell === 0 ? '' : cell}
                        onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                        inputProps={{ style: { textAlign: 'center' } }}
                        type="number"
                        sx={{ width: '100%' }}
                      />
                    ) : (
                      <Box sx={{ p: 1, textAlign: 'center' }}>{cell}</Box>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderResult = () => {
    if (result === null) return null;

    if (typeof result === 'number') {
      return (
        <Paper elevation={3} sx={{ p: 3, mt: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <Typography variant="h6" component="div">
            行列式结果:
          </Typography>
          <Typography variant="h4" component="div">
            {result}
          </Typography>
        </Paper>
      );
    } else {
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            结果矩阵:
          </Typography>
          {renderMatrix(result as Matrix)}
        </Box>
      );
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          矩阵计算器
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="operation-label">矩阵运算</InputLabel>
              <Select
                labelId="operation-label"
                id="operation"
                value={operation}
                label="矩阵运算"
                onChange={handleOperationChange}
              >
                {(Object.keys(operationLabels) as MatrixOperation[]).map((op) => (
                  <MenuItem key={op} value={op}>
                    {operationLabels[op]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              label="行数"
              type="number"
              value={rows}
              onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1, max: 10 }}
            />
          </Grid>
          
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              label="列数"
              type="number"
              value={cols}
              onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1, max: 10 }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleSizeChange}
            >
              应用矩阵大小
            </Button>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              矩阵 A:
            </Typography>
            {renderMatrix(matrixA, handleMatrixAChange)}
          </Grid>
          
          {operation === 'multiply' && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                矩阵 B:
              </Typography>
              {renderMatrix(matrixB, handleMatrixBChange)}
            </Grid>
          )}
          
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
              {renderResult()}
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MatrixCalculator; 
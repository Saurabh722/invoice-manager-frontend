import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomTable = ({heads, rows=[], actions}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 320 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {heads.map((head, idx) => <StyledTableCell key={head} align={idx ? "right" : "left"}>{head}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRow key={row.name}>
              {Object.keys(row).map((cell, i) => {
                const props = i ? { align: "right"} : {component :"th", scope: "row"};
                return <StyledTableCell key={`${cell}-${row[cell]}`} {...props}>{row[cell]}</StyledTableCell>;
              })}
              {actions && (
                <StyledTableCell>
                  <Button variant="outlined" onClick={() => actions.edit.onClick(row['customerId'])}>{actions.edit.label}</Button>
                  <Button variant="outlined" onClick={() => actions.delete.onClick(row['customerId'])}>{actions.delete.label}</Button>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;

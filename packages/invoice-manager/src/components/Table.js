import React, {useRef} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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

const getHeads = (row) => {
  const keys = Object.keys(row);
  return keys.map(key => key.charAt(0).toUpperCase() + key.slice(1));
}

const InputField = React.memo(({ value, onChange }) => {
  return <input type="number" value={value} onChange={onChange} />;
});

const CustomTable = ({heads, rows=[], updateQuantity, actions, hideFooter}) => {
  let titles = heads;
  const total = rows.reduce((a, {amount}) => a + parseInt(amount) , 0);
  const productRef = useRef(null);
  if (!rows || !rows.length) {
    return null;
  }
  if (!titles) {
    titles = getHeads(rows[0]);
  }

  if (actions) {
    titles.push('')
  }

  const alignment = (idx) => {
    if (!idx) {
      return 'left';
    } else if (idx === (titles.length - 1)) {
      return 'center';
    }

    return 'right';
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 320 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {titles.map((title, idx) => <StyledTableCell key={title} align={alignment(idx)}>{title}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow key={`${row.name}-${index}`}>
              {Object.keys(row).map((cell, i) => {
                const props = i ? { align: "right"} : {component :"th", scope: "row", sx: {cursor: 'pointer'}};
                if (cell === 'productId') {
                  return null;
                }
                if (cell === 'quantity') {
                  return <StyledTableCell key={`${cell}-${row[cell]}`} {...props}>
                    <input type="number" value={row[cell]} onChange={(event) => updateQuantity(row.productId, parseInt(event.target.value))}/>
                  </StyledTableCell>;
                }
                return <StyledTableCell key={`${cell}-${row[cell]}`} {...props}>{row[cell]}</StyledTableCell>;
              })}
              {actions && (
                <StyledTableCell align="right">
                  <Button variant="outlined" onClick={() => actions.delete.onClick(row['productId'])}><DeleteForeverIcon/></Button>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
          {!hideFooter && <TableRow>
            <TableCell colSpan={4} align="right"><b>Total:</b></TableCell>
            <TableCell align="right"><b>{total}</b></TableCell>
          </TableRow>}
        </TableBody>
      </Table>
      
    </TableContainer>
  );
}

export default CustomTable;

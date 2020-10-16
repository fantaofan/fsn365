import React, { useEffect } from 'react'
import Nav from '../nav'
import Bottom from '../bottom'
import './transactionsn.less'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { transactionsList } from '../../api'



const columns = [
  { id: 'hash', label: 'Tx Hash' },
  { id: 'timestamp', label: 'Time' },
  {
    id: 'bk',
    label: 'Block',
    align: 'right',
  },
  {
    id: 'ta',
    label: 'From',
    align: 'right',
  },
  {
    id: 'size2',
    label: 'Direction',
    align: 'right',
  },
  {
    id: 'to',
    label: 'To',
    align: 'right',
  },
  {
    id: 'type',
    label: 'Tx Type',
    align: 'right',
  },
  {
    id: 'info',
    label: 'Info',
    align: 'center',
    maxWidth: 150
  },
];




const index = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await transactionsList()
      setRows(result.data.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="transactionsn-contiar">
        <Nav></Nav>
        <div className='maiTransactionsn'>
          <div className='maiTransactionsn-head'>
            <span>Transactions</span>
          </div>
          <div>

          </div>

          <Paper className='root'>
            <TableContainer className='container'>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={`${index}sss`}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow hover role="dexcheckbox" tabin={-1} key={index} calssname="hash">
                        {columns.map((column) => {
                          let value;
                          if (column.id == 'info') {
                            value = `${row[column.id].value} FSN`;
                          } else {
                            value = row[column.id];

                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[15, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      <Bottom></Bottom>

    </div>

  )

}

export default index

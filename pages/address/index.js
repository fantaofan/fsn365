import React, { useEffect } from 'react'
import Nav from '../nav'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Bottom from '../bottom';
import './addre.less'
import { addressList } from '../../api'

const columns = [
    { id: 'id', label: 'Address' },
    { id: 'fsn', label: 'FSN balance' },
    {
        id: 'fsnIn',
        label: 'TL FSN',
        align: 'right',
    },
    {
        id: 'fsnOwn',
        label: 'FSN Ownership',
        align: 'right',
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
            const result = await addressList()
            setRows(result.data.data);
            //   console.log(result.data.data)
        };

        fetchData();
    }, []);
    console.log(rows)

    return (
        <div>
            <Nav></Nav>
            <div className="transactionsn-contiar">

                <div className='maiTransactionsn'>
                    <div className='maiTransactionsn-head'>
                        <span> Fusion Address</span>
                    </div>
                    <div>

                    </div>

                    <Paper className='root'>
                        Notice:We only list addresses that hold one or more FSN ownership at this page.
            <TableContainer className='container'>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
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
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index} calssname="hash">
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
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

import React from 'react'
import Nav from '../nav'
import './staking.less'
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(tickets, onlineMiners, historicalMiners, blockRewards) {
    return { tickets, onlineMiners, historicalMiners, blockRewards };
}

const rows = [
    createData('1', '2', '3', 'FSN')
];

export default function index() {
    return (
        <div>
            <div className='home-contiar'>
                <Nav></Nav>
                <div className='staking'>
                    <header>
                        <h2>Fusion Staking</h2>
                    </header>
                    <TableContainer component={Paper} className='staking-table'>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong className='sum'>Summary</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableHead>
                                {rows.map((row) => (
                                    <TableRow key={row.tickets}>
                                        <TableCell>Tickets:{row.tickets}</TableCell>
                                        <TableCell>Online Miners:{row.onlineMiners}</TableCell>
                                    </TableRow>
                                ))}
                                {rows.map((row) => (
                                    <TableRow key={row.historicalMiners}>
                                        <TableCell>Historical Miners:{row.historicalMiners}</TableCell>
                                        <TableCell>Block Rewards:{row.blockRewards}</TableCell>
                                    </TableRow>
                                ))}
                            </TableHead>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper} className='staking-table-1'>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong className='sum'>Active Miners Unexpected errro happened.</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

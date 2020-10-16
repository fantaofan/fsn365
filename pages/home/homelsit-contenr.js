import React, { useEffect } from 'react'
import Link from 'next/link'
import './homelsit-contenr.less'
import { getLatest } from '../../api'


function HomelsitContenr() {

    const [leftdata, setLeftdata] = React.useState([]);
    const [rightdata, setRightdata] = React.useState([]);
    const [datetime, setDatetime] = React.useState(null);
    useEffect(() => {
        const listData = async () => {
            const result = await getLatest()
            if (result.data === undefined) {
                listData()
                return
            }
            setLeftdata(result.data.txs)
            setRightdata(result.data.bks)
        }
        let tiems = setInterval(() => {
            listData()
            setLeftdata([])
            setRightdata([])
        }, 30000);
        listData()

        const times = new Date().getTime()
        setDatetime(times)
        return () => {
            clearInterval(tiems)
        }


    }, [])
    return (
        <div className='homelsit-contenr'>
            <div className='con-left'>
                <div className='con-top'>
                    <h4>Latest Txns</h4>
                    <h4 className='yan'>
                        <Link href='/transactions'>
                            <a>
                                View All
                            </a>
                        </Link>
                    </h4>
                </div>
                {/* 循环内容 */}
                <div className='con-content'>
                    {
                        leftdata.length === 0 ? '' : leftdata.map((data, index) => (
                            <div className='con-item' key={index}>
                                <div className='item-letf' >
                                    <div className='txn'>Txn</div>
                                    <div>
                                        <Link href={`/tx/${data.hash}`}>
                                            <a>{`${data.hash}`}</a>
                                        </Link>
                                        <p>{`${Math.round((datetime - (data.timestamp * 1000)) / (60 * 60 * 24 * 1000))}`} day ago</p>

                                    </div>
                                </div>
                                <div className='item-right'>
                                    <div>
                                        <p>From</p>
                                        <Link href={`/address/${data.from}`}>
                                            <a>{`${data.from}`}</a>
                                        </Link>
                                    </div>

                                    <div>
                                        <p>To</p>
                                        <Link href={`/address/${data.to}`}>
                                            <a>{`${data.to}`} </a>
                                        </Link>

                                    </div>
                                </div>
                                <div>
                                    {`${data.type}`}
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className='con-right'>
                <div className='con-top'>
                    <h4>
                        Latest Blocks
                    </h4>
                    <h4 className='yan'>
                        <Link href='/blocks'>
                            <a>
                                View All
                            </a>
                        </Link>
                    </h4>
                </div>
                {/* 循环内容 */}
                <div className='con-content'>
                    {
                        rightdata.length === 0 ? '' : rightdata.map((data, index) => (
                            <div className='con-item' key={index}>
                                <div className='item-letf'>
                                    <div className='block'>BK</div>
                                    <div>
                                        <Link href={`/blocks/${data.height}`}>
                                            <a>{`${data.height}`}</a>
                                        </Link>

                                        <p>{`${Math.round((datetime - (data.timestamp * 1000)) / (60 * 60 * 24 * 1000))}`} day ago</p>
                                    </div>
                                </div>
                                <div className='item-right'>
                                    <div>
                                        <p>Miner</p>
                                        <Link href={`/address/${data.miner}`}>
                                            <a>{`${data.miner}`}</a>

                                        </Link>
                                    </div>

                                    <div>

                                        <a href={`https://api.fsn365.com/txn?bk=2589472&size=${data.txns}`} target='blank'>{`${data.txns}`}txns </a>

                                        <p>&nbsp; in block.</p>
                                    </div>
                                </div>
                                <div>
                                    {`${data.reward}`} FSN
                            </div>
                            </div>
                        ))
                    }

                </div>


            </div>
        </div >
    )
}

export default HomelsitContenr

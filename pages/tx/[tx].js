import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTx } from '../../api'
import Nav from '../nav'
import Bottom from '../bottom'
import './tx.less'

function index() {
    const [txDatas, setTxDatas] = useState(null)
    const [datetime, setDatetime] = React.useState(null);
    useEffect(() => {
        const a = window.location.pathname
        var reg = /(?=\/)/g;
        var utld = null
        a.replace(reg, ($, $1) => {
            utld = a.slice($1 + 1)
        })
        const times = new Date().getTime()
        setDatetime(times)
        const txfn = async () => {
            const result = await getTx(utld)
            console.log(result.data);
            setTxDatas(result.data)
        }
        txfn()
    }, [])
    const aa = (date) => {
        var d = new Date(date);
        var yue = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        var re = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
        var youWant = d.getFullYear() + '.' + yue + '.' + re;
        return youWant
    }
    return (
        <div className='tx-box'>
            <Nav></Nav>
            <div className='tx-content'>
                <div className='tx-title'>
                    <h4>Tx</h4>
                    <h4 className='sss'># TimeLock</h4>
                </div>
                <div className='tx-con'>
                    {
                        txDatas === null ? '' : <div className='tx-b'>
                            <div>
                                <span> Hash：</span>
                                <a href="">
                                    {`${txDatas.hash}`}
                                </a>
                            </div>
                            {txDatas.info.lockType != undefined ? < div >
                                <span>  Lock Type：</span>
                                {`${txDatas.info.lockType}`}
                            </div> : ''}
                            <div>
                                <span> Value：</span>
                                {`${txDatas.info.value} `}

                                <Link href={`/asset/${txDatas.info.assetID}`}>
                                    <a >{` ${txDatas.info.symbol}`}</a>
                                </Link>
                            </div>
                            {
                                txDatas.info.duration != undefined ? <div>
                                    <span> Duration：</span>
                                    {`${aa(txDatas.info.duration.startTime * 1000)} (${Math.round((datetime - (txDatas.info.duration.startTime * 1000)) / (60 * 60 * 24 * 1000))} day ago) ~ ${aa(txDatas.info.duration.endTime * 1000)} (12 mos from now)`}
                                </div> : ''
                            }
                            <div>
                                <span> Tx Status：</span>
                                <span className={txDatas.status === 1 ? 'success' : 'errer'}>{txDatas.status === 1 ? 'success' : 'errer'}</span>
                            </div>
                            <div>
                                <span> Block：</span>
                                <Link href={`/blocks/${txDatas.bk}`}>
                                    <a > {`${txDatas.bk}`}</a>
                                </Link>

                            </div>
                            <div>
                                <span> From：</span>
                                <Link href={`/address/${txDatas.from}`}>
                                    <a > {`${txDatas.from}`}</a>
                                </Link>

                            </div>
                            <div>
                                <span> To：</span>
                                <Link href={`/address/${txDatas.to}`}>
                                    <a > {`${txDatas.to}`}</a>
                                </Link>

                            </div>
                            <div>
                                <span> Time：</span>
                                {`${aa(txDatas.timestamp * 1000)} (${Math.round((datetime - (txDatas.timestamp * 1000)) / (60 * 60 * 24 * 1000))} day ago)`}
                            </div>

                        </div>
                    }

                </div>
            </div>
            <Bottom></Bottom>
        </div >
    )
}

export default index

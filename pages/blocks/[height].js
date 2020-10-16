import React, { useState, useEffect } from "react";
import { getBlocksHeight } from "../../api";
import Nav from "../nav";
import Link from "next/link";
import Bottom from "../bottom";

export default function BlockPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const query = window.location.pathname.substring(8);
    const fetchData = async () => {
      const res = await getBlocksHeight(query);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Nav />

      {data && (
        <div className="page-main">
          <div className="main">
            <header>
              <h3>
                Block <small>{`#${data.height}`}</small>
              </h3>
            </header>
            <div className="blocks-list">
              <div className="blocks-item">
                <p>
                  Height：
                  <a
                    href={`https://api.fsn365.com/block/${data.height}`}
                    target="_blank"
                  >
                    {data.height}
                  </a>
                </p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>{`Age：${data.timestamp}`}</p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>
                  Transactions：
                  <a
                    href={`https://api.fsn365.com/txn?bk=${data.height}`}
                    target="_blank"
                  >
                    {data.txns} &nbsp;
                  </a>
                  txns in block
                </p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>
                  Block Miner：
                  <Link href={`/staking/${data.miner}`}>
                    <a>{data.miner}</a>
                  </Link>
                </p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>{`Block Rewards：${data.reward}`}</p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>{`Difficulty：${data.difficulty}`}</p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>{`Total Difficulty：`}</p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>{`Size：${data.size}`}</p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>{`Gas Limit：${data.gasLimit}`}</p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>{`Parent Hash：${data.parentHash}`}</p>
                <hr />
              </div>
              <div className="blocks-item">
                <p>{`Hash：${data.hash}`}</p>
                <hr />
              </div>
            </div>
          </div>
        </div>
      )}
      <Bottom />
    </div>
  );
}

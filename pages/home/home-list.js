import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./homelist.less";
import { getStats } from "../../api";
const homeList = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getStats();
      if (result.data === undefined) {
        fetchData();
        return;
      }
      setData(result.data);
    };
    let tiems = setInterval(() => {
      fetchData();
      setData(null);
    }, 30000);

    fetchData();
    return () => {
      clearInterval(tiems);
    };
  }, []);
  return (
    <div className="homelist-box">
      <ul className="homelist-top">
        <li>
          <h4>Price($)</h4>
          <div>
            {data === null ? (
              <CircularProgress style={{ width: "18px", height: "18px" }} />
            ) : (
              `$${Math.round(data.priceData.price * 10000) / 10000}`
            )}
          </div>
        </li>
        <li>
          <h4>Addresses</h4>
          <div>
            {data === null ? (
              <CircularProgress style={{ width: "18px", height: "18px" }} />
            ) : (
              `${data.address}`
            )}
          </div>
        </li>
        <li>
          <h4>Swadivs</h4>
          <div>
            {data === null ? (
              <CircularProgress style={{ width: "18px", height: "18px" }} />
            ) : (
              `${data.swaps}`
            )}
          </div>
        </li>
        <li>
          <h4>Online Miners</h4>
          <div>
            {data === null ? (
              <CircularProgress style={{ width: "18px", height: "18px" }} />
            ) : (
              `${data.miners}`
            )}
          </div>
        </li>
        <li>
          <h4>MarketCadiv</h4>
          <div>
            {data === null ? (
              <CircularProgress style={{ width: "18px", height: "18px" }} />
            ) : (
              `$${Math.round(data.priceData.mcap * 10000) / 10000}`
            )}
          </div>
        </li>
        <li>
          <h4>Block Height</h4>
          <div>
            {data === null ? (
              <CircularProgress style={{ width: "18px", height: "18px" }} />
            ) : (
              `${data.height}`
            )}
          </div>
        </li>
        <li>
          <h4>Tokens</h4>
          <div>
            {data === null ? (
              <CircularProgress style={{ width: "18px", height: "18px" }} />
            ) : (
              `${data.assets}`
            )}
          </div>
        </li>
        <li>
          <h4>Tickets</h4>
          <div>
            {data === null ? (
              <CircularProgress style={{ width: "18px", height: "18px" }} />
            ) : (
              `${data.activeTickets}`
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default homeList;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const emeraldBalance = useRef(0);
  localStorage.setItem("FundSum", 0);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL).then((response) => {
      setAPIData(response.data);
    });

    axios.get(process.env.REACT_APP_API_URL_EMERALD.concat('/1')).then((response) => {
      const real_balance = response.data['balance'];
      emeraldBalance.current = real_balance;
    });

  }, []);

  let dataValues = {
    id: ["ID"],
    campaignName: ["Campaign name"],
    keywords: ["Keywords"],
    bidAmount: ["Bid amount", "zł"],
    campaignFund: ["Campaign fund", "zł"],
    status01: ["Status", "bool"],
    town: ["Town"],
    radius: ["Radius", "km"]
  };

  const setData = (data) => {

    let { id, campaignName, keywords, bidAmount, campaignFund, status01, town, radius } = data;

    localStorage.setItem("ID", id);
    localStorage.setItem("Campaign name", campaignName);
    localStorage.setItem("Keywords", keywords);
    localStorage.setItem("Bid amount", bidAmount);
    localStorage.setItem("Campaign fund", campaignFund);
    localStorage.setItem("Status", status01);
    localStorage.setItem("Town", town);
    localStorage.setItem("Radius", radius);
  };
  const getData = () => {
    axios.get(process.env.REACT_APP_API_URL).then((getData) => {
      setAPIData(getData.data);
    });
  };
  
  const onDelete = (id) => {
    axios.delete(process.env.REACT_APP_API_URL.concat(`/${id}`)).then(() => {
      getData();
    });
  };

  function TableTh() {
    let array = [];
    Object.keys(dataValues).forEach(key => {
      array.push([<th>{dataValues[key][0]}</th>]);
    });
    array[0] = [];
    return (array);
  }

  function recalculateBalance() {
    localStorage.setItem("FundSum", 0);
    APIData.map((data) => {
      let array_raw = [];
      Object.keys(dataValues).forEach(key => {
        array_raw.push(data[key]);
      });
      // if status is on then deduct campaign fund from Emerald account funds
      if (array_raw[4] && array_raw[5]) {
        localStorage.setItem("FundSum", localStorage.getItem("FundSum") + Number.parseInt(array_raw[4]));
      }
    });

    emeraldBalance.current = emeraldBalance.current - localStorage.getItem("FundSum");
  }

  function TableTd(data) {
    let array = [];

    Object.keys(dataValues).forEach(key => {
      if (dataValues[key][1] === "bool") {
        array.push([<td>{data['data'][key] ? "on" : "off"}</td>]);
      } else if (dataValues[key][1] === "zł") {
        array.push([<td>{data['data'][key]} zł</td>]);
      } else if (dataValues[key][1] === "km") {
        array.push([<td>{data['data'][key]} km</td>]);
      } else {
        // if string / number
        array.push([<td>{data['data'][key]}</td>]);
      }
    });
    // hide id column
    array[0] = [];
    return (array);
  }

  // run after 3 seconds
  //setTimeout(recalculateBalance, 3000);

  return (
    <div>
      <h2>Campaign list</h2>
      <div className="table-scroll-div">
        <table className="prettyTable">
          <thead>
            <tr>
              <TableTh />
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {APIData.map((data) => {
              return (
                <tr key={data.id}>
                  <TableTd data={data} />
                  <td>
                    <Link to="/update">
                      <button className="button-update" onClick={() => setData(data)}>Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button className="button-delete" onClick={() => onDelete(data.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <div className="form-footer">
        <Link to="/create">
          <button className="button-add">Add</button>
        </Link>
      </div>
      <p>Emerald account balance: {emeraldBalance.current}</p>
    </div>
  );
}

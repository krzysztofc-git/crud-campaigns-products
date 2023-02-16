import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";
import "jquery-ui/themes/base/theme.css";
import "jquery-ui/themes/base/core.css";

export default function Update() {
  const [id, setID] = useState(null);
  const [campaignName, setCampaignName] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);
  const [campaignFund, setCampaignFund] = useState(0);
  const [status01, setStatus01] = useState(false);
  const [town, setTown] = useState('');
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setCampaignName(localStorage.getItem("Campaign name"));
    setKeywords(localStorage.getItem("Keywords"));
    setBidAmount(parseInt(localStorage.getItem("Bid amount")));
    setCampaignFund(parseInt(localStorage.getItem("Campaign fund")));
    setStatus01(localStorage.getItem("Status") === "true");
    setTown(localStorage.getItem("Town"));
    setRadius(parseInt(localStorage.getItem("Radius")));

    const form = document.getElementById("campaign-form");
    function handleForm(event) {
      event.preventDefault();
    }
    form.addEventListener("submit", handleForm);

  }, []);

  const updateAPIData = () => {
    axios
      .put(process.env.REACT_APP_API_URL.concat(`/${id}`), {
        campaignName, keywords, bidAmount, campaignFund, status01, town, radius
      })
      .then(() => {
        history("/read");
      })
      .catch(function (error) {
        alert("Error");
      });
  };

  let history = useNavigate();

  $(function() {
    var keywordsList = [
      "truck", "cars for sale", "perfumes", "old video game consoles", "farming", "museum"
    ];
    $("#keywords-input").autocomplete({
      source: keywordsList
    });
  });

  return (
    <div>
      <h2>Update</h2>
      <form id="campaign-form" onSubmit={updateAPIData}>
        <label>Campaign name<br />
          <input
            placeholder="Enter campaign name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </label>
        <label>
          Keywords<br />
          <input
            id="keywords-input"
            placeholder="Enter keywords"
            defaultValue={keywords}
            onBlur={(e) => setKeywords(e.target.value)}
            required
          />
        </label>
        <label>
          Bid amount [zł]<br />
          <input
            type="number"
            placeholder="Enter bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(parseInt(e.target.value))}
            min="1"
            required
          />
        </label>
        <label>
          Campaign fund [zł]<br />
          <input
            type="number"
            placeholder="Enter campaign fund"
            value={campaignFund}
            onChange={(e) => setCampaignFund(parseInt(e.target.value))}
            min="1"
            required
          />
        </label>
        <label>
          Status<br />
          <select value={status01} onChange={(e) => setStatus01(e.target.value)}>
            <option value={false}>off</option>
            <option value={true}>on</option>
          </select>
        </label>
        <label>
          Town<br />
          <select value={town} onChange={(e) => setTown(e.target.value)}>
            <option value="">Select town</option>
            <option value="Kraków">Kraków</option>
            <option value="Warszawa">Warszawa</option>
            <option value="Poznań">Poznań</option>
            <option value="Gdańsk">Gdańsk</option>
            <option value="Kielce">Kielce</option>
            <option value="Inne">Inne</option>
          </select>
        </label>
        <label>
          Radius [km]<br />
          <input
            type="number"
            placeholder="Enter radius in kilometers"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            min="1"
            required
          />
        </label>
        <div className="form-footer">
          <button className="button-update" type="submit" id="submit">
            Update
          </button>
          <Link to="/read">
            <button className="button-list">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

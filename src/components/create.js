import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";
import "jquery-ui/themes/base/theme.css";
import "jquery-ui/themes/base/core.css";

export default function Create() {
  const [campaignName, setCampaignName] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);
  const [campaignFund, setCampaignFund] = useState(0);
  const [status01, setStatus01] = useState(false);
  const [town, setTown] = useState('');
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const form = document.getElementById("campaign-form");
    function handleForm(event) {
      event.preventDefault();
    }
    form.addEventListener("submit", handleForm);
  }, []);

  const postData = () => {
    axios
      .post(process.env.REACT_APP_API_URL, {
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
      <h2>Create</h2>
      <form id="campaign-form" onSubmit={postData}>
        <label>Campaign name<br />
          <input
            placeholder="Enter campaign name"
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </label>
        <label>
          Keywords<br />
          <input
            id="keywords-input"
            placeholder="Enter keywords"
            onBlur={(e) => setKeywords(e.target.value)}
            required
          />
        </label>
        <label>
          Bid amount [zł]<br />
          <input
            type="number"
            placeholder="Enter bid amount"
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
            onChange={(e) => setCampaignFund(parseInt(e.target.value))}
            min="1"
            required
          />
        </label>
        <label>
          Status<br />
          <select onChange={(e) => setStatus01(e.target.value)}>
            <option value={false}>off</option>
            <option value={true}>on</option>
          </select>
        </label>
        <label>
          Town<br />
          <select onChange={(e) => setTown(e.target.value)}>
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
            placeholder="Enter radius"
            onChange={(e) => setRadius(parseInt(e.target.value))}
            min="1"
            required
          />
        </label>
        <div className="form-footer">
          <button className="button-add" type="submit" id="submit">
            Add
          </button>
          <Link to="/read">
            <button className="button-list">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

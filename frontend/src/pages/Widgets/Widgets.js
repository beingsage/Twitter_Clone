import React from "react";
import "./Widgets.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";


function Widgets() {
     const navigate = useNavigate();
     const handleSubscribeClick = () => {
       navigate('/premium');
     };
  return (
    <div className="widgets">
       <div className="widgets__widgetContainer">
        <h4>Subscribe to Premium</h4>
        <h6>Subscribe to unlock new features and</h6> 
        <h6>if eligible, receive a share of ads revenue.</h6>
        <Button variant="outlined" className="sidebar__tweet" onClick={handleSubscribeClick} >
        Subscribe
      </Button>
      </div> 
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>

        <TwitterTweetEmbed tweetId={"1557187138352861186"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
}
export default Widgets;
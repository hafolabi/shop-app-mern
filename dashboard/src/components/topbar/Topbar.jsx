import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";

export default function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(logout());
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">theInsights Admin</span>
        </div>

        <div className="topRight">
          <div className="topbarIconContainer">
            <button
              onClick={handleClick}
              style={{
                fontWeight: "600",
                fontSize: "13px",
                border:'none',
                width:'100px',
                borderRadius:'5px',
                cursor:'pointer',
                color: 'white',
                backgroundColor:'darkblue',
                marginBottom: "5px",
              }}
            >
              Logout
            </button>
          </div>

          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconContainer">
            <Language />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconContainer">
            <Settings />
          </div>

          <img
            src="https://i.ibb.co/XzMZKF0/Beautiful-mid-adult-african-american-woman-standing-on-grey-wall-with-crossed-arms-Mature-indian-wom.jpg"
            alt=" "
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "./user.css";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  CalendarToday,
  Publish,
} from "@material-ui/icons";
import {Link} from 'react-router-dom'

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to='/newUser'>
        <button className="userAddButton">Create</button>
        </Link>
      </div>

      <div className="userContainer">
        <div className="userDisplay">
          <div className="userDisplayTop">
            <img
              className="userDisplayImg"
              src="https://i.ibb.co/bvBGdrZ/360-F-203778892-ctopw9p-JDwz5xt-DHe-ZALs7p1ie-Geie-TB-Copy.jpg"
              alt=""
            />

            <div className="userDisplayTopTitle">
              <span className="userDisplayName">Afo Oladip</span>
              <span className="userDisplayUserTitle"> Software Engineer</span>
            </div>
          </div>

          <div className="userDisplayBottom">
            <span className="userDisplayTitle">Account Details</span>

            <div className="userDisplayInfo">
              <PermIdentity className="userDisplayIcon" />
              <span className="userDisplayInfoUsername">afoolad99</span>
            </div>

            <div className="userDisplayInfo">
              <CalendarToday className="userDisplayIcon" />
              <span className="userDisplayInfoUsername">09.06.1998</span>
            </div>

            <span className="userDisplayTitle">Contact Details</span>

            <div className="userDisplayInfo">
              <PhoneAndroid className="userDisplayIcon" />
              <span className="userDisplayInfoUsername">+234 810 808 892</span>
            </div>

            <div className="userDisplayInfo">
              <MailOutline className="userDisplayIcon" />
              <span className="userDisplayInfoUsername">
                afoolad98@gmail.com
              </span>
            </div>

            <div className="userDisplayInfo">
              <LocationSearching className="userDisplayIcon" />
              <span className="userDisplayInfoUsername">Lagos | Nigeria</span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
              
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="afoolad99"
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Fullname</label>
                <input
                  type="text"
                  placeholder="Afo Oladip"
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="afoolad98@gmail.com"
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+234 810 808 892"
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Lagos | Nigeria"
                  className="userUpdateInput"
                />
              </div>
            </div>

            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://i.ibb.co/bvBGdrZ/360-F-203778892-ctopw9p-JDwz5xt-DHe-ZALs7p1ie-Geie-TB-Copy.jpg"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className='userUpdateIcon' />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

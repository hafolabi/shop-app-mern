import React from "react";
import "./sidebar.css";
import {Link} from 'react-router-dom'
import {LineStyle, Timeline, TrendingUp, 
PermIdentity,
Storefront,
AttachMoney,
BarChart,
MailOutline,
DynamicFeed,
ChatBubbleOutline,
WorkOutline,
Report
} from '@material-ui/icons'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">

            <Link to='/' className='link'> 
            <li className="sidebarlistItems active">
              <LineStyle className='sidebarIcons' />
              Home 
            </li>
            </Link>

            <li className="sidebarlistItems">
              <Timeline className='sidebarIcons' />
              Analytics
            </li>

            <li className="sidebarlistItems">
              <TrendingUp className='sidebarIcons' />
              Sales
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">

            <Link to='/users' className="link">
            <li className="sidebarlistItems">
              <PermIdentity className='sidebarIcons' />
              User
            </li>
            </Link>

            <Link to='/products' className="link">
            <li className="sidebarlistItems">
              <Storefront className='sidebarIcons' />
              Product
            </li>
            </Link>

            <li className="sidebarlistItems">
              <AttachMoney className='sidebarIcons' />
              Transactions
            </li>

            <li className="sidebarlistItems">
              <BarChart className='sidebarIcons' />
              Report
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">

            <li className="sidebarlistItems">
              <MailOutline className='sidebarIcons' />
              Mail
            </li>

            <li className="sidebarlistItems">
              <DynamicFeed className='sidebarIcons' />
              Feedback
            </li>

            <li className="sidebarlistItems">
              <ChatBubbleOutline className='sidebarIcons' />
              Messages
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">

            <li className="sidebarlistItems">
              <WorkOutline className='sidebarIcons' />
              Manage
            </li>

            <li className="sidebarlistItems">
              <Timeline className='sidebarIcons' />
              Analytics
            </li>

            <li className="sidebarlistItems">
              <Report className='sidebarIcons' />
              Report
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}

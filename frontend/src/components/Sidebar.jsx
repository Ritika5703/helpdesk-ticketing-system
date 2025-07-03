import React, { useState } from "react";
import ChevronIcon from "../assets/icons/chevronicon.svg?react";

import DashboardIcon from "../assets/icons/dashboard.svg?react";
import DatabaseIcon from "../assets/icons/database.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import HistoryIcon from "../assets/icons/history.svg?react";
import PerformanceIcon from "../assets/icons/performance.svg?react";
import TicketApprovalIcon from "../assets/icons/ticket-approval.svg?react";
import NewTicketIcon from "../assets/icons/new-ticket.svg?react";
import MyTicketIcon from "../assets/icons/my-ticket.svg?react";
import UserIcon from "../assets/icons/user.svg?react";
import OperationTeamIcon from "../assets/icons/ops.svg?react";
import TechSupportIcon from "../assets/icons/tech-support.svg?react";

import { Link } from "react-router-dom";

const SidebarItem = ({
  icon,
  label,
  to,
  isExpandable = false,
  expanded = false,
  onClick,
  children,
}) => (
  <div>
    <div
      className={`flex items-center cursor-pointer hover:opacity-70 pl-2 ${
        isExpandable ? "justify-between" : ""
      }`}
      onClick={onClick}
    >
      <Link
        to={to}
        className="flex items-center space-x-3 cursor-pointer hover:opacity-70 pl-2"
      >
        {isExpandable && (
          <ChevronIcon
            className={`w-3 h-3 transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
          />
        )}
        {icon}
        <span className="text-base font-medium">{label}</span>
      </Link>
    </div>
    {isExpandable && expanded && (
      <div className="ml-6 space-y-2 mt-2">{children}</div>
    )}
  </div>
);

const Sidebar = ({ role = "user" }) => {
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [databaseOpen, setDatabaseOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <aside className="bg-gray-200 w-full md:w-64 p-6 space-y-4">
      {/* DASHBOARD COLLAPSIBLE */}
      <SidebarItem
        icon={<DashboardIcon className="w-5 h-5" />}
        label="Dashboard"
        to="/dashboard"
        isExpandable
        expanded={dashboardOpen}
        onClick={() => setDashboardOpen(!dashboardOpen)}
      >
        {role === "user" && (
          <>
            <SidebarItem
              icon={<NewTicketIcon className="w-4 h-4" />}
              label="New Ticket"
              to="/create-ticket"
            />
            <SidebarItem
              icon={<MyTicketIcon className="w-4 h-4" />}
              label="My Ticket"
              to="/my-ticket"
            />
          </>
        )}

        {role === "operation" && (
          <>
            <SidebarItem
              icon={<TicketApprovalIcon className="w-4 h-4" />}
              label="Ticket Approval"
            />
            <SidebarItem
              icon={<MyTicketIcon className="w-4 h-4" />}
              label="My Ticket"
            />
            <SidebarItem
              icon={<PerformanceIcon className="w-4 h-4" />}
              label="Performance"
            />
          </>
        )}

        {role === "technical" && (
          <>
            <SidebarItem
              icon={<MyTicketIcon className="w-4 h-4" />}
              label="My Ticket"
              to="/my-tickets"
            />
            <SidebarItem
              icon={<PerformanceIcon className="w-4 h-4" />}
              label="Performance"
            />
          </>
        )}

        {role === "admin" && (
          <>
            <SidebarItem
              icon={<DatabaseIcon className="w-4 h-4" />}
              label="Database"
              isExpandable
              expanded={databaseOpen}
              onClick={() => setDatabaseOpen(!databaseOpen)}
            >
              <SidebarItem
                icon={<UserIcon className="w-4 h-4" />}
                label="User"
                isExpandable
                expanded={userOpen}
                onClick={() => setUserOpen(!userOpen)}
              >
                <SidebarItem
                  icon={<OperationTeamIcon className="w-4 h-4" />}
                  label="Operation Team"
                />
                <SidebarItem
                  icon={<TechSupportIcon className="w-4 h-4" />}
                  label="Technical Support"
                />
              </SidebarItem>
            </SidebarItem>

            <SidebarItem
              icon={<SettingsIcon className="w-4 h-4" />}
              label="Setting"
            />
            <SidebarItem
              icon={<HistoryIcon className="w-4 h-4" />}
              label="User Log History"
            />
          </>
        )}
      </SidebarItem>
    </aside>
  );
};

export default Sidebar;

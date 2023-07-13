import { Link, NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./header.sass";
import { Button, Popover, Typography } from "@mui/material";
import { useState } from "react";
function Header() {
    const [anchor, setAnchor] = useState(null);

    const openPopover = (event) => {
      setAnchor(event.currentTarget);
    };

    const open = Boolean(anchor);

    const id = open ? "simple-popover" : undefined;

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    }

    const handleClose = (params) => {
        setAnchor(null);
    }

    return (
        <header>
            <div className="left">
                <img src="/images/icon.svg" />
            </div>
            <div className="nav-menu">
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
                >
                    <img src="/images/home.svg" className="small-text" />
                </NavLink>
                <NavLink
                    to="/contacts"
                    className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
                >
                    <img src="/images/contacts.svg" className="small-text" />
                </NavLink>
            </div>
            <div className="user-menu">
                <AccountCircleIcon fontSize="large" onClick={handleClick}/>
                <Popover
                    id={id}
                    open={Boolean(anchor)} 
                    anchorEl={anchor}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <Typography sx={{ p: 2 }}>Log in</Typography>
                </Popover>
            </div>
        </header>
    );
}

export default Header;

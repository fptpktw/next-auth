"use client";
import { useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { TbUsers, TbNotes } from "react-icons/tb";
import { TbHome, TbPhotoSquareRounded } from "react-icons/tb";
import { BsTextIndentLeft, BsTextIndentRight } from "react-icons/bs";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import {
  TbIndentIncrease,
  TbIndentDecrease,
  TbAlignJustified,
  TbMoon ,
  TbSunHigh 
} from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import IconButton from "@mui/material/IconButton";
import { LuAlarmCheck } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import {
  drawerState,
  selectedMenuState,
  activeSubMenuState,
  isDarkModeState
} from "../store/drawerState";
import { signOut } from "next-auth/react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Hourglass } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const drawerWidth = 250;
// ธีมแบบ Light
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f4f6f8",
    },
    text: {
      primary: "#1b1c28",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#f4f6f8",
        },
      },
    },
  },
});

// ธีมแบบ Dark
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#191e32",
    },
    text: {
      primary: "#dcdcdc",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#191e32",
        },
      },
    },
  },
});

export default function ClippedDrawer() {
  const router = useRouter();
  const [open, setOpen] = useRecoilState(drawerState);
  const [activeSubMenu, setActiveSubMenu] = useState(activeSubMenuState);
  const [processing, setProcessing] = useState(false);
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);
  const { data: session, status } = useSession();
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);

  useEffect(() => {
    console.log("ss", window.location.pathname, selectedMenu, session);
    setOpen(true);
    const savedMenu = localStorage.getItem("selectedMenu");
    if (savedMenu) handleItemClick(savedMenu);
    const activeSubMenu = localStorage.getItem("activeSubMenu");
    if (activeSubMenu) handleSubMenuClick(activeSubMenu);
    const darkMode = localStorage.getItem("isDarkMode");
    if (darkMode === "true") setIsDarkMode(true); 
    // if (isDarkMode) {
    //   document.documentElement.setAttribute('data-theme', 'dark');
    // } else {
    //   document.documentElement.setAttribute('data-theme', 'light');
    // }
    // if (typeof window != "undefined")
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem("isDarkMode", newIsDarkMode);
  };

  const handleItemClick = (text) => {
    if (session) {
      const sessionExpiry = new Date(session.expires);
      if (sessionExpiry < new Date()) {
        Swal.fire({
          text: "Your session has expired. You will be redirected to the login page.",
          icon: "error",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            signOut({ callbackUrl: "/login" });
          }
        });
      }
    }
    setSelectedMenu(text);
    localStorage.setItem("selectedMenu", text);
  };

  const handleSubMenuClick = (text) => {
    if (activeSubMenu === text) {
      setActiveSubMenu(null);
      localStorage.setItem("activeSubMenu", null);
    } else {
      setActiveSubMenu(text);
      localStorage.setItem("activeSubMenu", text);
    }
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const menuItems = [
    { text: "Home", path: "/", icon: <TbHome /> },
    {
      text: "About",
      path: "/about",
      icon: <TbNotes />,
      subItems: [
        { text: "Team", path: "/about/team" },
        { text: "Mission", path: "/about/mission" },
      ],
    },
    {
      text: "About2",
      path: "/about",
      icon: <TbPhotoSquareRounded />,
      subItems: [
        { text: "Team2", path: "/about/team" },
        { text: "Mission2", path: "/about/mission" },
      ],
    },
    { text: "Employee", path: "/welcome", icon: <TbUsers /> },
  ];

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex", pl: 1 }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              boxShadow: "0 3px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <div className={`flex justify-between px-5 py-1 shadow-sm ${isDarkMode ? "bg-[#212c4d] shadow-slate-900" : "bg-white shadow-gray-200"}`}>
              <div className="flex">
                <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, color: "gray" }}
                >
                  {/* { open ? <BsTextIndentRight /> : <BsTextIndentLeft /> } */}
                  {/* { open ? <RiMenuUnfold2Line /> : <RiMenuFold2Line /> } */}
                  {open ? <TbIndentDecrease /> : <TbAlignJustified />}
                </IconButton>
                <Link
                  href="/"
                  className="text-2xl py-0 gradient-text"
                  style={{ marginTop: "4px" }}
                >
                  <b>NEXTAUTH</b>
                </Link>
              </div>
              <div className="flex">
                {session ? (
                  <pre className="text-gray-500 px-5 mt-1.5">
                    {session.user.username}
                  </pre>
                ) : (
                  ""
                )}
                <IconButton
                  edge="start"
                  onClick={toggleTheme}
                  sx={{ color: "gray", px: "10px" }}
                >
                  {isDarkMode ? <TbSunHigh style={{ fontSize: "20px" }} /> : <TbMoon style={{ fontSize: "20px" }} />}
                </IconButton>
                &nbsp;&nbsp;
                <IconButton
                  edge="start"
                  onClick={() => {
                    setProcessing(true);
                    localStorage.clear();
                    signOut({
                      callbackUrl: "/login",
                    });
                  }}
                  sx={{ color: "gray", px: "10px" }}
                >
                  {processing ? (
                    <Hourglass
                      height="25"
                      width="20"
                      colors={["#828282", "#828282"]}
                    />
                  ) : (
                    <LuLogOut style={{ fontSize: "20px" }} />
                  )}
                </IconButton>
              </div>
            </div>
          </AppBar>
          <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box
              sx={{ overflow: "auto" }}
              className={`rounded-xl p-1 mx-2 scrollbar-hide overflow-y-scroll shadow-md ${ isDarkMode ? "shadow-slate-900" : "shadow-gray-200" } `}
              style={{backgroundColor: isDarkMode ? "#212c4d" : "white"}}
            >
              <List sx={{ py: 0 }}>
                {menuItems.map((item, index) => (
                  <Fragment key={index}>
                    <ListItem
                      key={index}
                      disablePadding
                      className={`cursor-pointer ${
                        selectedMenu === item.text
                          ? // ? "bg-menu-active rounded-xl"
                            "text-gray-500"
                          : "text-gray-500"
                      }`}
                    >
                      <ListItemButton
                        className="hover:rounded-lg hover:bg-gray-100 transition-all duration-300"
                        sx={{ px: 1, py: 0.3 }}
                        onClick={() => {
                          item.subItems
                            ? handleSubMenuClick(item.text)
                            : (router.push(item.path),
                              handleItemClick(item.text));
                        }}
                      >
                        <ListItemIcon
                          style={{
                            color: selectedMenu === item.text ? "gray" : "gray",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        {item.subItems ? (
                          activeSubMenu === item.text ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )
                        ) : null}
                      </ListItemButton>
                    </ListItem>
                    {/* Sub Menu */}
                    {item.subItems && (
                      <Collapse
                        in={activeSubMenu === item.text}
                        sx={{ pl: 2 }}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem, subIndex) => (
                            <ListItem
                              key={subIndex}
                              disablePadding
                              className={`cursor-pointer ${
                                selectedMenu === subItem.text
                                  ? // ? "bg-menu-active rounded-xl"
                                    "text-gray-500"
                                  : "text-gray-500"
                              }`}
                            >
                              <ListItemButton
                                key={subIndex}
                                sx={{ pl: 2, py: 0.3 }}
                                onClick={() => {
                                  router.push(subItem.path);
                                  handleItemClick(subItem.text);
                                }}
                                className="hover:rounded-lg hover:bg-gray-100 transition-all duration-300"
                              >
                                <ListItemText primary={subItem.text} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </Fragment>
                ))}
              </List>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 4,
              width: open ? `calc(100% - 240px)` : "100%",
            }}
          ></Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

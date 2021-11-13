

import React, { useState, useEffect, useMemo } from 'react';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


import RDFA from './rdfa';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const apink = pink[500];
const drawerWidth = "30%";
const drawerWidthMobile = "70%";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: 
//     }
//   }
// })

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1200,
      xl: 1536,
    },
  },
});


function TOC(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [toc, setTOC] = React.useState(<></>);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    props.children
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  // ----------
  //  steal the toc
  useEffect(() => {
    let thetoc = document.getElementById('toc');
    let toc_component = ReactHtmlParser(thetoc.outerHTML);
    thetoc.remove();
    setTOC(toc_component);
  }, [])


  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          visibility: 'hidden',
          ml: { sm: `${drawerWidth}px` },
          borderLeft: "none"
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="end"
            size="large"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, 
            visibility: 'visible' , color: "#ff0000", 
            marginLeft: "auto", marginRight: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            filter: "drop-shadow(5px 5px 5px #eee)"
          }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      </Slide>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="table of contents"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          id="drawer1"
          anchor="right"
          container={container}
          variant="temporary"
          className="mobile-toc-drawer"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidthMobile },
          }}
        >
        {toc}
        <RDFA/>
        </Drawer>
        <Drawer
          id="drawer2"
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs:'none', sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
        {toc}
        <RDFA/>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth})` } }}
      >
        <Toolbar />
      </Box>
    </Box>
    </ThemeProvider>
  );
}

TOC.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default TOC;
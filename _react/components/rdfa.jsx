// use this: https://github.com/rdfa/rdfa.github.io/blob/master/play/play.js

import React, { useState, useEffect, useMemo } from 'react';
import { groupBy } from 'lodash-es';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function RDFA(props){

  // console.log('ya2');
  const [faded, setFaded] = useState(false);
  const [highlighted, setHighlighted] = useState();

  const bodyClicked = function(el){
    // console.log('body clicked', el);
  }

  const elementClicked = function(el){
    el = el.target;
    // if (!el.classList.contains('rdfa')){
    //  el = resolveParents(el);
    // }
    let linkel = resolveParents(el);
    let link = links.filter(link => link.element == linkel)[0]
    

    if (faded === true){
      setFaded(false);
      setHighlighted(undefined);
    } else {
      setFaded(true)
      setHighlighted(link);
    }
  }

  const resolveParents = function(el){
    while (!el.classList.contains('rdfa')){
      el = el.parentElement;
    }
    return(el);
  }

  const links = useMemo(() => {

    let link_els = document.querySelectorAll('.rdfa');
    // console.log(link_els);
    link_els.forEach(el => {
      el.onclick = elementClicked
    })

    let link_arr = Array.from(link_els).map(el => {
      return({
        resource: el.getAttribute('resource'),
        property: el.getAttribute('property'),
        typeof: el.getAttribute('typeof'),
        'element': el
      })
    })
    // console.log(link_arr)
    return(link_arr)
  })

  // init links
  useEffect(() => {
    document.body.onclick = bodyClicked;
  }, [])

  // fade page
  useEffect(() => {
    if (faded === true){
      document.body.classList.add('faded')
    } else {
      document.body.classList.remove('faded')
    }
  }, [faded])

  // highlight 
  useEffect(() => {
    // console.log('highlight', links, highlighted)
    links.forEach(link => {
      if (highlighted === undefined || link.resource !== highlighted.resource){
        link.element.classList.remove('highlighted')
      } else {
        link.element.classList.add('highlighted')
      }
      link.element.classList.remove('primary')
    });
    if (highlighted !== undefined){
      highlighted.element.classList.add('highlighted');
      highlighted.element.classList.add('primary');
      // console.log('scrollto', highlighted.element);
      highlighted.element.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }, [highlighted])

  const itemView = function(highlighted){
    let res_links = links.filter(link => link.resource == highlighted.resource)
    // console.log('highlighted', highlighted);
    let objects = Object.keys(groupBy(res_links, 'property')).map(property => (property));
    return(
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {highlighted.resource}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {highlighted.element.textContent}
        </Typography>
      </Box>  
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        {propertyView(res_links)}
      </Box>
    </Box>
    )
  }

  const propertyView = function(links){
    return(<>{Object.keys(groupBy(links, 'property')
      ).filter(property => property != 'null'
      ).map(property => (
              <>
              <Typography key={property}>{property}</Typography>
              {links.filter(link => link.property === property).map(link => (
                <Card variant="outlined" key={link.property} onClick={function(){setHighlighted(link)}}>
                <Typography color="text.secondary" variant="body2">
                {link.element.textContent}
                </Typography>
              </Card>
              ))}<Divider variant="middle"/></>
          ))}</>)
  }
  // {Object.entries(groupBy(links, 'property')).forEach(
  //  (prop, s)
  //  )}
  

  return(
  <Card>
    {highlighted ? itemView(highlighted) : <div></div>}
  </Card>
  )

}


import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Badge from '@mui/material/Badge';


function MyCard({ image, name, year, likes}) {
 
  return (
    <Card height={"auto"} key={name+year+Math.random()} style={{ backgroundColor: 'transparent' }} variant='outlined'>
      <CardMedia component="img" width="100%" image={image} alt={name} />
      <CardContent style={{backgroundColor:'transparent !important',height:"100px"}}>
        <Typography color={"white"} variant="h6">{name}</Typography>
        <Typography color={"white"} variant="body2">{year}</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography color={"white"} variant="body2">{likes} Likes</Typography>
          <IconButton>
            <ThumbUpIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default MyCard;

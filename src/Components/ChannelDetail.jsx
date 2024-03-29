import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { Videos, ChannelCard}  from './';
import { fetchFromAPI } from '../utils/youtubeAPI';
const ChannelDetail = () => {
  const {id}=useParams();
  const [channelDetail, setChannelDetail]= useState(null);
  const [videos, setVideos]=useState([]);
  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data)=>setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data)=>setVideos(data?.items));


  },[id]);
  console.log('videos in channelmdetail.',videos);
  return (
    <Box minHeight='95vh'>
      <Box>
          <div style={{background: 'linear-gradient(90deg, rgba(43,2,45,1) 0%, rgba(0,212,255,1) 100%, rgba(73,38,94,1) 100%)', zIndex:10,height:'300px'}} />
          <ChannelCard channelDetail={channelDetail} marginTop='-110px'/>
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{ mr:{ sm:'45px' },}} />
          <Videos videos={videos} />

        
      </Box>

    </Box>
  )
}

export default ChannelDetail
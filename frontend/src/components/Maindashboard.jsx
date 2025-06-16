import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import axios from 'axios';

export const Maindashboard = () => {

    const [params,setparams] = useSearchParams();

    const[Accesstoken,setAccesstoken]   = useState('');
    const[refreshtoken,setrefreshtoken] = useState('');
    
    const[VideoResult,setVideoResult] = useState({});

    useEffect(() => {

        const acctoken = params.get('accesstoken');
        console.log('acc token =',acctoken);
        setAccesstoken(acctoken);
    
        console.log('ref token = ',params.get('refreshtoken'));
        const reftoken = params.get('refreshtoken');
        setrefreshtoken(reftoken);
        
        localStorage.setItem('access_token',acctoken);
        localStorage.setItem('refresh_token',reftoken);
        
    },[params])


    useEffect(() => {
        console.log('Acc token =',Accesstoken);
        
         async function fetchvideo(){
            if(Accesstoken){
                const Response = await axios.get('/api/v1/mychannel',{
                     headers : {
                        'Content-Type'  : 'application/json',
                        'Authorization' :  `Bearer ${Accesstoken}`
                     }     
                });
                console.log('Channel Response =',Response?.data?.channelid);

                const VideoResponse = await axios.get('/api/v1/videoid',{
                    headers : {                                                              
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${Accesstoken}`
                    }
                });
                
                console.log('Videoo Response =',VideoResponse?.data?.videoDetails);
                setVideoResult(VideoResponse?.data?.videoDetails);
            }
         }
         fetchvideo();
    },[Accesstoken])

    return (
        <div className="px-4">
            <div className="text-2xl p-4 font-medium "> Main Logged dash - board is here </div>
            <div className="">
                <div className="w-[200px] h-[200px]">
                   <img src =  {VideoResult?.Imgurl}  alt = {VideoResult?.title} />
                </div>
                   <h2> Title - {VideoResult?.title} </h2>
                   <h3> Description - {VideoResult?.desc} </h3>
            </div>
        </div>
    )
}
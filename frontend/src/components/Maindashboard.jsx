import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from 'axios';

export const Maindashboard = () => {

    const [params,setparams] = useSearchParams();

    const[Accesstoken,setAccesstoken]   = useState('');
    const[refreshtoken,setrefreshtoken] = useState('');
    
    const[VideoResult,setVideoResult] = useState({});
    const[Newtitle,setNewtitle] = useState('');
    const[NewDesc,setNewDesc]   = useState('');
    const[showinputbar,setshowinputbar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const acctoken = params.get('accesstoken');
        const reftoken = params.get('refreshtoken');

        console.log('Accesstoken =',Accesstoken);
        console.log('refreshtoken =',refreshtoken);
        if(acctoken && reftoken){
            localStorage.setItem('access_token',acctoken);
            localStorage.setItem('refresh_token',reftoken);
            
            console.log(' at enddddddd',);
            navigate(window.location.pathname,{  replace : true });
        }

    },[navigate])

    useEffect(() => {
        const Acctoken = localStorage.getItem('access_token');
        setAccesstoken(Acctoken);
        const Reftoken = localStorage.getItem('refresh_token');
        setrefreshtoken(Reftoken);
    },[])


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
    },[Accesstoken,Newtitle])

    const Titledithandler = () => {
        //  show input bar 
        setshowinputbar((prev) => !prev);
    }

    const updatetitlehandler = async() => {
        console.log('new title-',Newtitle);
        const NewDesc = "aujla desc"
         setshowinputbar((prev) => !prev);

        const UpdateResponse = await axios.put('/api/v1/content',{
            title : Newtitle,
            desc  : NewDesc
        },{
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${Accesstoken}`
            }
        })
        console.log('Update Response =',UpdateResponse);

    }


    return (
        <div className="px-4">
            <div className="text-2xl p-4 font-medium "> Main Logged dash - board is here </div>
            <div className="">
                <div className="w-[200px] h-[200px]">
                   <img src =  {VideoResult?.Imgurl}  alt = {VideoResult?.title} />
                </div>
                   <h2> Present Title - {VideoResult?.title} </h2>
                   <div>
                      {showinputbar &&  (<> 
                      <input type = "text" placeholder = "Enter new title" value = {Newtitle} onChange={(e) => setNewtitle(e.target.value)} /> 
                       </>)}

                       {showinputbar ? (<> 
                       <button className="bg-black text-white px-4 py-2 rounded-xs" 
                      onClick={updatetitlehandler}
                      > update title </button>
                       </>) : (<>
                       
                       <button className="bg-black text-white px-4 py-2 rounded-xs" 
                      onClick={Titledithandler}
                      > Edit title </button> </>)}

                   </div>
                   <div>
                      
                   </div>
                   {/* <h3> Description - {VideoResult?.desc} </h3> */}
            </div>
        </div>
    )
}
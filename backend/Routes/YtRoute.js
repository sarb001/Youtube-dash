import express from 'express'
import axios from 'axios';

const router = express.Router();

router.get('/login' , async(req,res) => {
     try {
        return res.status(200).json({
            message : "Inside login"
        })
    } catch (error) {
         return res.status(500).json({
             message : "Login error "
         })
     }
});


router.get('/auth/youtube' , async(req,res,next)   => {
   try {
    const Authurls = `${process.env.AUTH_URL}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.Redirect_uri}&response_type=code&scope=${process.env.Scope}&access_type=offline&prompt=consent`;

        console.log('Auth url is -',Authurls);
        res.json({  url : Authurls })

   } catch (error) {
     console.log('error =',error);
      return res.status(500).json({
        message : "Rdirection failed"
      })
   }
})

router.get('/callbackurl' , async(req,res,next) => {
    try {
        const code = req.query.code;
        console.log('code query -',code);
  
        const Resp = await axios.post(process.env.Token_url,
          {
           code,
           client_id : process.env.CLIENT_ID,
           client_secret : process.env.CLIENT_SECRET,
           redirect_uri: process.env.Redirect_uri,
           grant_type : 'authorization_code',
        }, { headers : { 'Content-Type' : 'application/json' }})
  
        const { access_token , refresh_token } = Resp?.data;
        console.log(' tokens are =',access_token);
        console.log(' refresh_token are =', refresh_token);

        return res.status(200).json({
            message : "got the token"
        })
        
    } catch (error) {
        return res.status(500).json({
            message : "token fetch error "
        })
     }
})

router.get('/videoid' , async(req,res) => {
     try {
        const videoid = 'C9Ha9aRvJaA';

        // dummy Accesstoken
        const Accesstoken = 'ya29....'

        const Response = await axios.get(`${process.env.MAIN_URL}/videos`,{
            params : {
                part : 'snippet,contentDetails,statistics',
                id : videoid,
                key : process.env.API_KEY
            },
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${Accesstoken}`
            }
        })

         console.log(' title = ',Response?.data?.items[0]?.snippet?.title);
         console.log(' desc = ',Response?.data?.items[0]?.snippet?.description);
         console.log(' channel id = ',Response?.data?.items[0]?.snippet?.channelId);
         console.log(' category id = ',Response?.data?.items[0]?.snippet?.categoryId);

        return res.status(200).json({
            videoDetails : {
                title : Response?.data?.items[0]?.snippet?.title,
                desc : Response?.data?.items[0]?.snippet?.description,
                channelid : Response?.data?.items[0]?.snippet?.channelId,
                categoryId : Response?.data?.items[0]?.snippet?.categoryId
            },
            message : " Fetched video details "
        })
    } catch (error) {
         return res.status(500).json({
             message : " Video Error "
         })
     }
})

// change title
// change desc

router.put('/content' , async(req,res,next) => {
     try {

         const NewTitle = "Updating Tiger Title";
         const NewDesc  = "Updating Desc to new tiger";

        const videoid = 'C9Ha9aRvJaA';
        // dummy Accesstoken
        const Accesstoken = 'ya29....'

         const UpdatedContent = await axios.put(`${process.env.MAIN_URL}/videos`,{
                "id": videoid,
                "snippet": {
                    "title": NewTitle,
                    "description" : NewDesc,
                    "categoryId": "22"
                }
         },{
               params : {
                part : 'snippet,contentDetails,statistics',
                id :   videoid,
                key : process.env.API_KEY
            },
            headers : {
                'Content-Type' : 'application/json',
                 'Authorization' : `Bearer ${Accesstoken}`
            }
         })

        console.log('updated content =',UpdatedContent?.data);

        return res.status(200).json({
             message : " Video  Content updates "
         })
     } catch (error) {
          return res.status(500).json({
             message : " Unable to update contents "
         })
     }
})


export default router;


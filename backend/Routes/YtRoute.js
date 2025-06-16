import express from 'express'
import axios from 'axios';

const router = express.Router();

router.get('/login' , async(req,res) => {
     try {
        return res.status(200).json({
            message : "Inside login....."
        })
    } catch (error) {
         return res.status(500).json({
             message : "Login error "
         })
     }
});


router.get('/auth/youtube' , async(req,res,next)   => {

    const Scope = "https://www.googleapis.com/auth/youtube.force-ssl" ;

   try {
    const Authurls = `${process.env.AUTH_URL}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.Redirect_uri}&response_type=code&scope=${Scope}&access_type=offline&prompt=consent`;

        console.log('Auth url is -',Authurls);
        res.redirect(Authurls);

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

        res.redirect(`http://localhost:5173/dashboard?accesstoken=${access_token}&refreshtoken=${refresh_token}`);
        
    } catch (error) {
        return res.status(500).json({
            message : "token fetch error "
        })
     }
})

router.get('/mychannel' , async(req,res) => {
     try {
        const Accesstoken = req?.headers?.authorization?.split(' ')[1] || req?.headers?.Authorization?.split(' ')[1];
        console.log('Acc token -',Accesstoken);

        if(!Accesstoken){
            return res.status(401).json({
                message : "UnAuthorized Request"
            })
        }

         const Resp = await axios.get(`${process.env.MAIN_URL}/channels`,{
            params : {
                part : 'snippet,contentDetails,statistics',
                 key : process.env.API_KEY,
                 mine : true,
            },headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${Accesstoken}`
            }
        });

        const channelId = Resp?.data?.items[0]?.id;
        console.log('Channel Details =',channelId)

        return res.status(200).json({
            channelid : channelId,
            message : " Fecthed channel detailss "
        })

     } catch (error) {
        console.log(' channel error =',error);
        return res.status(500).json({
            message : "My channel fetch error "
        })
     }
})

router.get('/videoid' , async(req,res) => {
     try {
        const videoid = 'C9Ha9aRvJaA';
        const Accesstoken = req?.headers?.authorization?.split(' ')[1] || req?.headers?.Authorization?.split(' ')[1];
        console.log('Acc token -',Accesstoken);

        if(!Accesstoken){
            return res.status(401).json({
                message : "UnAuthorized Request"
            })
        }

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
        
        const Imageurl = Response?.data?.items[0]?.snippet?.thumbnails?.high?.url ;
        // console.log('video resp =',Imageurl);

        return res.status(200).json({                                                     
            videoDetails : {
                Imgurl : Imageurl,
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

router.put('/content' , async(req,res,next) => {
     try {

         const NewTitle = "New tiger in the house ";
         const NewDesc  = "This is the plaxe in viena Africa";

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
        console.log('content update error =',error);
          return res.status(500).json({
             message : " Unable to update contents "
         })
     }
})

router.get('/allcomments' , async(req,res,next) => {
     try {

        const videoid = 'C9Ha9aRvJaA';
        const Accesstoken = 'ya29.....'

        const Response = await axios.get(`${process.env.MAIN_URL}/commentThreads`,{
            params : {
                part : 'snippet,replies',
                videoId :   videoid,
                key : process.env.API_KEY
            },
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${Accesstoken}`
            }
        })

        const AllComments = Response?.data?.items;
        
        const CommentItemArr = AllComments.map(i => i?.snippet?.topLevelComment?.snippet?.textDisplay);
        console.log('Response comments arr =',CommentItemArr);

        return res.status(200).json({
             comments : CommentItemArr,
             message : " Fetched all Comments "
         })

     } catch (error) {
        console.log(' comments error =',error);
          return res.status(500).json({
             message : " Unable to update contents "
         })
     }
})

router.post('/newcomment' , async(req,res) => {
    try {
        const newText = 'enjoy the scene';

        const Accesstoken = 'ya29.....';

         const videoid = 'C9Ha9aRvJaA';

        const Response = await axios.post(`${process.env.MAIN_URL}/commentThreads`,
            {
            snippet : {
                "channelId" : "22",
                "videoId"   : videoid,
                "topLevelComment" : {
                    "snippet" :  {
                        "textOriginal" : newText
                    }
                }
            }
          },{
               params : {
                part : 'snippet,replies,snippet',
                id :   videoid,
                key : process.env.API_KEY
            },
            headers : {
                'Content-Type' : 'application/json',
                 'Authorization' : `Bearer ${Accesstoken}`
            }}
        )

        console.log('Response =',Response?.data);

        return res.status(200).json({
             message : " Video  Content updates "
         })

     } catch (error) {
        console.log(' new comment error =',error);
          return res.status(500).json({
             message : " Unable to update contents "
         })
    }

})

export default router;


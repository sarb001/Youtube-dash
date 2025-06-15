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
        console.log(' tokens are =',access_token , refresh_token);

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
        const Accesstoken = '';

        const Response = await axios.get('/videos',{
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

        //  console.log('api-key  =',process.env.API_KEY);

        return res.status(200).json({
            message : " Fetched video details "
        })
    } catch (error) {
         return res.status(500).json({
             message : " Video Error "
         })
     }
})

export default router;


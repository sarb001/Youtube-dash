import express from 'express'


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


router.post('/login' , async(req,res) => {
     try {
        
     } catch (error) {
        
     }
})

export default router;


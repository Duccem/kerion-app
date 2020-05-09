const router = require('express').Router();
const UsuariosController = require('./controller');
const controller = new UsuariosController();

router.get('/', async (req, res)=>{
    try {
        let { code, response, message } = await controller.get(req.query);
        return res.status(code).json(message ? {message} : response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    }
});

router.post('/login', async (req, res)=>{
    let {data} = req.body;
    try {
        let { code, response, message } = await controller.login(data.user,data.password);
        return res.status(code).json(message || {data:response.data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    }
});

router.post('/signup', async (req, res)=>{
    let { data } = req.body;
    try {
        let { code, response } = await controller.signup(data);
        return res.status(code).json({data:response.data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/encript', async (req,res)=>{
    let { password } = req.body;
    try {
        let  validado  = await controller.encript(password);
        return res.status(200).json({ password: validado });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ validado: false });
    }
});

module.exports = router;
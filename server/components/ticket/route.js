const router = require('express').Router();
const TicketController = require('./controller');
const controller = new TicketController();

router.get('/', async (req, res) => {
    try {
        let {message, response, code} = await controller.list(req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.get('/:id', async (req, res)=> {
    let {id} = req.params;
    try {
        let { message, response, code } = await controller.get(id,req.query);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.post('/', async (req, res)=> {
    try {
        let {message,response,code} = await controller.insert(req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.post('/:id', async (req, res) => {
    try {
        let {message,response,code} = await controller.upsert(req.params,req.body);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let {message,code} = await controller.delete(req.params);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error interno"});
    }
});

module.exports = router;
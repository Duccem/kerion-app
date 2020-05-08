const usuariosRouter = require('./components/usuarios/route');
const ticketRouter = require('./components/ticket/route');
module.exports = app => {
    app.use('/api/usuarios/',usuariosRouter);
    app.use('/api/ticket/',ticketRouter);
    app.use('*', async (req, res) => {
        res.status(404).json({ message: "Route not especified" });
    });
}
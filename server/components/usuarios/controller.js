const consulter = require('../../libs/consulter');
const Encript = require('../../libs/encript');
const jwt = require('jsonwebtoken');

const encript = new Encript();

const Unauthorized = {
    message: "The credentials are invalids",
    code: 401
}

class UsuariosController {
    async get(query){
        try {
            let data = await consulter.get('usuarios', query);
            let totalCount = await consulter.count('usuarios');
            let count = data.length;
    
            if (count <= 0) return { message:"Entity empty" , code: 404 };
            let response = { totalCount, count, data };
            return { response, code: 200 };
        } catch (error) {
            throw new Error(`Error al consultar usuarios, ${error}`);
        }
    }
    async login(usuario,password){
        try {
            if (!usuario || !password) return Unauthorized;
            const data = await consulter.query(`SELECT * FROM usuario WHERE nombre = '${usuario}' or email = '${usuario}'`);
            if (!data[0]) return Unauthorized;

            let valid = await encript.validar(password, data[0].password);
            if (!valid) return Unauthorized;

            const token = jwt.sign({ _id: data[0].nombre }, TOKEN_KEY || "2423503", { expiresIn: 60 * 60 * 24 });
            return { response: { data: data[0] }, token, code: 200 };
        } catch (error) {
            throw new Error(`Error al hacer login, ${error}`);
        }
    }

    async signup(newUser){
        try {
            newUser.pass = await encript.encriptar(newUser.pass);
            let { insertId } = await consulter.create('usuarios',newUser);
    
            newUser.id = insertId
            const token = jwt.sign({ _id: newUser.nombre }, TOKEN_KEY || "2423503", { expiresIn: 60 * 60 * 24 });
    
            return { response: {  data: newUser },token, code: 200 };
        } catch (error) {
            throw new Error(`Error al hacer signup, ${error}`);
        }
    }

    async session(user_token){
        try {
            if (!user_token) return Unauthorized;
    
            let payload = jwt.verify(user_token, TOKEN_KEY || "2423503");

            let data = await consulter.query(`SELECT * FROM usuario WHERE nombre = '${payload._id}' or email = '${payload._id}'`);
    
            const response = { data: data[0] };
    
            return { response, code: 200 };
        } catch (error) {
            if (error.name == "TokenExpiredError") return Forbidden;
            throw new Error(`Error desconocido al validar el token, Error: ${error}`);
        }
    }

    async  encript(password){
        let pass = await encript.encriptar(password);
        return pass;
    }
}

module.exports = UsuariosController;
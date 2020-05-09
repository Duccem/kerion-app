const consulter = require('../../libs/consulter');
const Encript = require('../../libs/encript');

const encript = new Encript();

const Unauthorized = {
    message: "The credentials are invalids",
    code: 401
}

class UsuariosController {
    async get(query){
        query.fields ='id,nombre,tipouser_id,email';
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
            const data = await consulter.query(`SELECT * FROM usuarios WHERE nombre = '${usuario}' or email = '${usuario}'`);
            if (!data[0]) return Unauthorized;
            let valid = await encript.validar(password, data[0].pass);
            if (!valid) return Unauthorized;
            delete data[0].pass;
            return { response: { data: data[0] }, code: 200 };
        } catch (error) {
            throw new Error(`Error al hacer login, ${error}`);
        }
    }

    async signup(newUser){
        try {
            newUser.pass = await encript.encriptar(newUser.pass);
            let { insertId } = await consulter.create('usuarios',newUser);
    
            newUser.id = insertId
            delete newUser.pass;
            return { response: {  data: newUser }, code: 200 };
        } catch (error) {
            throw new Error(`Error al hacer signup, ${error}`);
        }
    }


    async  encript(password){
        let pass = await encript.encriptar(password);
        return pass;
    }
}

module.exports = UsuariosController;
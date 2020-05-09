const consulter = require('../../libs/consulter');

class TicketController {
    async list(query){
        try {
            let data = await consulter.get('ticket', query);
            let totalCount = await consulter.count('ticket');
            let count = data.length;
    
            if (count <= 0) return { message:"Entity empty" , code: 404 };
            let response = { totalCount, count, data };
            return { response, code: 200 };
        } catch (error) {
            throw new Error(`Error al consultar tickets, ${error}`);
        }
    }

    async get(id, query){
        try {
            if (isNaN(id)) return { message: 'The given ID doesn`t have the correct numeric format', code: 400 };
    
            let data = await consulter.getOne('ticket', id, query);
    
            if (!data) return {message: 'Element not found', code: 404};
            let response = { data };
            return { response, code: 200 };
    
        } catch (error) {
            throw new Error(`Error al consultar ticket, ${error}`);
        }
    }

    async insert(body){
        let { data } = body;
        let newTicket = data;
        try {
            let { insertId } = await consulter.create('ticket', newTicket);
            newTicket.id = insertId;
            let response = { message: "created", data:newTicket };
            return { response, code: 201 };
        } catch (error) {
            throw new Error(`Error al crear ticket, ${error}`);
        }
    }

    async upsert(params,body){
        const { id } = params;
        let { data } = body;
        let newTicket = data;
        try {
            if(isNaN(id)) return { message: 'The given ID doesn`t have the correct numeric format', code: 400 };
            let { affectedRows } = await consulter.update('ticket', id, newTicket);
            let response = { message:'Updated' };
            return { response, code: 201 };
        } catch (error) {
            throw new Error(`Error al editar ticket, ${error}`);
        }
    }

    async delete(params){
        let { id } = params;
        try {
            if(isNaN(id)) return { message: 'The given ID doesn`t have the correct numeric format', code: 400 };
            await consulter.remove('ticket', id);
            return { message: 'Deleted', code: 200 };
        } catch (error) {
            console.log(`Error en el controlador ${model}, error: ${error}`);
            return respuestas.InternalServerError;
        }
    }
}

module.exports = TicketController;
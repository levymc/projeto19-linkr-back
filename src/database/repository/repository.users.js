import conectDB from "../database.connection.js";

class Usuario {
    constructor(name, password, email, createdAt) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
    }
}

export default class UsuarioDAO {
    constructor() {
        this.pool = null;
        this.usuarios = [];
    }
        
    async connect() {
        this.pool = await conectDB();
        console.log("Conexão realizada!!!");
    }
    
    async disconnect() {
        if (this.pool) {
            await this.pool.end();
            console.log("Conexão encerrada...");
        }
    }
    
    async create(usuarioData) {
        await this.connect();
        const novoUsuario = new Usuario(
            usuarioData.name,
            usuarioData.password,
            usuarioData.email,
            usuarioData.createdAt
        );

        const queryString = 'INSERT INTO public.users ("name", password, email, "createdAt") VALUES ($1, $2, $3, $4)';
        const values = [novoUsuario.name, novoUsuario.password, novoUsuario.email, novoUsuario.createdAt];
    
        try {
            await this.pool.query(queryString, values);
            console.log('Novo usuário adicionado ao banco de dados.');
        } catch (error) {
            console.error('Erro ao adicionar novo usuário ao banco de dados:', error.message);
        }
    
        this.usuarios.push(novoUsuario);
        await this.disconnect();
        return novoUsuario;
    }
    
    async read(limit = null, offset = null, order = null, desc = null) {
        await this.connect();

        let queryString = 'SELECT * FROM public.users ';
        if (order){
            queryString += 'ORDER BY ' + order;
            if( desc === 'true' ) queryString += ' DESC ';
        }
        queryString += 'LIMIT $1 OFFSET $2 ';
        console.log(queryString);
        const values = [limit, offset];
    
        try {
            const response = await this.pool.query(queryString, values);
            console.log('Consulta realizada com sucesso.');
            await this.disconnect();
            return response.rows || [];
        } catch (error) {
            console.error('Erro ao consultar os usuários no banco de dados:', error.message);
            await this.disconnect();
            return [];
        }
    }

    async readUserMe(id){
        await this.connect()

        const queryString = `
            SELECT
                u.id AS "id",
                u.name AS "name",
                SUM(l."visitCount") AS "visitCount",
                json_agg(json_build_object(
                    'id', l.id,
                    'shortUrl', l."shortUrl",
                    'url', l.url,
                    'visitCount', l."visitCount"
                )) AS "shortenedUrls"
            FROM
                public.users u
            LEFT JOIN
                public.links l ON u.id = l."createdBy"
            WHERE
                u.id = $1
            GROUP BY
                u.id, u.name`
        const value = [id];
        try {
            const response = await this.pool.query(queryString, value);
            console.log('Consulta realizada com sucesso.');
            await this.disconnect();
            return response.rows[0] || null;
        } catch (error) {
            console.error('Erro ao consultar o usuário no banco de dados:', error.message);
            await this.disconnect();
            return null;
        }
    }

    async getRanking() {
        await this.connect();
      
        const queryString = `
            SELECT
                u.id AS "id",
                u.name AS "name",
                COUNT(l.id) AS "linksCount",
                SUM(l."visitCount") AS "visitCount"
            FROM
                public.users u
            LEFT JOIN
                public.links l ON u.id = l."createdBy"
            GROUP BY
                u.id, u.name
            ORDER BY
                "visitCount" desc
            LIMIT 10
        `;
      
        try {
            const response = await this.pool.query(queryString);
            console.log('Consulta realizada com sucesso.');
            await this.disconnect();
            return response.rows || [];
        } catch (error) {
            console.error('Erro ao consultar o ranking no banco de dados:', error.message);
            await this.disconnect();
            return [];
        }
    }
      
      

    async readById(id) {
        await this.connect();

        const queryString = `SELECT * FROM public.users WHERE "id" = $1`;
        const value = [id];
        try {
            const response = await this.pool.query(queryString, value);
            console.log('Consulta realizada com sucesso.');
            await this.disconnect();
            return response.rows[0] || null;
        } catch (error) {
            console.error('Erro ao consultar o usuário no banco de dados:', error.message);
            await this.disconnect();
            return null;
        }
    }

    async readByEmail(email) {
        await this.connect();

        const queryString = `SELECT * FROM public.users WHERE "email" = $1`;
        const value = [email];
        try {
            const response = await this.pool.query(queryString, value);
            console.log('Consulta realizada com sucesso.');
            await this.disconnect();
            return response.rows[0] || null;
        } catch (error) {
            console.error('Erro ao consultar o usuário no banco de dados:', error.message);
            await this.disconnect();
            return null;
        }
    }
    
    async update(id, usuarioData) {
        await this.connect();
    
        const usuarioParaAtualizar = this.usuarios.find(usuario => usuario.id === id);
        if (!usuarioParaAtualizar) {
            await this.disconnect();
            return null; // Usuário não encontrado, retorna null
        }
    
        usuarioParaAtualizar.name = usuarioData.name || usuarioParaAtualizar.name;
        usuarioParaAtualizar.password = usuarioData.password || usuarioParaAtualizar.password;
        usuarioParaAtualizar.email = usuarioData.email || usuarioParaAtualizar.email;
        usuarioParaAtualizar.createdAt = usuarioData.createdAt || usuarioParaAtualizar.createdAt;
    
        const queryString = 'UPDATE public.users SET "name" = $1, password = $2, email = $3, "createdAt" = $4 WHERE "id" = $5';
        const values = [usuarioParaAtualizar.name, usuarioParaAtualizar.password, usuarioParaAtualizar.email, usuarioParaAtualizar.createdAt, id];
    
        try {
            await this.pool.query(queryString, values);
            console.log('Usuário atualizado no banco de dados.');
        } catch (error) {
            console.error('Erro ao atualizar o usuário no banco de dados:', error.message);
        }
    
        await this.disconnect();
        return usuarioParaAtualizar;
    }

    async delete(id) {
        await this.connect();
    
        const index = this.usuarios.findIndex(usuario => usuario.id === id);
        if (index === -1) {
            await this.disconnect();
            return null;
        }

        const queryString = 'DELETE FROM public.users WHERE "id" = $1';
        const values = [id];
    
        try {
            await this.pool.query(queryString, values);
            console.log('Usuário excluído do banco de dados.');
        } catch (error) {
            console.error('Erro ao excluir o usuário do banco de dados:', error.message);
        }
    
        const usuarioExcluido = this.usuarios.splice(index, 1)[0];
    
        await this.disconnect();
        return usuarioExcluido;
    }
}

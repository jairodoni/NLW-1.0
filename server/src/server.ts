import express, { response } from 'express';

const app = express();

app.use(express.json());

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema

// GET: Buscar uma informação ou mais  informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação exixtente no back-end
// DELETE: Remove uma informação do back-end


/**
 * POST http://localhost:3333/users = Criar um 
 * GET http://localhost:3333/users = Listar usuarios
 * GET http://localhost:3333/users = Buscar dados do usuario com ID 5
 */

// Request Param: Parametros que vem na minha propria rota que identificam um recurso
//Query Param : Parametros que  vem na propria rota geralmente opcionais para filtros, paginação
// Request Body: Parametros para criação/atualização de informações

//KNEX:
// SELECT * FROM users WHERE  'Diego'
// knex('users').where('name', 'Diego').select('*')

const users = [
    'Diego',
    'Cleiton',
    'Robison',
    'Jairo'
];

app.get('/users',(request, response) =>{
    const search = String(request.query.search);
    const filteredUsers = search ?  users.filter(user => user.includes(search)) : users;
    return response.json(filteredUsers);
})
app.get('/users/:id',(request, response)=>{
    const id = Number(request.params.id);
    const user = users[id];
    return response.json(user);
})
app.post('/users', (request, response)=>{
    const data = request.body;

    

    const user = {
        name: data.name,
        email:data.email,
    };
    return response.json(user);
})

app.listen(3333);
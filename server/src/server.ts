import express from 'express';

const app = express();

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema

//GET: Buscar uma informação ou mais  informações do back-end
//POST: Criar uma nova informação no back-end
//PUT: Atualizar uma informação exixtente no back-end
//DELETE: Remove uma informação do back-end

app.get('/users',(request, response) =>{
    console.log('Listagem de usuarios');

    // response.send('Hello Word')
    response.json([
        'Diego',
        'Cleitom',
        'Robison',
    ])
})



app.listen(3333);
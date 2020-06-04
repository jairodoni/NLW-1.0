import Knex from'knex';

export async function seed(knex: Knex){
  await knex('items').insert([
    {title:'Lâmpadas', image:'lampadas.svg'},
    {title:'Pilhas e Baterias', image:'lampadas.svg'},
    {title:'Papéis e Papelão', image:'papeis_papelao.svg'},
    {title:'Residuos Eletronicos', image:'eletronicos.svg'},
    {title:'Residuos Organicos', image:'organicos.svg'},
    {title:'Óleo de Cozinha', image:'oleo.svg'},
  ])
}
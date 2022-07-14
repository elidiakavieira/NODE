const express = require('express');

const app = express();

app.use(express.json());
const { uuid } = require('uuidv4');


/**metodos HTTP
 * 
 * Get --> buscar informaçoes do back-end
 * Post --> criar informaçoes no back-end
 * Put --> atualizar  informaçoesdo back-end
 * parch --> atualiza informaçoes especificas do back-end
 * Delete --> deletar informaçoes do back-end
 * 
 */


/**
 * 
 * Tipos de parametros
 * Query Params --> Filtros e paginação
 * Route Params --> Identificar recursos (Atualizar/Deletar)
 * Request Body --> conteudo na hora de criar ou editar um recurso (JSON)
 * 
 * 
 */

const projects = [];


 

app.get('/Projects' , (request, response) => {
    const { title } = request.query;

    const results = title
    ? projects.filter(project =>  project.title.includes(title))
    : projects;

    return response.json(results);

//]) ;
});

app.post('/Projects' , (request, response) => {
    const { title , owner } = request.body;

    const project = { id:uuid(), title , owner};

    projects.push(project);

    return response.json(project) ;
});

app.put('/Projects/:id' , (request, response) => {
    const { id } =  request.params;
    const { title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0)  {
        return response.status(404).json ({ Error :' Project not Found.'})
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return response.json( project) ;
});


app.delete('/Projects/:id' , (request, response) => {
    const { id } =  request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0)  {
        return response.status(404).json ({ Error :' Project not Found.'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});


app.listen(3333, () => {
    console.log('✔ back-end started!');
});

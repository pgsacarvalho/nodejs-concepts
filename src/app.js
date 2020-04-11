const express = require("express");
const cors = require("cors");

const  generateUniqueId = require("./services/uidService");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const id = generateUniqueId();
  const likes = 0;
  const {title, url, techs} = request.body;
  
  const newProject = {
    id,
    likes,
    title,
    url,
    techs,
  };

  repositories.push(newProject);

  return response.json(newProject);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const projectToUpdate = repositories.find(p => p.id === id);
  if (!projectToUpdate){
    return response.status(400).json({error: 'Project not found' });
  }

  const {title, url, techs} = request.body;  
  projectToUpdate.title = title;
  projectToUpdate.url = url;
  projectToUpdate.techs = techs;

  return response.json(projectToUpdate);  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex(p => p.id === id);
  if (projectIndex < 0 ){
    return response.status(400).json({error: 'Project not found' });
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const projectToUpdate = repositories.find(p => p.id === id);
  if (!projectToUpdate){
    return response.status(400).json({error: 'Project not found' });
  }

  projectToUpdate.likes++;
  return response.json(projectToUpdate);  
});

module.exports = app;
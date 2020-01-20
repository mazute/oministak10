const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Devs');

const routes = Router();

/**
 * Query params: req.query(fiter, order, pagination)
 * Route params:
 */

routes.post('/devs', async (request, response) => {
    const { github_username, techs } = request.body;
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    const { login, avatar_url, bio } = apiResponse.data;
    const techsArray = techs.split(',').map(tech => tech.trim())

    const dev = await Dev.create({
        github_username,
        name: login,
        avatar_url,
        bio,
        techs: techsArray,
    })
    return response.json(dev);
})
  
routes.get('/', (request, response) => {
    console.log(request.body);
    return response.json({ message: 'Hello xdaWord' });
})

module.exports = routes;

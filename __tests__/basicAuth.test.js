'use strict';
const server = require('../src/server')
const supertest = require('supertest')
const request = supertest(server.app);
const {db}= require('../src/models/index.js');
beforeAll( async () =>{
    await db.sync();
})
afterAll( async () =>{
    await db.drop();
})

describe('testing the server',()=>{
    it('testing 404 bad route',async()=>{
        const response = await request.get('/wrongpath');
        expect(response.status).toBe(404) 
    })
    it('testing 404',async()=>{
        const response = await request.post('/');
        expect(response.status).toBe(404) 
    })
});

describe('testing post requests ',()=>{
    it('for sign up',async()=>{
       const response = await request.post('/signup').send({
            username : "islam",
            password : "islam123"
       })
       expect(response.status).toBe(201);
    })
    it('for sign in', async()=>{
        const response = await request.post('/signin').auth('islam','islam123');
        expect(response.status).toBe(200);
    })
    it('testing wrong pass (status 500)',async()=>{
        const response = await request.post('/signin').auth('islam','wrongpass');
        expect(response.status).toBe(500);
    })
    it('testing wrong username (status 500)',async()=>{
        const response = await request.post('/signin').auth('wrongusername','islam123');
        expect(response.status).toBe(500);
    })
    
})
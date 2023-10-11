const supertest = require('supertest')
const createServer = require('../../app')
const http = require('http');
const {closeDatabase} = require('../models/closedb')


const app = createServer();

describe("film", () => {

    afterAll(async () => {
        closeDatabase();
    })
    describe("get film route", () => {

        describe("Retrieving all films", () => {
            it("should return a 200", async () => {
                await supertest(app).get('/api/film').expect(200);
            });

            it("should return films", async () => {
                const response = await supertest(app).get('/api/film');
                expect(response.body.length >= 1);
            });

            describe("given the title does not exist", () => {
                const title = "big mommas house 9";
                it("should return no film", async () => {
                    const response = await supertest(app).get(`/api/film?${title}`);
                    expect(response.body.length === 0);
                });

                it("it should return a 200", async () => {
                    await supertest(app).get(`/api/film?${title}`).expect(200);
                });
            });

            describe("given the actor does not exist", () => {
                const actor_name = "Schneider";
                it("should return no film,", async () => {
                    const response = await supertest(app).get(`/api/film?${actor_name}`);
                    expect(response.body.length === 0)
                });

                it("should return a 200", async () => {
                    await supertest(app).get(`/api/film?${actor_name}`).expect(200);
                })
            })
        });

        describe("given the film does not exist", () => {
            it("should return a 404", async () => {
                const filmId = "3984798";
                await supertest(app).get(`/api/film/${filmId}`).expect(500);
            });
        });

        describe("given the film does exist", () => {
            const filmId = "100";
            it("should return a 200", async () => {
                await supertest(app).get(`/api/film/${filmId}`).expect(200);
            })

            it("should return film", async () => {
                const response = await supertest(app).get(`/api/film/${filmId}`);
                expect(response.body !== null);
            })
        });

        describe("given the the id is invalid", () => {
            it("should return a 500", async () => {
                const filmId = "fhj4848fs8";
                await supertest(app).get(`/api/film/${filmId}`).expect(500);
            })
        })
    });
});

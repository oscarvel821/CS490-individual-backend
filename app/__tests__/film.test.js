const supertest = require('supertest')
const app = require('../../server.js')

describe("film", () => {
    describe("get film route", () => {

        describe("given the film does not exist", () => {
            it("should return a 404", async () => {
                const filmId = "3984798";
                await supertest(app).get(`/api/film/${filmId}`).expect(500);
            });
        });

        describe("given the film does exist", () => {
            it("should return a 200", async () => {
                const filmId = "340";
                await supertest(app).get(`/api/film/${filmId}`).expect(200);
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
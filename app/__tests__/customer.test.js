const supertest = require('supertest');
const createServer = require('../../app');
const {closeDatabase} = require('../models/closedb');
const Customer = require("../models/customer.model");

const now = new Date();

// Get the date components
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1 and pad with '0' if necessary
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

// Format the date and time string
const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

const CustomerPayload = {
    store_id : 1,
    first_name : "Oscar",
    last_name : "Velazquez",
    email : "oscarvel123@gmail.com",
    address_id: 8,
    active: 1,
    create_date : formattedDate
}

const app = createServer();

describe("customer", () => {

    afterAll(async () => {
        closeDatabase();
    })

    describe("get customer routes", () => {
        describe("Retrieving all customers", () => {

            it("Should return a 200" , async () => {
                await supertest(app).get('/api/customer').expect(200);
            })

            it("should return films", async () => {
                const response = await supertest(app).get('/api/film');
                expect(response.body.length >= 1);
            });
            
        });

        describe("given the customer does not exist", () => {
            it("should return a 404", async () => {
                const customerId = "3984798";
                await supertest(app).get(`/api/customer/${customerId}`).expect(500);
            });
        });

        describe("given the film does exist", () => {

            it("should return a 200 and customer", async () => {
                const newCustomer = await Customer.create(CustomerPayload);

                const {body, statusCode} = await supertest(app).get(`/api/customer/${newCustomer.id}`);

                expect(statusCode).toBe(200);

                expect(body[0].customer_id).toBe(newCustomer.id);

            })

        });
    })

    describe("post customer routes", () => {
        describe("create new customer", () => {

            it("should return 200 and create the customer", async () => {
                const {body, statusCode} = await supertest(app).post("/api/customer").send(CustomerPayload);

                expect(statusCode).toBe(200);

                expect(body).toEqual({
                    "id": expect.any(Number),
                    "store_id": 1,
                    "first_name": "Oscar",
                    "last_name": "Velazquez",
                    "email": "oscarvel123@gmail.com",
                    "address_id": 8,
                    "active": 1,
                    "create_date": expect.any(String)
                })
            })
        })
    })

    describe("delete customer routes", () => {
        it("should return a 204 and delete the customer", async () => {
            const newCustomer = await Customer.create(CustomerPayload);
        
            const response = await supertest(app).delete(`/api/customer/${newCustomer.id}`);

            expect(response.statusCode).toBe(204);

            //Verify that the customer has been deleted
            try {
                await Customer.findById(newCustomer.id);
                fail("Expected an error to be thrown");
            } catch (error) {
                expect(error).toEqual({ kind: "not found" });
            }
        });

        it("should return a 404 if the customer doesn't exist", async () => {
            const nonExistentCustomerId = 12345; 
            const response = await supertest(app).delete(`/api/customer/${nonExistentCustomerId}`);

            expect(response.statusCode).toBe(404);
        });
    })
})
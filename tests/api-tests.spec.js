const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const { request } = require('http');
const ajv = new Ajv ();

const validateSchema = (schema, data) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
        console.error(validate.errors);
    }
    return valid;
};

test.describe('API Automation', () => {
    const baseURL = 'https://reqres.in/api';

    test('GET - Fetch Single User', async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`);
        expect(response.status()).toBe(200);

        const responseData = await response.json();
        const schema = require('../jsonSchema/get-user-schema.json');
        expect(validateSchema(schema, responseData)).toBe(true);
    });
});

const baseURL = 'https://reqres.in/api';

test('POST - Register - Successful', async ({ request }) => {
    const response = await request.post(`${baseURL}/register`, {
        data: {
            email: "eve.holt@reqres.in",
            password: "british"
        }
    });
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    const schema = require('../jsonSchema/post-user-schema.json');
    expect(validateSchema(schema, responseData)).toBe(true);
});

test('PUT - Update User', async ({ request }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      data: {
        name: "morpheus",
        job: "zion resident"
      }
    });
    expect(response.status()).toBe(200);

    const responseData = await response.json();
    const schema = require('../jsonSchema/put-user-schema.json');
    expect(validateSchema(schema, responseData)).toBe(true);
  });

  test('DELETE - Delete User', async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/2`);
    expect(response.status()).toBe(204);
  });
;
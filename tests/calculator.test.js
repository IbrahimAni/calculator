const { test, expect } = require('@playwright/test');

test.use({
    baseURL: 'http://app:3000'
});

test.describe('Calculator API Tests', () => {
    test('should return correct result for addition', async ({ request }) => {
        const response = await request.post('/calculate', {
            data: { num1: 1, num2: 2, operation: 'add' }
        });
        expect(response.ok()).toBeTruthy();
        const result = await response.json();
        expect(result.result).toBe(3);
    });

    test('should return correct result for subtraction', async ({ request }) => {
        const response = await request.post('/calculate', {
            data: { num1: 5, num2: 3, operation: 'subtract' }
        });
        expect(response.ok()).toBeTruthy();
        const result = await response.json();
        expect(result.result).toBe(2);
    });

    test('should return correct result for multiplication', async ({ request }) => {
        const response = await request.post('/calculate', {
            data: { num1: 3, num2: 4, operation: 'multiply' }
        });
        expect(response.ok()).toBeTruthy();
        const result = await response.json();
        expect(result.result).toBe(12);
    });

    test('should return correct result for division', async ({ request }) => {
        const response = await request.post('/calculate', {
            data: { num1: 8, num2: 2, operation: 'divide' }
        });
        expect(response.ok()).toBeTruthy();
        const result = await response.json();
        expect(result.result).toBe(4);
    });

    test('should return 400 for invalid operation', async ({ request }) => {
        const response = await request.post('/calculate', {
            data: { num1: 8, num2: 2, operation: 'modulus' }
        });
        expect(response.status()).toBe(400);
        const result = await response.text();
        expect(result).toBe('Invalid operation.');
    });

    test('should return 400 for non-numeric input', async ({ request }) => {
        const response = await request.post('/calculate', {
            data: { num1: 'eight', num2: 2, operation: 'add' }
        });
        expect(response.status()).toBe(400);
        const result = await response.text();
        expect(result).toBe('Inputs must be numbers.');
    });

    test('should return 400 for missing input', async ({ request }) => {
        const response = await request.post('/calculate', {
            data: { num1: 8, operation: 'add' }
        });
        expect(response.status()).toBe(400);
        const result = await response.text();
        expect(result).toBe('Inputs must be numbers.');
    });
});

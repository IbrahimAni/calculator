const { test, expect } = require('@playwright/test');

test.use({
    baseURL: 'http://localhost:3000'
});

test('should return correct result for addition', async ({ request }) => {
    const response = await request.post('/calculate', {
        data: { num1: 1, num2: 2, operation: 'add' }
    });
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.result).toBe(3);
});

// Add more tests for other operations and edge cases

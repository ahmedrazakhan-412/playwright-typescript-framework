import { test, expect, request } from '@playwright/test';

test('Basic Authentication API', async () => {

    const auth = Buffer
        .from('admin:admin')
        .toString('base64');

    const apiContext = await request.newContext({
        extraHTTPHeaders: {
            Authorization: `Basic ${auth}`
        }
    });

    const response = await apiContext.get(
        'https://the-internet.herokuapp.com/basic_auth'
    );

    expect(response.status()).toBe(200);

    const text = await response.text();

    console.log(text);
});
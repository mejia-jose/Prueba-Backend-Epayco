import { Test,TestingModule } from "@nestjs/testing";
import { INestApplication } from '@nestjs/common';
import * as request from "supertest";
import { AppModule } from "../../src/app.module";

describe('WebHooks', () => 
{
    let app: INestApplication;

    beforeAll(async () => 
    {
        const moduleFixture: TestingModule = await Test.createTestingModule(
        {
        imports: [AppModule], //Se importa el app.module.ts
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => { await app.close();});
   
    it('GET /get-movies', async () => {
        const webhookUrl = 'https://webhook.site/0a7c1d76-7e92-4a25-b418-41b0cd1554e1';
        
        const response = await request(app.getHttpServer())
            .get(`/get-movies?webhook_url=${encodeURIComponent(webhookUrl)}`)
            .expect(200); 

        const data = {
            "message": "La búsqueda se llevó a cabo el 2024-09-29 a las 14:21:31.",
            "result": "This URL has no default content configured. <a href=\"https://webhook.site/#!/view/0a7c1d76-7e92-4a25-b418-41b0cd1554e1\">View in Webhook.site</a>."
        }
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('result');
        //expect(Array.isArray(response.body)).toBe(true);
    });
});
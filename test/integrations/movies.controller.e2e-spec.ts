import { Test,TestingModule } from "@nestjs/testing";
import { INestApplication } from '@nestjs/common';
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { MESSAGES_DOC,MESSAGES_ERRORS, MESSAGES_SUCCESS } from "../../src/constants/global.constants";
import { moviesServices } from "../../src/modules/movies/services/movies.service";
import { moviesController } from "../../src/modules/movies/controllers/movies.controller";


describe('movies (e2e)', () => 
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

    it('/movies/all (GET) '+MESSAGES_DOC.GET_ALL.SUMARY, async () => 
    {
        const response = await request(app.getHttpServer())
        .get('/movies/all')
        .query({ limit: 20 })
        .expect(200);

        // Validaciones de respuesta
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeLessThanOrEqual(20);
    });

    it('/movies/update/:id (PUT) ' + MESSAGES_SUCCESS.MOD_MOVIES.UPDATE_SUCCESS, async () => 
    {
      
        const similarMovies = [
            "Luke's Movie Muddle",
            "A Movie Star",
            "The Trials of a Movie Cartoonist",
            "Estelle and Her Movie Hero",
            "From Kitchen Mechanic to Movie Star"
        ];
    
        // Simular el resultado que devolvería el servicio
        const movieResult = {
        
            "similar_year": [
                "Luke's Movie Muddle",
                "A Movie Star",
                "The Trials of a Movie Cartoonist",
                "Estelle and Her Movie Hero",
                "From Kitchen Mechanic to Movie Star"
            ],
            "_id": "573a1390f29313caabcd5ea4",
            "plot": "A District Attorney's outspoken stand on abortion gets him in trouble with the local community.",
            "genres": [
                "Drama"
            ],
            "runtime": 62,
            "rated": "APPROVED",
            "cast": [
                "Tyrone Power Sr.",
                "Helen Riaume",
                "Marie Walcamp",
                "Cora Drew"
            ],
            "title": "Where Are My Children?",
            "fullplot": "While prosecuting a physician for the death of a client after an abortion, the district attorney discovers that his wife helped her society friends and the daughter of her maid obtain and pay for abortions from the physician (and was perhaps herself also a client.)",
            "languages": [
                "English"
            ],
            "released": "1916-05-01T00:00:00.000Z",
            "directors": [
                "Phillips Smalley",
                "Lois Weber"
            ],
            "writers": [
                "Lucy Payton (from the story by)",
                "Franklin Hall (from the story by)",
                "Lois Weber",
                "Phillips Smalley"
            ],
            "awards": {
                "wins": 1,
                "nominations": 0,
                "text": "1 win."
            },
            "lastupdated": "2015-09-07 00:51:32.560000000",
            "year": "1916",
            "imdb": {
                "rating": 5.9,
                "votes": 247,
                "id": 7558
            },
            "countries": [
                "USA"
            ],
            "type": "movie",
            "tomatoes": {
                "viewer": {
                    "rating": 3.1,
                    "numReviews": 34,
                    "meter": 50
                },
                "production": "MCA/Universal Pictures",
                "lastUpdated": "2015-08-06T19:49:17.000Z"
            },
            "num_mflix_comments": 0,
            "__v": 1
        
        };
    
        const response = await request(app.getHttpServer())
        .put(`/movies/update/573a1390f29313caabcd5ea4`)
        .expect(200);
    
    
        // Validaciones de respuesta
        expect(response.body).toEqual({
            messages: MESSAGES_SUCCESS.MOD_MOVIES.UPDATE_SUCCESS,
            total: `Se encontraron ${similarMovies.length} títulos para la actualización del campo "similar_year".`,
            data: movieResult,
        });
    });
});


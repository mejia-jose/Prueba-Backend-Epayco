import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { Movie,MovieSchema } from '../movies/schemas/movies.schema';
import { moviesServices } from './services/movies.service';
import { moviesController } from '../movies/controllers/movies.controller';
import { SimilarYearModule } from '../similar_year/similar_year.module';

@Module(
{
    imports: [
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        SimilarYearModule,
    ],
    controllers:[moviesController],
    providers:[moviesServices],
    exports : [moviesServices]
})
export class MoviesModule {}
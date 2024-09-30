import { ApiProperty } from '@nestjs/swagger';

export class Movie {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    plot: string;

    @ApiProperty({ type: [String] })
    genres: string[];

    @ApiProperty()
    runtime: number;

    @ApiProperty({ type: [String] })
    cast: string[];

    @ApiProperty()
    num_mflix_comments: number;

    @ApiProperty()
    poster: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    fullplot: string;

    @ApiProperty({ type: [String] })
    countries: string[];

    @ApiProperty()
    released: string;

    @ApiProperty({ type: [String] })
    directors: string[];

    @ApiProperty({ type: [String] })
    writers: string[];

    @ApiProperty()
    awards: { wins: number; nominations: number; text: string };

    @ApiProperty()
    lastupdated: string;

    @ApiProperty()
    year: string;

    @ApiProperty()
    imdb: { rating: number; votes: number; id: number };

    @ApiProperty()
    type: string;

    @ApiProperty()
    tomatoes: {
        viewer: { rating: number; numReviews: number; meter: number };
        fresh: number;
        critic: { rating: number; numReviews: number; meter: number };
        rotten: number;
        lastUpdated: string;
    };

    @ApiProperty()
    __v: number;

    @ApiProperty({ type: [String] })
    similar_year: string[];
}

export class UpdateDocResponseDTO {
    @ApiProperty()
    messages: string;

    @ApiProperty()
    total: string;

    @ApiProperty({ type: Movie })
    data: Movie;
}

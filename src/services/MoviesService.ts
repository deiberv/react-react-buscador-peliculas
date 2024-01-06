import { MovieDomain } from '../domain/Movies';

const API_KEY = 'b8526ad7'

interface ApiResponse {
    Search?: ApiMovie[],
    totalResults?: number,
    Response: string,
    Error?: string
}

interface ApiMovie {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string
}

export const searchMovies = async(search:string): Promise<MovieDomain[] | null> => {
    if (search === '') return null
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
        const json: ApiResponse = await response.json();
        if (json.Search === undefined) return null;
        return json.Search.map((movie) => {
            const movieDomain: MovieDomain = {
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                image: movie.Poster
            };
            return movieDomain;
        });
    }catch(e){
        throw new Error('Error searching movies')
    }
    
}
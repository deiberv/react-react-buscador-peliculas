import { MovieDomain } from '../domain/Movies';
import { Movie } from './Movie';

interface MoviesArg {
  movies: MovieDomain[]
}

export const MoviesList = ({movies}:MoviesArg) => {
  const hasMovies = movies?.length > 0;
  return (
    hasMovies
      ? 
        <div className='row g-3'>
          {
            movies.map(movie => (
              <Movie key={movie.id} movie={movie}/>
            ))
          }
        </div>
      : <p>No se ha encontrado resultado para la busqueda</p>
  ) 
}

import { MovieDomain } from '../domain/Movies'

interface MovieArg {
    movie: MovieDomain
}

export const Movie = ({movie}: MovieArg) => {
  return (
    <div className='col-12 col-md-3 text-center'>
        <img src={movie.image} alt={movie.title} className='rounded img-fluid img-thumbnail'/>
        <h4>{movie.title}</h4>
        <p>{movie.year}</p>
    </div>
  )
}

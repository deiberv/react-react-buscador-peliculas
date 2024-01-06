import debounce from "just-debounce-it";
import { MoviesList } from "./components/MoviesList";
import { useMovies } from "./hooks/useMovies"
import { useSearch } from "./hooks/useSearch";
import { useCallback } from "react";


function App() {

  const { search, updateSearch } = useSearch();
  const{movies, loading, getMovies} = useMovies();

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    getMovies(search)
  }
  
  const debouncedGetMovies = useCallback(
    debounce(search => { getMovies( search ) }, 300)
    , [getMovies]
  )

  const handleChange = (event: React.SyntheticEvent<HTMLFormElement>) => { 
    const newSearch = event.target.value;
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className="container p-5">
      <div className="card">
        <header className="card-header">
          <h3 className="card-title">Buscador de Películas</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" placeholder="Avengers, Mario, Matrix" onChange={handleChange} value={search} />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">Buscar</button>
              </div>
            </div>
          </form>
        </header>
        <main className="card-body">
          { loading ? <p>cargando</p> : <MoviesList movies={movies} /> }
        </main>
      </div>
    </div>
  )
}

export default App

import { useCallback, useRef, useState } from "react"
import { MovieDomain } from "../domain/Movies";
import { searchMovies } from "../services/MoviesService";


export const useMovies = () => {
    const [movies, setMovies] = useState<MovieDomain[]|null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setError] = useState(null)
    const previousSearch = useRef('')

    const getMovies = useCallback(async(search: string) => {
        if (search === previousSearch.current) return
        try {
            setLoading(true)
            setError(null)
            const newMovies = await searchMovies(search)
            setMovies(newMovies)
            previousSearch.current = search
        } catch (error: unknown) {
            setError(error?.message)
        }finally {
            setLoading(false);
        }
    },[])
    return {movies, loading, getMovies}
}

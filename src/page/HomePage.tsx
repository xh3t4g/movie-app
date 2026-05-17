import { useState, useEffect, useRef} from "react"
import type { Movie } from "../data/type";
import css from "../css/App.module.css"
import "../css/index.css"
import { CardGenerait } from "../components/CardGenerait";


export function HomePage() {

    const [query, setQuery] = useState('');
    const [IsTrueRed, setIsTrueRed] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([])
    const [genre, setGenre] = useState([])
    const [page, setPage] = useState(1)
    const API_KEY = (import.meta.env.VITE_API_KEY)
    const sentinelRef = useRef(null)



    useEffect(() => {
        if (!query) {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(page)
                console.log(data)
                if (page === 1) {
                    setIsTrueRed(false)
                    setMovies(data.results)
                } else {
                    setMovies(prev => [...prev, ...data.results])
                }
            })
            return
        }

        const timer = setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ru-RU&page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.results)

                if (data.results.length === 0) {
                    setMovies([])
                    return
                }

                setIsTrueRed(false)
                setMovies(data.results)
            })
        }, 500)
        
        return () => {
            clearTimeout(timer)
        }
    }, [query, page])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`)
        .then((res) => res.json())
        .then((data) => {
            setGenre(data.genres)
        })
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            console.log('observer сработал', entries[0].isIntersecting)
            if (entries[0].isIntersecting) {
                setPage(prave => prave + 1)
            }
        }, { threshold: 1.0 })

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => observer.disconnect()
    }, [page])


    return <>
    
    
        <header className={css["header"]}>
            <form className={css["searchForm"]}>
                <input type="text" name="InputFrom" className={`${css["InputFrom"]} ${IsTrueRed ? css['red'] : ''}`} placeholder="Введите название..." onChange={(e) => {
                    const Value = e.target.value.trim()
                    if (Value) {
                        setIsTrueRed(false)
                        setQuery(Value)
                        setPage(1)
                    }
                }}/>
            </form>
        </header>

        {movies && <>
            <main>
                <div className={css["movieList"]}>
                    {movies.filter((movie) => movie.poster_path).map((movie) => {
                        const img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

                        const genre_ids = movie.genre_ids.slice(0, 2).map((id) => genre.find((genreID) => genreID.id === id)).filter(Boolean);

                        return (
                            <CardGenerait key={movie.id} movie={movie} img={img} genre={genre_ids}/>
                        )
                    })}
                </div>
            </main>
        </>} 

        <div ref={sentinelRef}></div>
    </>
}

import { useState, useEffect} from "react"
import type { Movie } from "../data/type";
import css from "../css/App.module.css"
import "../css/index.css"
import { CardGenerait } from "../components/CardGenerait";


export function HomePage() {

    const [query, setQuery] = useState("Призрачный гонщик");
    const [IsTrueRed, setIsTrueRed] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([])
    const API_KEY = (import.meta.env.VITE_API_KEY)



    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ru-RU`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.results)

                if (data.results.length === 0) {
                    alert('Фильм не найден')
                }

                setIsTrueRed(false)
                setMovies(data.results)
            })
        }, 500)
        
        return () => {
            clearTimeout(timer)
        }
    }, [query])


    return <>
    
    
        <header className={css["header"]}>
            <form className={css["searchForm"]}>
                <input type="text" name="InputFrom" className={`${css["InputFrom"]} ${IsTrueRed ? css['red'] : ''}`} placeholder="Введите название..." onChange={(e) => {
                    const Value = e.target.value.trim()
                    if (Value) {
                        setIsTrueRed(false)
                        setQuery(Value)
                    }
                }}/>
            </form>
        </header>

        {movies && <>
            <main>
                <div className={css["movieList"]}>
                    {movies.map((movie) => {
                        const img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

                        return (
                            <CardGenerait key={movie.id} movie={movie} img={img}/>
                        )
                    })}
                </div>
            </main>
        </>} 
    </>
}

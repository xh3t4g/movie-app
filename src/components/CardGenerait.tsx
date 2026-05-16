import css from '../css/App.module.css';
import type { Movie } from '../data/type';

interface Props {
    movie: Movie;
    img: string;
    genre: {
        id: number;
        name: string;
    }[];
}

export function CardGenerait({movie, img, genre}: Props) {

    return (
        <div className={css["card"]}>

            <img src={img}/>

            <span className={css["Reitng"]}>{movie.vote_average.toFixed(1)}</span>

            <div className={css["card-overlay"]}>
                <div className={css["Reitng-genre"]}>
                    <h3 className={css["Title"]}>{movie.title}</h3>
                    <div className={css["genres"]}>
                        {genre.map((p) => (
                            <span key={p.id} className={css['genre']}>
                                {p.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

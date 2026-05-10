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

            <div className={css["Content"]}>
                <h3 className={css["Title"]}>{movie.title}</h3>
                <span className={css["Reitng"]}>{movie.vote_average.toFixed(1)}</span>
                <span className={css["pass"]}>{genre.map((g) => g.name).join(' | ')}</span>
            </div>
        </div>
    )
}

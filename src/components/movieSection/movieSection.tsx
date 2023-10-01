import MovieTab from "./movieTab";
import {useEffect, useState} from "react";
import axios from "axios";
import AddMovie from "./addMovie";
import './movieSection.css';
import {BASE_API_URL} from "../../config";

interface Movie {
    movieId: number;
    title: string;
    description: string;
    dateAdded: string;
    likes: number;
    hates: number;
    username: string;
    userId: number;
}

interface MovieSectionProps {
    loggedUserId: number;
}

const MovieSection: React.FC<MovieSectionProps> = (props) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [sortType, setSortType] = useState<string>('dateAdded');
    const { loggedUserId } = props;

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/movies`);
            const sortedMovies = sortMovies(response.data, sortType);
            setMovies(sortedMovies);
        } catch (error) {
            setError('Error fetching movies. Please try again.');
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [sortType]);

    const sortMovies = (movies: Movie[], sortType: string): Movie[] => {
        return movies.sort((a: Movie, b: Movie) => {
            switch (sortType) {
                case 'likes':
                    return b.likes - a.likes;
                case 'hates':
                    return b.hates - a.hates;
                case 'dateAdded':
                default:
                    const dateA = new Date(a.dateAdded);
                    const dateB = new Date(b.dateAdded);
                    return dateB.getTime() - dateA.getTime();
            }
        });
    };

    const refreshMovies = () => {
        fetchMovies();
    };

    return (
        <div className="movieSection">
            {error && <p>{error}</p>}
            <AddMovie
                userId={loggedUserId}
                onMovieAdded={refreshMovies}
            />
            <h2>Movie List</h2>
            <div>
                <label>Sort by:</label>
                <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
                    <option value="dateAdded">Date Added (Newest First)</option>
                    <option value="likes">Likes</option>
                    <option value="hates">Hates</option>
                </select>
            </div>
            <ul>
                {movies.map((movie, index) => (
                    <MovieTab
                        key={index}
                        movie={movie}
                        userId={loggedUserId}
                        onVoteUpdated={refreshMovies}
                    />
                ))}
            </ul>
        </div>
        )
}

export default MovieSection;
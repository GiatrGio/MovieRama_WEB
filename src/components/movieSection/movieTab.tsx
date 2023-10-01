import React, {useState} from 'react';
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";
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
interface MovieTabProps {
    movie: Movie;
    userId: number;
    onVoteUpdated: () => void;
}

const MovieTab: React.FC<MovieTabProps> = ({ movie, userId, onVoteUpdated }) => {
    const [liked, setLiked] = useState(false);
    const [hated, setHated] = useState(false);
    const dateAdded = new Date(movie.dateAdded);

    const relativeTime = formatDistanceToNow(dateAdded, { addSuffix: true });

    const handleVote = async (voteType: string) => {
        try {
            await axios.post(`${BASE_API_URL}/api/votes`, {
                user: { userId },
                movie: { movieId: movie.movieId },
                voteType,
            });

            if (voteType === 'LIKE') {
                setLiked(true);
                setHated(false);
            } else if (voteType === 'HATE') {
                setLiked(false);
                setHated(true);
            }
            onVoteUpdated();
        } catch (error) {
            // Handle error here
        }
    };

    const canUserVote = () => {
        return movie.userId !== userId && userId !== 0;
    }

    return (
        <div className="movieTab">
            <h2>{movie.title}</h2>
            <p>Description: {movie.description}</p>
            <p>Date added: {relativeTime}</p>
            {canUserVote() && !liked ? (
                <button onClick={() => handleVote('LIKE')}>Like</button>
            ) : null}
            {canUserVote() && !hated ? (
                <button onClick={() => handleVote('HATE')}>Hate</button>
            ) : null}
            <p>Likes: {movie.likes}</p>
            <p>Hates: {movie.hates}</p>
            <p>User that added the movie: <b>{movie.username}</b></p>
        </div>

    );
};

export default MovieTab;
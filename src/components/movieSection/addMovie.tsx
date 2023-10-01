import {useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../config";

interface AddMovieProps {
    userId: number;
    onMovieAdded: () => void;
}
const AddMovie: React.FC<AddMovieProps> = ({userId, onMovieAdded}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        userId: userId,
    });

    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(`${BASE_API_URL}/api/movies`, {
                title: formData.title,
                description: formData.description,
                userId: userId,
            });

            setError(null);
            onMovieAdded();
        } catch (error) {
            setError('Failed to add the movie. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add a New Movie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add Movie</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddMovie;
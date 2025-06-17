export default function MovieCard({ title, image, releaseDate }) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-md p-3 transition-transform duration-300 hover:scale-105">
            <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">Release: {releaseDate}</p>
        </div>
    );
}

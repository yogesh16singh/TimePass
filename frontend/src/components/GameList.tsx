import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

interface Game {
  _id: string;
  name: string;
  url: string;
  author: string;
  publishedDate: string;
}

interface GameListProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);

  useEffect(() => {
    const fetchFilteredGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games", {
          params: { search, sort },
        });
        setFilteredGames(response.data);
      } catch (error) {
        console.error("Error fetching filtered games:", error);
      }
    };
    fetchFilteredGames();
  }, [search, sort, games]);

  const handleClearSearch = () => {
    setSearch("");
    setSort("");
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">All Games</h2>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-white/30 p-2 rounded bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Search games"
          />
        </div>
        
        {(search || sort) && (
          <button
            onClick={handleClearSearch}
            className="flex items-center gap-1 border border-white/30 bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition-all duration-200"
            aria-label="Clear search and sort"
          >
            <RxCrossCircled />
            Clear
          </button>
        )}
      </div>
      {filteredGames.length === 0 ? (
        <p className="text-white/70 text-center">No games found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game._id}
              className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 transform hover:scale-105 p-6 relative"
              whileHover={{ y: -5 }}
              tabIndex={0}
              role="article"
              aria-label={`Game card for ${game.name}`}
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(game);
                  }}
                  className="text-secondary hover:text-accent transition-colors duration-200"
                  aria-label={`Edit ${game.name}`}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(game._id);
                  }}
                  className="text-danger hover:text-red-600 transition-colors duration-200"
                  aria-label={`Delete ${game.name}`}
                >
                  <RiDeleteBin2Fill size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="https://timepass.games/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drop-shadow-sm"
                  aria-label={`Visit ${game.name} website`}
                >
                  <img src={'https://cdn.timepass.games/images/5f40e69b-0cec-4d0e-a2c1-cf4ed950d1b2.webp'} alt="Game Logo" className="w-16 h-16" />
                </a>
                <h3 className="text-xl font-bold text-dark truncate">
                  {game.name}
                </h3>
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm -mt-1 group"
                >
                  <span className="relative text-secondary after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all after:duration-300 group-hover:after:w-full">
                    Play Now
                  </span>
                  <FaExternalLinkAlt
                    className="text-gray-500 transition-colors duration-300 group-hover:text-secondary"
                    size={12}
                  />
                </a>
              </div>
              <div className="my-2">
                <p className="text-sm text-gray-600">Author: {game.author}</p>
                <p className="text-sm text-gray-600">
                  Published:{" "}
                  {new Date(game.publishedDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameList;

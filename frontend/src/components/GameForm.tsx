import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

interface Game {
  _id: string;
  name: string;
  url: string;
  author: string;
  publishedDate: string;
}

interface GameFormProps {
  onSubmit: (id: string | undefined, game: Omit<Game, "_id">) => void;
  selectedGame: Game | null;
  clearSelection: () => void;
}

const GameForm: React.FC<GameFormProps> = ({
  onSubmit,
  selectedGame,
  clearSelection,
}) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  useEffect(() => {
    if (selectedGame) {
      setName(selectedGame.name);
      setUrl(selectedGame.url);
      setAuthor(selectedGame.author);
      setPublishedDate(
        new Date(selectedGame.publishedDate).toISOString().split("T")[0]
      );
    } else {
      setName("");
      setUrl("");
      setAuthor("");
      setPublishedDate("");
    }
  }, [selectedGame]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url || !author || !publishedDate) {
      alert("All fields are required");
      return;
    }
    onSubmit(selectedGame?._id, { name, url, author, publishedDate });
    if (!selectedGame) {
      // Reset form after adding a new game
      setName("");
      setUrl("");
      setAuthor("");
      setPublishedDate("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg shadow-card ${
        selectedGame
          ? "border-2 border-secondary bg-white"
          : "border-2 border-secondary bg-white"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-dark">
        {selectedGame ? "Edit Game" : "Add New Game"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-dark ml-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-secondary/30 p-2 rounded bg-white text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-dark ml-1"
          >
            URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border border-secondary/30 p-2 rounded bg-white text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-dark ml-1"
          >
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-secondary/30 p-2 rounded bg-white text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="publishedDate"
            className="block text-sm font-medium text-dark ml-1"
          >
            Published Date
          </label>
          <input
            id="publishedDate"
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="w-full border border-secondary/30 p-2 rounded bg-white text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
            required
            aria-required="true"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex items-center gap-1 bg-secondary text-white px-4 py-2 rounded hover:bg-accent transition-all duration-200 transform hover:scale-105 shadow-md"
            aria-label={selectedGame ? "Update game" : "Add game"}
          >
            {/* <FaCircleCheck /> */}
            {selectedGame ? "Update" : "Add"} Game
          </button>
          {selectedGame && (
            <button
              type="button"
              onClick={clearSelection}
              className="flex items-center gap-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-md"
              aria-label="Cancel edit"
            >
              <RxCrossCircled />
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default GameForm;

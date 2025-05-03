import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameList from "./components/GameList";
import GameForm from "./components/GameForm";

interface Game {
  _id: string;
  name: string;
  url: string;
  author: string;
  publishedDate: string;
}

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/games"
      );
      setGames(response.data);
    } catch (error) {
      toast.error("Failed to fetch games");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSubmit = async (
    id: string | undefined,
    game: Omit<Game, "_id">
  ) => {
    setLoading(true);
    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/games/${id}`,
          game
        );
        toast.success("Game updated successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/games",
          game
        );
        toast.success("Game added successfully");
      }
      fetchGames();
      setSelectedGame(null);
    } catch (error) {
      toast.error(id ? "Failed to update game" : "Failed to add game");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGame = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/games/${id}`
      );
      toast.success("Game deleted successfully");
      fetchGames();
    } catch (error) {
      toast.error("Failed to delete game");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-1">
      <h1 className="text-4xl font-bold mb-8 text-white text-center drop-shadow-lg">
        Gamer
      </h1>
      {loading && <div className="text-center text-white">Loading...</div>}
      <div className="max-w-4xl mx-auto">
        <GameForm
          onSubmit={handleSubmit}
          selectedGame={selectedGame}
          clearSelection={() => setSelectedGame(null)}
        />
        <GameList
          games={games}
          onEdit={setSelectedGame}
          onDelete={handleDeleteGame}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default App;

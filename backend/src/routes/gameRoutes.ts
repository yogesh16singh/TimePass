import express, { Request, Response, Router } from "express";
import Game, { IGame } from "../models/Game";

const router: Router = express.Router();

// Create a game
/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - url
 *               - author
 *               - publishedDate
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: ['Coming Soon', 'Live', 'Beta', '']
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Error creating game
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const game = new Game(req.body);
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ message: "Error creating game", error });
  }
});

// Read a single game
/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Error fetching game", error });
  }
});

// Get all games
/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games with optional search and sort
 *     tags: [Games]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or author
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest, today]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const { search, sort } = req.query;
    let query: any = {};

    // Search by name or author
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Sort by publishedDate
    let sortOption: any = {};
    if (sort === "newest") {
      sortOption = { publishedDate: -1 };
    } else if (sort === "oldest") {
      sortOption = { publishedDate: 1 };
    } else if (sort === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      query.publishedDate = { $gte: today, $lt: tomorrow };
    }

    const games = await Game.find(query).sort(sortOption);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games", error });
  }
});

// Update a game
/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Update a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: "Error updating game", error });
  }
});

// Delete a game
/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *       404:
 *         description: Game not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json({ message: "Game deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting game", error });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - name
 *         - url
 *         - author
 *         - publishedDate
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         url:
 *           type: string
 *         author:
 *           type: string
 *         publishedDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: ['Coming Soon', 'Live', 'Beta', '']
 */

export default router;

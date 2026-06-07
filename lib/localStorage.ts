import { Game } from "./types"

const STORAGE_KEY = "mahjong_games";

export const saveGame = (game: Game): void => {
    const allGames = loadAllGames();
    allGames.push(game);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allGames));
};

export const loadGame = (id: string): Game | undefined => {
    const games = loadAllGames();
    return games.find((g) => g.id === id);
};

export const loadAllGames = (): Game[] => {
    if (typeof window === "undefined") return [];

    const jsonText = localStorage.getItem(STORAGE_KEY);
    if (!jsonText) return [];

    return JSON.parse(jsonText);
}
export type Wind = "east" | "south" | "west" | "north";

export type Player = {
    name: string;
    score: number;
}

export type AgariResult = {
    resultType: "agari";
    winner: number;
    agariType: "ron" | "tsumo";
    loser?: number;
    han: number;
    fu: number;
    scoreDelta: number[];
}

export type RyukyokuResult = {
    resultType: "ryukyoku";
    tenpaiPlayers: number[];
    scoreDelta: number[];
}

export type RoundResult = AgariResult | RyukyokuResult;

export type Round = {
    wind: Wind;
    roundNumber: number;
    honba: number;
    riichiSticks: number;
    result: RoundResult;
}

export type Game = {
    id: string;
    players: Player[];
    rounds: Round[];
    status: "playing" | "finished";
    createdAt: string;
}

export type AgariPayment = {
    ronPayment?: number;

    tsumoFromParent?: number;
    tsumoFromChild?: number;

    winnerGain: number;
}
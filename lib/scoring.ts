import { MANGAN_THRESHOLDS } from "./constants";
import { AgariPayment } from "./types";

export const calculateBasicPoints = (han: number, fu: number): number => {

    for (const threshold of MANGAN_THRESHOLDS.slice().reverse()) {
        if (han >= threshold.minHan) {
            return threshold.childRon / 4;
        }
    }

    const basicScore = fu * Math.pow(2, han + 2);

    return Math.min(basicScore, MANGAN_THRESHOLDS[0].childRon / 4);
}

export const calculateAgariPoints = (
    han: number,
    fu: number,
    isParent: boolean,
    isTsumo: boolean,
    honba: number,
): AgariPayment => {

    const agariPayment: AgariPayment = { winnerGain: 0 };

    const basicPoints = calculateBasicPoints(han, fu);

    if (isTsumo) {
        if (isParent) {
            agariPayment.tsumoFromChild = Math.ceil((basicPoints * 2) / 100) * 100 + honba * 100;
            agariPayment.winnerGain = agariPayment.tsumoFromChild * 3;

        } else {
            agariPayment.tsumoFromChild = Math.ceil(basicPoints / 100) * 100 + honba * 100;
            agariPayment.tsumoFromParent = Math.ceil((basicPoints * 2) / 100) * 100 + honba * 100;
            agariPayment.winnerGain = agariPayment.tsumoFromChild * 2 + agariPayment.tsumoFromParent;
        }
    } else {
        if (isParent) {
            agariPayment.ronPayment = Math.ceil((basicPoints * 6) / 100) * 100 + honba * 300;
            agariPayment.winnerGain = agariPayment.ronPayment;
        } else {
            agariPayment.ronPayment = Math.ceil((basicPoints * 4) / 100) * 100 + honba * 300;
            agariPayment.winnerGain = agariPayment.ronPayment;
        }
    }

    return agariPayment;
}

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export const SUIT_SYMBOLS: Record<Suit, string> = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
};

export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
    suit: Suit;
    rank: Rank;
}

export interface GameState {
    deck: Card[];
    playerHand: Card[];
    dealerHand: Card[];
    gameStatus: 'playing' | 'playerWon' | 'dealerWon' | 'draw';
    playerScore: number;
    dealerScore: number;
}

export type GameAction = 
    | { type: 'DEAL' }
    | { type: 'HIT' }
    | { type: 'STAND' }
    | { type: 'RESET' }; 
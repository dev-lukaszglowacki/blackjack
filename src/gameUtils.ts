import { Card, GameState, GameAction, Rank, Suit } from './types';

export const createDeck = (): Card[] => {
    const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: Card[] = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ suit, rank });
        }
    }

    return shuffleDeck(deck);
};

export const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const calculateScore = (hand: Card[]): number => {
    let score = 0;
    let aces = 0;

    for (const card of hand) {
        if (card.rank === 'A') {
            aces += 1;
            score += 11;
        } else if (['K', 'Q', 'J'].includes(card.rank)) {
            score += 10;
        } else {
            score += parseInt(card.rank);
        }
    }

    while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
    }

    return score;
};

export const initialGameState: GameState = {
    deck: createDeck(),
    playerHand: [],
    dealerHand: [],
    gameStatus: 'playing',
    playerScore: 0,
    dealerScore: 0,
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'DEAL': {
            const newDeck = [...state.deck];
            const playerHand = [newDeck.pop()!, newDeck.pop()!];
            const dealerHand = [newDeck.pop()!, newDeck.pop()!];
            
            return {
                ...state,
                deck: newDeck,
                playerHand,
                dealerHand,
                playerScore: calculateScore(playerHand),
                dealerScore: calculateScore(dealerHand),
            };
        }
        case 'HIT': {
            const newDeck = [...state.deck];
            const newCard = newDeck.pop()!;
            const playerHand = [...state.playerHand, newCard];
            const playerScore = calculateScore(playerHand);

            let gameStatus = state.gameStatus;
            if (playerScore > 21) {
                gameStatus = 'dealerWon';
            }

            return {
                ...state,
                deck: newDeck,
                playerHand,
                playerScore,
                gameStatus,
            };
        }
        case 'STAND': {
            let dealerHand = [...state.dealerHand];
            let dealerScore = state.dealerScore;
            
            while (dealerScore < 21 && dealerScore <= state.playerScore) {
                const newCard = state.deck.pop()!;
                dealerHand = [...dealerHand, newCard];
                dealerScore = calculateScore(dealerHand);
                
                if (dealerScore > 21) {
                    break;
                }
            }

            let gameStatus: GameState['gameStatus'] = 'playing';
            if (dealerScore > 21) {
                gameStatus = 'playerWon';
            } else if (dealerScore > state.playerScore) {
                gameStatus = 'dealerWon';
            } else if (dealerScore < state.playerScore) {
                gameStatus = 'playerWon';
            } else {
                gameStatus = 'draw';
            }

            return {
                ...state,
                dealerHand,
                dealerScore,
                gameStatus,
            };
        }
        case 'RESET': {
            return {
                ...initialGameState,
                deck: createDeck()
            };
        }
        default:
            return state;
    }
}; 
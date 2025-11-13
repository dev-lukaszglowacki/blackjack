# Blackjack Game

This is a simple Blackjack card game application built as a web interface. The user can play against an automated dealer, following the standard rules of the game.

## Technologies Used

*   **React:** The core user interface is built using the React library.
*   **TypeScript:** The application is written in TypeScript, providing static typing for better code quality and maintainability.
*   **Material-UI (MUI):** The UI components and styling are implemented using the Material-UI library for a clean and modern look.
*   **Vite:** The project uses Vite for a fast and efficient development build process.

## Features

*   **Game Logic:** The core game logic, including deck creation, shuffling, and score calculation, is handled in a dedicated utility file.
*   **State Management:** The game's state is managed using React's `useReducer` hook, providing a predictable state container.
*   **User Actions:** The player can perform the main actions of a Blackjack game:
    *   **Deal:** Start a new round by dealing cards.
    *   **Hit:** Take an additional card.
    *   **Stand:** End the turn and let the dealer play.
*   **Game Status:** The application clearly displays the status of the game, including the winner or if it's a draw.
*   **Play Again:** Users can easily start a new game after a round is completed.
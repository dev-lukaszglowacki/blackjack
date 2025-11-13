import { useReducer } from 'react';
import { Box, Button, Container, Typography, Paper, Grid } from '@mui/material';
import { gameReducer, initialGameState } from './gameUtils';
import { SUIT_SYMBOLS } from './types';

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const handleDeal = () => dispatch({ type: 'DEAL' });
  const handleHit = () => dispatch({ type: 'HIT' });
  const handleStand = () => dispatch({ type: 'STAND' });
  const handleReset = () => dispatch({ type: 'RESET' });

  const getCardColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
  };

  const renderCard = (card: { suit: string; rank: string }, index: number) => (
    <Paper
      key={index}
      elevation={3}
      sx={{
        padding: 2,
        margin: 1,
        minWidth: 100,
        minHeight: 140,
        textAlign: 'center',
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '2px solid #ccc',
        borderRadius: '10px',
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          color: getCardColor(card.suit),
          fontSize: '1.2rem',
          fontWeight: 'bold',
          position: 'absolute',
          top: 8,
          left: 8,
        }}
      >
        {card.rank}
      </Typography>
      <Typography 
        variant="h4" 
        sx={{ 
          color: getCardColor(card.suit),
          fontSize: '2.5rem',
          margin: 'auto',
        }}
      >
        {SUIT_SYMBOLS[card.suit as keyof typeof SUIT_SYMBOLS]}
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: getCardColor(card.suit),
          fontSize: '1.2rem',
          fontWeight: 'bold',
          position: 'absolute',
          bottom: 8,
          right: 8,
          transform: 'rotate(180deg)',
        }}
      >
        {card.rank}
      </Typography>
    </Paper>
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Blackjack
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: '#1a6c3b' }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Dealer's Hand ({gameState.dealerScore})
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 3 }}>
            {gameState.dealerHand.map(renderCard)}
          </Box>

          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Your Hand ({gameState.playerScore})
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 3 }}>
            {gameState.playerHand.map(renderCard)}
          </Box>

          {gameState.gameStatus !== 'playing' && (
            <Typography variant="h5" color="white" align="center" gutterBottom>
              {gameState.gameStatus === 'playerWon' && 'You Won!'}
              {gameState.gameStatus === 'dealerWon' && 'Dealer Won!'}
              {gameState.gameStatus === 'draw' && "It's a Draw!"}
            </Typography>
          )}

          <Grid container spacing={2} justifyContent="center">
            {gameState.gameStatus === 'playing' ? (
              <>
                {gameState.playerHand.length === 0 ? (
                  <Button variant="contained" color="primary" onClick={handleDeal}>
                    Deal Cards
                  </Button>
                ) : (
                  <>
                    <Button variant="contained" color="primary" onClick={handleHit}>
                      Hit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleStand}>
                      Stand
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={handleReset}>
                Play Again
              </Button>
            )}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default App; 
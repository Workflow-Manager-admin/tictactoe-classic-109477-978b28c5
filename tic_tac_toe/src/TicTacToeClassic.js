import React, { useState } from "react";

/**
 * Color scheme constants for inline styles
 */
const COLORS = {
  primary: "#ffffff",
  secondary: "#222222",
  accent: "#4caf50",
  gridBorder: "#cccccc",
};

const EMPTY_BOARD = Array(9).fill(null);

/**
 * Utility to get the winner and winning line.
 * @param {Array} squares - The game board array
 * @returns {{winner: string | null, line: number[] | null, draw: boolean}}
 */
function calculateWinner(squares) {
  // All possible winning combinations
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], // cols
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: lines[i], draw: false };
    }
  }
  // Draw: no empty squares and no winner
  const draw = squares.every(Boolean);
  return { winner: null, line: null, draw };
}

/**
 * Square button component for grid cell.
 */
function Square({ value, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: highlight
          ? COLORS.accent
          : COLORS.primary,
        color: highlight || value === "X"
            ? COLORS.secondary
            : COLORS.accent,
        border: `2px solid ${COLORS.secondary}`,
        borderRadius: 8,
        width: 64,
        height: 64,
        fontSize: "2.1rem",
        fontWeight: "bold",
        boxShadow: highlight ? "0 0 5px #7bebac" : "none",
        cursor: value ? "default" : "pointer",
        transition: "background 0.2s, color 0.2s",
        outline: highlight ? `2px solid ${COLORS.accent}` : "none",
        margin: 0,
        userSelect: "none",
      }}
      disabled={!!value || highlight === undefined}
      aria-label={value ? `Cell ${value}` : "Empty cell"}
      data-testid="ttt-square"
    >
      {value}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Main container for TicTacToe Classic (two-player, single device).
 */
export default function TicTacToeClassic() {
  /**
   * board: array of 9 squares ("X", "O", or null)
   * xIsNext: boolean (true = X's turn, false = O's)
   * gameOver: boolean flag when win or draw occurs
   */
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const { winner, line, draw } = calculateWinner(board);

  /**
   * Handle click on a square. Only update if allowed.
   * @param {number} idx - Index of square clicked
   */
  function handleSquareClick(idx) {
    if (board[idx] || winner || draw) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  /**
   * Reset board to start a new game.
   */
  function resetGame() {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
  }

  // Determines status message shown above the grid
  let status;
  if (winner) {
    status = (
      <span
        style={{
          color: COLORS.accent,
          fontWeight: 700,
          letterSpacing: 1.2,
        }}
        data-testid="ttt-winner"
      >
        Player {winner} wins!
      </span>
    );
  } else if (draw) {
    status = (
      <span
        style={{
          color: COLORS.secondary,
          fontWeight: 700,
          letterSpacing: 1.2,
        }}
        data-testid="ttt-draw"
      >
        Draw game!
      </span>
    );
  } else {
    status = (
      <span
        data-testid="ttt-turn"
        style={{
          color: COLORS.accent,
          fontWeight: 500,
        }}
      >
        Turn: <span style={{
          color: COLORS.secondary,
          background: COLORS.primary,
          padding: "0 0.5em",
          borderRadius: 4,
          fontWeight: 700,
        }}>
          Player {xIsNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  // Grid rendering
  function renderGrid() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(3, 64px)",
          gridTemplateColumns: "repeat(3, 64px)",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          background: COLORS.gridBorder,
          borderRadius: 14,
          padding: 14,
          boxShadow: "0 4px 24px #ddd4",
        }}
      >
        {board.map((value, idx) => (
          <Square
            key={idx}
            value={value}
            onClick={() => handleSquareClick(idx)}
            highlight={line?.includes(idx) ? true : false}
          />
        ))}
      </div>
    );
  }

  // Main container styling
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.primary,
        borderRadius: 22,
        boxShadow: "0 4px 40px #0002",
        margin: "48px auto",
        maxWidth: 340,
        padding: "36px 20px 28px",
      }}
      data-testid="ttt-container"
    >
      <div
        style={{
          marginBottom: 26,
          fontSize: "1.18rem",
          letterSpacing: 0.6,
          textAlign: "center",
        }}
      >
        {status}
      </div>
      {renderGrid()}
      <button
        className="btn btn-large"
        style={{
          marginTop: 32,
          background: COLORS.accent,
          color: COLORS.primary,
          fontWeight: 500,
          border: "none",
          borderRadius: 6,
          fontSize: "1.1rem",
          boxShadow: "0 2px 8px #4caf5033",
          width: 164,
          alignSelf: "center",
          transition: "background 0.18s, color 0.18s",
        }}
        onClick={resetGame}
        data-testid="ttt-reset"
      >
        Reset Game
      </button>
    </div>
  );
}

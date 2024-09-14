import { useState } from "react";
import { Grid } from "./Grid";
import { NumberPicker } from "./NumberPicker";
import { Actions } from "./Actions";
import { solveSudoku } from "./utils/sodoku-solver";

const initialGrid = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const gridHistory: number[][][] = [initialGrid];

function App() {
	const [grid, setGrid] = useState(initialGrid);
	const [selectedNumber, setSelectedNumber] = useState(0);

	const handleChange = (row: number, col: number) => {
		if (selectedNumber === 0) return;

		const newGrid = grid.map((r, i) =>
			r.map((cell, j) => (i === row && j === col ? selectedNumber : cell))
		);

		gridHistory.push(newGrid);

		setGrid(newGrid);
	};

	const handleUndo = () => {
		if (gridHistory.length > 1) {
			const previousGrid = gridHistory[gridHistory.length - 2];
			setGrid(previousGrid);
			gridHistory.pop();
		}
	};

	const handleSolve = () => {
		const gridCopy = grid.map((row) => [...row]); // Create a copy of the grid
		if (solveSudoku(gridCopy)) {
			setGrid(gridCopy); // Update the grid with the solution
			gridHistory.push(gridCopy);
		} else {
			alert("This Sudoku puzzle cannot be solved.");
		}
	};

	const handleReset = () => {
		setGrid(initialGrid);
		gridHistory.push(initialGrid);
	};

	return (
		<main className="h-screen flex flex-col gap-10 items-center justify-center bg-blue-300">
			<Grid
				grid={grid}
				selectedNumber={selectedNumber}
				handleChange={handleChange}
			/>
			<NumberPicker
				selectedNumber={selectedNumber}
				setSelectedNumber={setSelectedNumber}
			/>
			<Actions
				handleUndo={handleUndo}
				handleReset={handleReset}
				handleSolve={handleSolve}
			/>
		</main>
	);
}

export default App;

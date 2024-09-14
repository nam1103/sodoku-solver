export const isValid = (
	grid: number[][],
	row: number,
	col: number,
	num: number
) => {
	// Check row
	for (let i = 0; i < 9; i++) {
		if (grid[row][i] === num) return false;
	}
	// Check column
	for (let i = 0; i < 9; i++) {
		if (grid[i][col] === num) return false;
	}
	// Check 3x3 box
	const boxRow = Math.floor(row / 3) * 3;
	const boxCol = Math.floor(col / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[boxRow + i][boxCol + j] === num) return false;
		}
	}
	return true;
};

// Backtracking solver function
export const solveSudoku = (grid: number[][]) => {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (grid[row][col] === 0) {
				for (let num = 1; num <= 9; num++) {
					if (isValid(grid, row, col, num)) {
						grid[row][col] = num;
						if (solveSudoku(grid)) {
							return true;
						}
						grid[row][col] = 0; // Backtrack
					}
				}
				return false; // Trigger backtracking
			}
		}
	}
	return true; // Solved
};

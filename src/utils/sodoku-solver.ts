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

// sudokuValidator.ts

export const isValidSudoku = (grid: number[][]): boolean => {
	// Function to check if a group (row, column, or subgrid) is valid
	const isValidGroup = (group: number[]): boolean => {
		const seen = new Set<number>();
		for (const num of group) {
			if (num !== 0) {
				if (seen.has(num)) return false;
				seen.add(num);
			}
		}
		return true;
	};

	// Check rows
	for (const row of grid) {
		if (!isValidGroup(row)) return false;
	}

	// Check columns
	for (let col = 0; col < 9; col++) {
		const column = grid.map((row) => row[col]);
		if (!isValidGroup(column)) return false;
	}

	// Check 3x3 subgrids
	for (let boxRow = 0; boxRow < 9; boxRow += 3) {
		for (let boxCol = 0; boxCol < 9; boxCol += 3) {
			const subgrid: number[] = [];
			for (let row = boxRow; row < boxRow + 3; row++) {
				for (let col = boxCol; col < boxCol + 3; col++) {
					subgrid.push(grid[row][col]);
				}
			}
			if (!isValidGroup(subgrid)) return false;
		}
	}

	return true;
};

// Backtracking solver function
export const solveSudoku = (grid: number[][]) => {
	if (!isValidSudoku(grid)) return false;

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

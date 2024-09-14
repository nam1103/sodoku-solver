type Props = {
	grid: number[][];
	selectedNumber: number;
	handleChange: (row: number, col: number) => void;
};

export const Grid = ({ grid, selectedNumber, handleChange }: Props) => {
	const getCellClasses = (rowIndex: number, colIndex: number) => {
		let classes = `w-12 h-12 text-center border flex justify-center items-center text-xl font-bold cursor-pointer hover:bg-blue-200 transition-colors duration-75 select-none`;

		// Outer border (thick for edges of the grid)
		if (rowIndex === 0) classes += " border-t-4 ";
		if (rowIndex === 8) classes += " border-b-4 ";
		if (colIndex === 0) classes += " border-l-4 ";
		if (colIndex === 8) classes += " border-r-4 ";

		// Add thicker borders for 3x3 block boundaries (inside)
		if (rowIndex % 3 === 0 && rowIndex !== 0) classes += " border-t-2 ";
		if (colIndex % 3 === 0 && colIndex !== 0) classes += " border-l-2 ";

		// Add background colors for 3x3 blocks (alternating colors)
		const isDarkBlock =
			(Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0;
		classes += isDarkBlock ? " bg-gray-200" : " bg-white";

		return classes;
	};

	return (
		<div className="grid grid-cols-9 shadow-md">
			{grid.map((row, rowIndex) => (
				<>
					{row.map((num, colIndex) => (
						<div
							key={`${rowIndex}-${colIndex}`}
							className={getCellClasses(rowIndex, colIndex)}
							onClick={() => handleChange(rowIndex, colIndex)}
						>
							{num === 0 ? "" : num}
						</div>
					))}
				</>
			))}
		</div>
	);
};

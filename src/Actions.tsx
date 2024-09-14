type Props = {
	handleUndo: () => void;
	handleReset: () => void;
	handleSolve: () => void;
};

export const Actions = ({ handleUndo, handleReset, handleSolve }: Props) => {
	return (
		<div className="flex bg-white rounded-sm h-10 font-semibold text-lg border-gray-200 border-2">
			<button
				onClick={handleSolve}
				className="px-2 border-gray-200 border-r-2 hover:bg-blue-200"
			>
				Solve
			</button>
			<button
				onClick={handleUndo}
				className="px-2 border-gray-200 border-r-2 hover:bg-blue-200"
			>
				Undo
			</button>
			<button onClick={handleReset} className="px-2 hover:bg-blue-200">
				Reset
			</button>
		</div>
	);
};

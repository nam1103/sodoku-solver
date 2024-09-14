type Props = {
	selectedNumber: number;
	setSelectedNumber: (number: number) => void;
};

export const NumberPicker = ({ selectedNumber, setSelectedNumber }: Props) => {
	return (
		<div className="flex shadow-md">
			{[...Array(9)].map((_, index) => (
				<div
					className={`hover:bg-blue-200 transition-colors duration-75 bg-white size-12 text-xl flex justify-center items-center border-gray-200 border-y-2 border-r-2 cursor-pointer select-none font-bold ${
						index === 0 && "border-l-2"
					} ${selectedNumber === index + 1 && "bg-blue-200"}`}
					onClick={() => setSelectedNumber(index + 1)}
				>
					{index + 1}
				</div>
			))}
		</div>
	);
};

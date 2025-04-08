# Task 1:	
	const controller = new AbortController();
	async function processWithDelay(numbers: number[], delay: number = 1000): Promise<void> {
		try {
			if (Array.isArray(numbers) && numbers.length === 0) {
				console.log('Array is empty');
				return;
			}
			if (!Array.isArray(numbers) || numbers.some(num=> typeof num !== 'number')) {
				throw new Error('Invalid input: Expected an array of numbers');
			}
			else {
				for(let i = 0; i < numbers.length; i++){
					await new Promise<void>((resolve, reject) => {
						setTimeout(() => {
							if(numbers[i]){
								console.log(numbers[i]);
								const progress = ((i + 1) / numbers.length) * 100;
                				console.log(`Progress: ${progress.toFixed(2)}%`);
								resolve();
							}
							else {
								reject(`Error: Index ${i} - ${numbers[i]} is not a number`);
							}
						}, delay);
					}).catch(error=> console.log(error));
				}
				console.log('All numbers have been processed.');
			}
		}
		catch(error){
			console.log(error)
		}
	};

	processWithDelay([1, 2, 3, 4], 3000)

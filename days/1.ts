export const day1 = (input: string) => {
    const validNumber = []; 
    const charArray = input.split('');

    charArray.forEach((value: string, index: number) => {
        const currentValue = parseInt(value, 10);
        const nextValue = parseInt(charArray[(index + 1) % charArray.length], 10)

        if (currentValue === nextValue) {
            validNumber.push(currentValue);
        }
    });

    if (!validNumber.length) {
        return;
    }
    
    console.log(validNumber.reduce((current: number, next: number) => current + next));
}

export const day1Part2 = (input: string) => {
    const validNumber = [];
   
    const charArray = input.split('');
    const step = charArray.length / 2

    charArray.forEach((value: string, index: number) => {
        const currentValue = parseInt(value, 10);

        const nextStep = (index + step) % charArray.length;
        const nextValue = parseInt(charArray[nextStep], 10)

        if (currentValue === nextValue) {
            validNumber.push(currentValue);
        }
    });
    
    console.log(validNumber.reduce((current: number, next: number) => current + next));
}
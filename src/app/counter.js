/*
let numbers = [3, 2, 5, 1, 7, 2].sort().reverse();

let width = 10;
let lines = [];

while (numbers.length > 2) {
    let first = numbers[0]
    let remaining = width - first;
    let found = false;
    let i = 1;
    while (!found && i < numbers.length - 1) {
        let j = i + 1;
        let target = remaining - numbers[i];
        while (numbers[j] != target && j < numbers.length - 1) {
            j++;
        }
        if (numbers[j] === target) {
            found = true;
            let solution = [numbers[0], numbers[i], numbers[j]];
            lines.push(solution);
            console.log(solution);
            numbers.splice(numbers.indexOf(numbers[0]), 1);
            numbers.splice(numbers.indexOf(numbers[i]), 1);
            numbers.splice(numbers.indexOf(numbers[j]), 1);
        }
        i++;
    }
}
*/
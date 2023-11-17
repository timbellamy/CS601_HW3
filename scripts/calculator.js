function calculator(){
    let person = prompt("Please enter you name: ");
    alert(`Hi ${person}`);
    do {
        let userList =
            prompt("Please enter a list of numbers separated by a comma.");

        let numberArray = convert(userList.split(","));

        numberArray = sort(numberArray);
        let total = calculate(numberArray);
        alert(total);

    }while (checkContinue())


}

const convert = (list) =>{
    let numberArray = [];

    list.forEach((num) => { numberArray.push(parseInt(num))});
    return numberArray;
}

const sort = (numberArray) =>{
    let newArray = [];

    for(let i = 0; i < numberArray.length; i++){
        if(i + 1 === numberArray.length){
            newArray.push(numberArray[i]);
            continue;
        }

        if (numberArray[i] >= numberArray[i+1]){
            newArray.push(numberArray[i]);
        }
    }
    return newArray;
}

const calculate = (numberArray) => {
    let total = 0;
    numberArray.forEach((num) => {
        total += num;
    })

    return total;
}

const checkContinue = () =>{
    return confirm("Would you like to calculate another number ?" );
}


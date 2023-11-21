const threshold = 50;

// Works with vanilla JS prompt and alert
function calculator(){
    let person = prompt("Please enter you name.");

    while(person === ""){
        person = prompt("You must enter you name to continue. Please enter you name.");
    }
    let checkContinue = "";

    if (person){
        alert(`Hi ${person}`);

        do {
            let userList =
                prompt("Please enter a list of numbers separated by a comma.");
            checkContinue = "";

            let numberArray = convert(userList.split(","));
            if(numberArray.includes(NaN)){
                alert(`${userList} contians non numbers. Please only enter numbers.`);
                checkContinue = "yes";
                continue;
            }

            numberArray = sort(numberArray);
            let total = calculate(numberArray);
            let totalMessage = "The sum of the numbers is: " + total;

            let message = `${totalMessage} \n${total > threshold ? 'That is a big number.' : 'That is a small number.'}`;

            alert(message);
            
            let recivedValidOption = false

            while(!recivedValidOption){
                checkContinue = prompt("Would you like to calculate another number? Enter yes or no");
                if(checkContinue === "yes" || checkContinue === "no"){
                    recivedValidOption = true;
                }else{
                    alert(`${checkContinue} is not a valid option`);
                }
            }

        }while (checkContinue === "yes");

        alert("Thank you for using Calculator.");
    }
}

function convert(list){
    let numberArray = [];

    list.forEach((num) => { numberArray.push(parseInt(num))});
    return numberArray;
}

function sort(numberArray){
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

function calculate(numberArray){
    let total = 0;
    numberArray.forEach((num) => {
        total += num;
    })

    return total;
}

const numberValidator =(data) =>{
    let list = data.split(",");
    list = convert(list);
    if(list.includes(NaN)){
        return `${data} contains non numbers.`;
    }
    return "";
}

const optionValidator = (data) =>{
    if(data === "yes" || data === "no"){
        return "";
    }
    return "Please enter yes or no.";
}


async function run(){
    let message = "Hi!, what is your name?";
    // Create a prompt to get the user's name. This should wait for the results.
    let userName = await createPrompt(message, "Submit", "Cancel");

    // Display username
    await createAlert(`Hi! ${userName}`);
    let calculateAnother = true;
    do{
        // Create a prompt to get the user to enter in a list of numbers.
        //The program will pause for results;
        message = "Please enter a list of numbers separated by a comma.";
        let userList = await createPrompt(message, "Submit", "Cancel", numberValidator);

        // Parse the recived list to get numbers
        let numberArray = convert(userList.split(","));

        //Loop through numList and create a new array with values that meet cretia numList[i] >= numList[i+1]
        numberArray = sort(numberArray);

        //Add each value in array
        let total = calculate(numberArray);

        //Display to the user the total and if the value is large or small (large > 50)
        let totalMessage = "The sum of the numbers is: " + total;

        message = `${totalMessage} \n${total > threshold ? 'That is a big number.' : 'That is a small number.'}`;
        await createAlert(message);
        // Prompt use to see if they would like to use the calculator again. Pause for return value;
        message = "Would you like to calculate another number? Enter yes or no"
        let checkContinue = await createPrompt(message, "Submit", "Cancel", optionValidator);
        calculateAnother = checkContinue === "yes";
    }while(calculateAnother);
    
    //Create alert thanking user
    await createAlert("Thank you for using Calculator.")
}

function runCalculator(){
    let data = createPrompt("Please enter a list of numbers separated by a comma.", "Submit",  "Canel");

}

function createModal(message){
    let doc = document
    let modalContainer = doc.getElementById("container").appendChild(doc.createElement("div"));
    modalContainer.id = "modal-container";
    modalContainer.className = "modal-container"

    let modal = modalContainer.appendChild(doc.createElement("form"));
    modal.className = "modal";

    let modalContent = modal.appendChild(doc.createElement("div"));
    modalContent.className = "modal-content";
    modalContent.id = "modal-content";

        
    let messageBody = modalContent.appendChild(doc.createElement("div"));
    messageBody.className = "modal-message";
    messageBody.innerHTML = message;

    return modalContent;
}

function createPrompt(message, submittBtnText, cancelBtnText, validator){
    return new Promise((resolve) =>{
        let doc = document;
        let modalContent = createModal(message);

        let inputDiv = modalContent.appendChild(doc.createElement("div"));
        inputDiv.className = "input-div"
        inputDiv.id = "input-div";
    
        let inputBox = inputDiv.appendChild(doc.createElement("input"));
        inputBox.required = true;
        inputBox.type = Text;
        inputBox.id = "input"
        inputBox.className = "input"

        let errorMessage = inputDiv.appendChild(doc.createElement("div"));
        errorMessage.id = "error-message";
        errorMessage.className = "error-message";
    
        let btnGroup = modalContent.appendChild(doc.createElement("div"));
        btnGroup.className = "btn-group";
    
        let cancelBtn = btnGroup.appendChild(doc.createElement("button"));
        cancelBtn.innerHTML = cancelBtnText;
        cancelBtn.href = "#";
        cancelBtn.focus();
        cancelBtn.classList.add("cancel-btn", "btn");
        cancelBtn.onclick = function(){
            onCancel();
            return false;
        }
    
        let submitBtn = btnGroup.appendChild(document.createElement("button"));
        submitBtn.innerHTML = submittBtnText;
        submitBtn.href = "#";
        submitBtn.focus();
        submitBtn.classList.add("submit-btn", "btn");
        submitBtn.type = "submit";
        submitBtn.onclick = function (){
            let data = onSubmit(document.getElementById("input").value, validator);
            if(data !== undefined){
                resolve(data);
            }
           }
    });
}

function createAlert(message){
    return new Promise(resolve =>{
        let doc = document;
        let modalContent = createModal(message);

        let btnGroup = modalContent.appendChild(doc.createElement("div"));
        btnGroup.className = "btn-group";
    
        let okBtn = btnGroup.appendChild(document.createElement("button"));
        okBtn.innerHTML = "Ok";
        okBtn.href = "#";
        okBtn.focus();
        okBtn.classList.add("submit-btn", "btn");
        okBtn.type = "Ok";
        okBtn.onclick = function (){
            resolve(onCancel());
        };
    });

}

function onSubmit(data, validator){
    let validatorMessage = validator !== undefined ? validator(data) : "";

    if(data === ""){
        document.getElementById("error-message").innerHTML = "This field is requried.";
    }else if(validatorMessage !== ""){
        document.getElementById("error-message").innerHTML = validatorMessage;
        // Clear input box to keep from advancing.
        document.getElementById("input").value = "";
    }else{
        document.getElementById("container").removeChild(document.getElementById("modal-container"));
        return data;
    }
}

function onCancel(){
    document.getElementById("container").removeChild(document.getElementById("modal-container"));
}


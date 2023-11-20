const threshold = 50;

function calculator(){
    let person = prompt("Please enter you name: ");


    if (person){
        alert(`Hi ${person}`);

        do {
            let userList =
                prompt("Please enter a list of numbers separated by a comma.");

            let numberArray = convert(userList.split(","));

            numberArray = sort(numberArray);
            let total = calculate(numberArray);
            let totalMessage = "The sum of the numbers is: " + total;

            let message = `${totalMessage} \n${total > threshold ? 'That is a bing number.' : 'That is a small number.'}`;

            alert(message);


        }while (checkContinue())
    }
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


async function run(){
    let message = "Hi!, what is your name?";
    // Create a prompt to get the user's name. This should wait for the results.
    let userName = await createPromt(message, "Submit", "Cancel");

    // Display username
    await createAlert(`Hi! ${userName}`);
    let calculateAnother = true;
    do{
        // Create a prompt to get the user to enter in a list of numbers.
        //The program will pause for results;
        message = "Please enter a list of numbers separated by a comma.";
        let userList = await createPromt(message, "Submit", "Cancel");

        // Parse the recived list to get numbers
        let numberArray = convert(userList.split(","));

        //Loop through numList and create a new array with values that meet cretia numList[i] >= numList[i+1]
        numberArray = sort(numberArray);

        //Add each value in array
        let total = calculate(numberArray);

        //Display to the user the total and if the value is large or small (large > 50)
        let totalMessage = "The sum of the numbers is: " + total;

        message = `${totalMessage} \n${total > threshold ? 'That is a bing number.' : 'That is a small number.'}`;
        await createAlert(message);
        // Prompt use to see if they would like to use the calculator again. Pause for return value;
        message = "Would you like to calculate another number? Enter yes or no"
        let checkContinue = await createPromt(message, "Submit", "Cancel");
        calculateAnother = checkContinue === "yes";
    }while(calculateAnother);
    
    //Create alert thanking user
    await createAlert("Thank you for using Calculator.")
}

function runCalculator(){
    let data = createPromt("Please enter a list of numbers separated by a comma.", "Submit",  "Canel");

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

function createPromt(message, submittBtnText, cancelBtnText){
    return new Promise((resolve, reject) =>{
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
           resolve(onSubmit(document.getElementById("input").value));
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

function onSubmit(data){
    if(data === "" && document.getElementById("error-message") === null){
        let errorMessage = document.getElementById("input-div").appendChild(document.createElement("div"));
        errorMessage.id = "error-message";
        errorMessage.className = "error-message";
        errorMessage.innerHTML = "This field is requried.";
    }
    if(data !== ""){
        document.getElementById("container").removeChild(document.getElementById("modal-container"));
        return data;
    }
}

function onCancel(){
    document.getElementById("container").removeChild(document.getElementById("modal-container"));
}


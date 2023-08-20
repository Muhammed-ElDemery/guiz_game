let mainQues = document.querySelector(".question-box .question")
let answer1 = document.querySelector(".question-box .box:nth-child(1) label")
let answer2 = document.querySelector(".question-box .box:nth-child(2) label")
let answer3 = document.querySelector(".question-box .box:nth-child(3) label")
let answer4 = document.querySelector(".question-box .box:nth-child(4) label")
let radioes = document.querySelectorAll(".question-box .box input")
let subBtn = document.querySelector("button")
let counter = document.querySelector(".time p")
let span = Array.from(document.querySelectorAll(".levels span"))
let questionBox = document.querySelector(".question-box")
let answers = Array.from(document.querySelectorAll("label"))
let form = document.querySelector("form")
let container = document.querySelector(".container")
let arrayOfAnswers = []


// questions

let i = 0;
let j = -3;

let quesOne = {
    ques : "what is your university:",
    fans2:"alex univesiry",
    fans3:"ain shams univesiry",
    tans1:"cairo univesiry",
    fans4:"mansoura univesiry"
}

let quesTwo = {
    ques : "2- what is the range of your age:",
    fans2 : "13 - 28",
    tans1 : "17 - 22",
    fans3 : "12 - 14",
    fans4 : "40 - 45"
}

let quesThree = {
    ques : "3-what are you studying:",
    tans1 : "engineering",
    fans3 : "medicine",
    fans2 : "science",
    fans4 : "business"
}

let quesFour = {
    ques : "4- Are you studying math and physics:",
    tans1 : "yes",
    fans3 : "no",
    fans2 : "Sometimes",
    fans4 : "physics only"
}

let quesFive = {
    ques : "5- what is your grade in your first year in college:",
    fans2 : "good",
    tans1 : "excellent",
    fans3 : "weak",
    fans4 : "very good"
}
let arrayOfQuestions = [quesOne,quesTwo,quesThree,quesFour,quesFive];


// array of right answers 

let arrOfRightAns = [quesOne.tans1,quesTwo.tans1,quesThree.tans1,quesFour.tans1,quesFive.tans1]

// adding details \ info to lements

function addElementsInQuesBox(question) {
    creatQuestionBox(question)
    document.querySelectorAll("label")[0].innerHTML = question.tans1;
    document.querySelectorAll("label")[1].innerHTML = question.fans2;
    document.querySelectorAll("label")[2].innerHTML = question.fans3;
    document.querySelectorAll("label")[3].innerHTML = question.fans4;
    document.querySelectorAll("input")[0].value = question.tans1;
    document.querySelectorAll("input")[1].value = question.fans2;
    document.querySelectorAll("input")[2].value = question.fans3;
    document.querySelectorAll("input")[3].value = question.fans4;
    let arrayOfRdioes = Array.from(document.querySelectorAll("input"));
    form.addEventListener("click", (e) => {
        if (e.target.hasAttribute("type")) {
            arrayOfRdioes.forEach((ele) => ele.classList.remove("checked"))
            e.target.classList.add("checked")
        }
    })
    let boxes = Array.from(document.querySelectorAll("form .box"));
    let random = Math.random().toFixed(1) * 10;
    console.log(random)
    if (random > 2) {
        boxes[parseInt(random / 3)].after(boxes[0])
    }else {
        boxes[random].after(boxes[0])
    }
}



// creat question box 

function creatQuestionBox(question) {
    let questionName = document.createElement("h2");
    questionName.innerHTML = question.ques;
    questionBox.prepend(questionName);
    for (let k = 0 ; k < 4 ; k++) {
        let box = document.createElement("div");
        box.className = "box";
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.id = `1.${k}`;
        radio.setAttribute("name" , "answer")
        let label = document.createElement("label");
        label.setAttribute("for" , radio.id)
        form.prepend(box);
        box.appendChild(radio);
        box.appendChild(label);
    }
    
}

// first question will appear on the screen

addElementsInQuesBox(arrayOfQuestions[i])

// ****************************************

// time counter 

let sec = 0;
let min = 5;
counter.innerHTML = `0${min}:0${sec}`;

let seconds = setInterval(()=> {   
    if (sec == 0) {
        min--;
        sec = 59;
    }
    if (sec < 10) {
        counter.innerHTML = `0${min}:0${sec--}`;
    }else {
        counter.innerHTML = `0${min}:${sec--}`;
    }
    if (min == 0 && sec == 0) {
        clearInterval(seconds);
        counter.innerHTML = `00:00`;
    }
}, 1000)

// event to change between questions 

container.addEventListener("click", (ele) => {
    if (ele.target.classList.contains("submit")) {
        if (Array.from(document.querySelectorAll("input")).some((e) => e.classList.contains("checked"))) {
            let target = Array.from(document.querySelectorAll("input")).filter((e) => e.classList.contains("checked"))
            arrayOfAnswers.push(target[0].value);
            Array.from(document.querySelectorAll(".box")).forEach((e) => e.remove());
            document.querySelector("h2").remove();
            if (i == 4) {
                //matching answers 
                questionBox.innerHTML = intersection(arrOfRightAns , arrayOfAnswers);
                clearInterval(seconds);
                counter.innerHTML = `00:00`;
                ele.target.innerHTML = "Try Again";
                span.forEach((e) => e.classList.remove("active"))
                subBtn.onclick = () => {
                    window.location.href = "index.html"
                }
            }else {
                i++;
                j++;
                addElementsInQuesBox(arrayOfQuestions[i]);
                span[i].classList.add("active")
            }
        }
    }
})


function intersection(arr1 , arr2) {
    let result = [];
        for (let i = 0; i < arr2.length ; i++) {
            if (arr1[i] == arr2[i]) {
                result.push(arr2[i]);
            }else {
                continue;
            }
        }
    if (result.length <= 2) {
        return `You got ${result.length} out of 5, you failed`
    }else {
        return `You got ${result.length} out of 5, you passed`
    }
}


// class Question {
//    constructor(ques , tans1 , fans2 , fans3 , fans4) {
//       this.ques = ques;
//       this.tans1 = tans1;
//       this.fans2 = fans2;
//       this.fans3 = fans3;
//       this.fans4 = fans4;
//    }
// }

// let quesOne = new Question(
//    "1-how old are you:",
//    "10",
//    "15",
//    "20",
//    "25"
// );

// let quesTwo = new Question(
//    "2-what is your name:",
//    "muhhamed",
//    "ibrahim",
//    "tarek",
//    "hendy"
// );

// let quesThree = new Question(
//    "3-what are you studying:",
//    "engineering",
//    "medicine",
//    "science",
//    "business"
// );

// let quesFour = new Question(
//    "4-where do you live:",
//    "Egypt",
//    "suadi",
//    "qatar",
//    "imarates"
// );

// let quesFive = new Question(
//    "5-what is your activity:",
//    "swimming",
//    "football",
//    "voleyball",
//    "nothing"
// )

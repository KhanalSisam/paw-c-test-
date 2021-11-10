const ID = parseInt(window.location.href.split("#")[1])

// getting texts
fetch("text.json")
    .then(response => response.json())
    .then(json => {
        let text = json[ID-1]
        let title = text.title
        let time = text.time
        let text_ = text.text
        document.getElementById("title").innerText = title
        document.getElementById("text").innerHTML = insertInput(text_)
        putTime(time)
    })

const insertInput = text => {
    textWithHTML = ""
    splitted = text.split("{")
    splitted.map(part => {
        textWithoutBrackets = part.split("}")
        if (textWithoutBrackets.length == 1) {
            textWithHTML += textWithoutBrackets
        } else if (textWithoutBrackets.length == 2) {
            formattedText = `<input onfocusout="check(this)" class="input_neutral" alt="${textWithoutBrackets[0]}"> ${textWithoutBrackets[1]}`
            textWithHTML += formattedText
        } else {
            console.log("curly brackets not used properly")
        }
    })
    return `<from>${textWithHTML}</from>`
}

// checking the answer
function check(e) {
    // if (e.value.length === 0) {
    //     e.className = "input_neutral"
    // } else if (e.value === e.alt) {
    //     e.className = "input_true"
    // } else {
    //     e.className = "input_false"
    // }
}

// called from HTML to show answer
// answer are stored in alt tag in the input field
const showAnswer = () => {
    inputs = document.querySelectorAll("input")
    let e;
    for (let i = 0; i < inputs.length; i++){
        e = inputs[i]
        if (e.value && e.value === e.alt) {
            e.className = "input_true"
        } else if (e.value) {
            e.className = "input_false"
            if(e.offsetWidth <= 55) e.style.width = "70px"
            e.value = `${e.alt}||${e.value}`
        }
    }
}

// makes it so when enter is pressed, focus moves to the next input 
// mobiles dont have tabs so it makes easier
window.addEventListener('keydown', function (event) {
  if (event.key === "Enter" && event.target.nodeName === 'INPUT') {
    const form = document.querySelector("from").children;
      const index = Array.prototype.indexOf.call(form, event.target);
    form[index + 1].focus();
    event.preventDefault();
  }
}, true);

// used for time
const putTime = (time) => {

    const timeText= (oldTime) => {
        // getting min and sec in int
        let [min, sec] = oldTime.split(":").map(x => Math.abs(parseInt(x)))
        // checking if the time is negative or positive
        if (oldTime.indexOf("-") === -1 && oldTime != "00:00") {
            // if + dec by a sec
            min = sec === 0 ? min - 1 : min
            sec = sec <= 0 ? 59 : sec - 1
            if (sec === 0 && min === 0) {
                alert("You fuckin Cunt, where there is a hole theres a way, just use the bloody fuckin piece of donkey shit between ur shoulders \n      -Dalai Lama 1997")
            }
            return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
        } else {
            // if - inc by a sec and add a "-" at the beginning
            sec = sec >= 59 ? 0 : sec + 1
            min = sec == 0 ? min + 1 : min
            if (sec === 0 && min === 1) {
                alert("Dumbness has a limit, but yours is deeper then your mum's vagina \n       -Socrates")
            } else if (sec === 0 && min === 2) {
                alert("Be the reason why ur mom looses all her facebook friends cause ur straighter then the pole she dances on \n     -Sun Tzu")
            } else if (sec === 0 && min === 3) {
                window.location.href = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
            }
            return `-${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`

        }
    }
    const timeNode = document.getElementById("time").children[0]
    timeNode.innerText = time

    globalThis.timer = window.setInterval(() => {
        timeNode.innerHTML = timeText(timeNode.innerHTML)    
    },1000)
}

// to pause and unpause timer 
const pauseGo = (obj) => {
    if (obj.innerText === "Pause") {
        clearInterval(timer)
        obj.innerText = "Go"
    } else {
        putTime(document.getElementById("time").innerText)
        obj.innerText = "Pause"
    }
}
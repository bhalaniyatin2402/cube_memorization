const cubeCornerPiece = {
  ULB: {
    Ulb: "A",
    uLr: "E",
    ulB: "R",
  },
  URB: {
    Urb: "B",
    uRb: "N",
    urB: "Q",
  },
  ULF: {
    Ulf: "D",
    ulF: "I",
    uLf: "F",
  },
  DLF: {
    Dlf: "U",
    dLf: "G",
    dlF: "L",
  },
  DRF: {
    Drf: "V",
    drF: "K",
    dRf: "P",
  },
  DRB: {
    Drb: "W",
    dRb: "O",
    drB: "T",
  },
  DLB: {
    Dlb: "X",
    dLb: "H",
    dlB: "S",
  },
  // URF: {
  //     Urf: 'C',
  //     urF: 'J',
  //     uRf: 'M'
  // },
};

const cubeEdgePiece = {
  UB: {
    Ub: "અ",
    uB: "ક",
  },
  UR: {
    Ur: "બ",
    uR: "મ",
  },
  UF: {
    Uf: "છ",
    uF: "ઇ",
  },
  UL: {
    Ul: "ડ",
    uL: "એ",
  },
  FL: {
    fL: "ફ",
    Fl: "લ",
  },
  BL: {
    bL: "હ",
    Bl: "ર",
  },
  BR: {
    bR: "ન",
    Br: "ટ",
  },
  FR: {
    fR: "પ",
    Fr: "જ",
  },
  RD: {
    Rd: "ઓ",
    rD: "વ",
  },
  BD: {
    Bd: "સ",
    bD: "ઉ",
  },
  LD: {
    Ld: "ગ",
    lD: "ત",
  },
  // FD: {
  //     Fd: 'દ',
  //     fD: 'ચ'
  // },
};

const corner = document.getElementById("corner");
const edegs = document.getElementById("edegs");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
let checkAnswer = document.getElementById("checkAnswer");
let correctAnswer = document.getElementById("correctAnswer");

let finalResult = "";

function getObjectKey(obj) {
  const key = Object.keys(obj);
  const randomKey = key[Math.floor(Math.random() * key.length)];
  const subObj = obj[randomKey];
  delete obj[randomKey];
  let answer = "";

  // function for corner side
  function getSubObjectKey() {
    const subKey = Object.keys(subObj);
    const subRandomKey = subKey[Math.floor(Math.random() * subKey.length)];
    const ans = subObj[subRandomKey];
    answer = ans;
  }
  getSubObjectKey();
  return {
    subObj: subObj,
    answer: answer,
  };
}

let countOne = 0;
let countTwo = 0;
btn.addEventListener("click", () => {
  if (btn.textContent == "start") {
    let objOne = { ...cubeCornerPiece };
    let objTwo = { ...cubeEdgePiece };
    correctAnswer.innerHTML = "";
    checkAnswer.innerHTML = "";
    finalResult = "";
    input.value = "";
    btn.setAttribute("disabled", true);
    btn.textContent = "Check Answer";

    let timeInterval = setInterval(() => {
      let value = getObjectKey(objOne);
      corner.innerHTML = value.answer;
      finalResult += value.answer;
      countOne++;

      if (countOne === Object.keys(cubeCornerPiece).length) {
        countOne = 0;
        newFunc();
        clearInterval(timeInterval);
      }
    }, 400);

    function newFunc() {
      let timeIntervalTwo = setInterval(() => {
        let valueEdge = getObjectKey(objTwo);
        corner.innerHTML = "_";
        edegs.innerHTML = valueEdge.answer;
        finalResult += valueEdge.answer;
        countTwo++;

        if (countTwo === Object.keys(cubeEdgePiece).length) {
          clearInterval(timeIntervalTwo);
          btn.disabled = false;
          countTwo = 0;
        }
      }, 400);
    }
  } else {
    edegs.innerHTML = "_";
    correctAnswer.innerHTML = finalResult;
    btn.textContent = "start";
    if (finalResult === input.value) {
      checkAnswer.innerHTML = "Answer Matched";
      checkAnswer.style.color = "green";
    } else {
      checkAnswer.innerHTML = "Answer Not Matched";
      checkAnswer.style.color = "red";
    }
  }
});

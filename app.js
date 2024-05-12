var selectedItem;
var score = 0;
var resulted
const gameBoardSection = document.querySelector('.gameBoard-section')
const scoreNumberElem = document.querySelector('.score-number')


const itemsArray = [
  { id: 1, title: 'paper', img: './images/icon-paper.svg' },
  { id: 2, title: 'scissors', img: './images/icon-scissors.svg' },
  { id: 3, title: 'rock', img: './images/icon-rock.svg' }
]

function showRules() {
  console.log('showing rules...');
  document.querySelector('.RuleModal-section').classList.remove('doNotDisplay')
}
function closeRules() {
  console.log('closing rules...');
  document.querySelector('.RuleModal-section').classList.add('doNotDisplay')
}


function choiceSelectHandler(event) {
  console.log('choice Selected ...');
  selectedItem = event.target.getAttribute('name')
  showSelectedItem(selectedItem)
}

function showSelectedItem(selectedItem) {
  gameBoardSection.innerHTML = ''

  let selectedObject = itemsArray.find(item => {
    return item.title == selectedItem
  })

  let randomNum = Math.floor(Math.random() * 3) + 1
  let randomObject = itemsArray.find(item => {
    return item.id == randomNum
  })

  gameBoardSection.insertAdjacentHTML('beforeend', `
    <div class="gameBoard-pickedPart">

    <div class="pickedPart-container">
    <div class="pickedPart-title">YOU PICKED</div>
    <div class="pickedPart-icon-wrapper gameBoard-topPart-left" id="${selectedObject.title}-wrapper" name=${selectedObject.title} >
      <div class="pickedPart-iconic-wrapper" name=${selectedObject.title}>
        <img class="pickedPart-iconic" src=${selectedObject.img} name=${selectedObject.title}/>
      </div>
    </div>
    </div>

    <div class="pickedPart-container" id="pickedPart-container">
    <div class="pickedPart-title">THE HOUSE PICKED</div>
    <div class="pickedPart-icon-wrapper gameBoard-topPart-right">

    </div>
    </div>

  </div>
    `)
  setTimeout(() => {
    let pickedPartContainer = document.querySelector('#pickedPart-container')
    pickedPartContainer.innerHTML = ''
    pickedPartContainer.insertAdjacentHTML('beforeend', `
        <div class="pickedPart-title">THE HOUSE PICKED</div>
        <div class="pickedPart-icon-wrapper gameBoard-topPart-right" id="${randomObject.title}-wrapper" name=${randomObject.title} >
          <div class="pickedPart-iconic-wrapper" name=${randomObject.title}>
            <img class="pickedPart-iconic" src=${randomObject.img} name=${randomObject.title}/>
          </div>
        </div>
        `)
    calculateScoreHandler(selectedObject, randomObject)
  }, 1000);
}

function calculateScoreHandler(selectedObject, randomObject) {
  console.log('calculating...');
  // console.log(selectedObject, randomObject);
  if (selectedObject.id == randomObject.id) {
    resulted = 'draw'
  } else if ((selectedObject.id == 1 && randomObject.id == 2) || (selectedObject.id == 2 && randomObject.id == 3) || (selectedObject.id == 3 && randomObject.id == 1)) {
    resulted = 'loose'
    score--
    scoreNumberElem.innerHTML = score
  } else if ((selectedObject.id == 1 && randomObject.id == 3) || (selectedObject.id == 2 && randomObject.id == 1) || (selectedObject.id == 3 && randomObject.id == 2)) {
    resulted = 'win'
    score++
    scoreNumberElem.innerHTML = score
  }
  showResult(resulted)
}

function showResult(resulted) {
  console.log(resulted);
  console.log(score);

  const gameBoardPickedPart = document.querySelector('.gameBoard-pickedPart')
  gameBoardPickedPart.children[0].insertAdjacentHTML('afterend', `
    <div class="pickedPart-container result-pickedPart-container">
    <div class="result-title">YOU ${resulted.toUpperCase()}</div>
    <button class="result-button" onclick="playAgainHandler()">PLAY AGAIN</button>
    </div>
    `);
  if (resulted == 'win') {
    document.querySelector('.gameBoard-topPart-left').classList.add('winner-shadow')
    document.querySelector('.gameBoard-topPart-right').classList.remove('winner-shadow')
  } else if (resulted == 'loose') {
    document.querySelector('.gameBoard-topPart-left').classList.remove('winner-shadow')
    document.querySelector('.gameBoard-topPart-right').classList.add('winner-shadow')
  }
}
function playAgainHandler() {
  gameBoardSection.innerHTML = ''
  gameBoardSection.insertAdjacentHTML('beforeend', `
    <div class="gameBoard-container">
      <div class="gameBoard-topPart">
        <div class="icon-wrapper gameBoard-topPart-left" id="paper-wrapper" name="paper" onclick="choiceSelectHandler(event)">
          <div class="iconic-wrapper" name="paper">
            <img class="iconic" src="./images/icon-paper.svg" name="paper"/>
          </div>
        </div>

        <div class="icon-wrapper gameBoard-topPart-right" id="scissors-wrapper" name="scissors" onclick="choiceSelectHandler(event)">
          <div class="iconic-wrapper" name="scissors">
            <img class="iconic" src="./images/icon-scissors.svg" name="scissors"/>
          </div>
        </div>
      </div>

      <div class="icon-wrapper gameBoard-downPart" id="rock-wrapper" name="rock" onclick="choiceSelectHandler(event)">
        <div class="iconic-wrapper" name="rock">
          <img class="iconic" src="./images/icon-rock.svg" name="rock"/>  
        </div>
      </div>
      
    </div>
    `)
}
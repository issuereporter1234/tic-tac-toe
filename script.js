const Gameboard = {
    player1 :'X',
    player2 :'O',
    fields: ['','' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''],
    reset(){
        this.fields = ['', '', '', '', '', '', '', '', '', '']

    },
    gameOver: false
}

const turns = {
    player1Turn: true,
    player2Turn: false,
    changeTurn(){
        if(this.player1Turn){
            this.player1Turn = false
            this.player2Turn = true
        }
        else if(this.player2Turn){
            this.player2Turn = false
             this.player1Turn = true
        }
        else{
            throw Error('Error with a function turns.changeTurn')
        }
    },
    reset(){
        this.player1Turn = true
        this.player2Turn = false
    }
}

function playing(field){
    if(Gameboard.gameOver) {return}
    if (turns.player1Turn && !(usedFields.fields[field])){
        Gameboard.fields[field] = Gameboard.player1
        turns.changeTurn()
    }
    else if(turns.player2Turn && !(usedFields.fields[field])){
        Gameboard.fields[field] = Gameboard.player2
        
        turns.changeTurn()
        
    }
   
  
   usedFields.changeStatus(field)
   displayGame()
   const winner = checkWinner();
   
   if(!(winner=== 'draw') && winner){
    displayInfo(`${checkWinner()} WON THE GAME!!!!`)
    Gameboard.reset()
    usedFields.reset()
    Gameboard.gameOver = true
   }
   else if(winner === 'draw'){
    displayInfo("It's a draw")
     Gameboard.gameOver = true
   }
   //find a solution when there is a draw
}

const usedFields = {
    fields: [false, false, false, false, false, false, false, false, false, false],
    changeStatus(index){
        if(!(this.fields[index])){
            this.fields[index] = true
        }
        else if(this.fields[index]){
            displayInfo(`That field is alredy occupied`)
        }
        else{
            throw Error('Error with a function usedFields');
            
        }
    },
    reset(){
        this.fields = [false, false, false, false, false, false, false, false, false, false]
    }
}

const winningCombos = [
  [1, 2, 3], 
  [4, 5, 6], 
  [7, 8, 9], 
  [1, 4, 7], 
  [2, 5, 8], 
  [3, 6, 9], 
  [1, 5, 9], 
  [3, 5, 7]  
];


function checkWinner(){
    for (const combo of winningCombos){
        const [a, b, c] = combo;
        let isACombo = (Gameboard.fields[a] === Gameboard.fields[b] &&
        Gameboard.fields[a] === Gameboard.fields[c] &&
        (Gameboard.fields[a] === Gameboard.player1 || Gameboard.fields[a] === Gameboard.player2))
    
    
    
    if(isACombo){
        
        return Gameboard.fields[a];
    }
}
    const allUsed = usedFields.fields.slice(1).every(status => status === true);
    if (allUsed && !isACombo) {return "draw"}
    return null

}

function displayGame(){
    
    for(let i = 1; i < 10; i++){
       let field = document.getElementById(`field${i}`)
       field.innerText = Gameboard.fields[i]
      if(Gameboard.fields[i] === 'X'){
         field.classList.add('x')
        }
        else if(Gameboard.fields[i] === 'O'){
            field.classList.add('o')
        }
    }
    
}
function resetClasses(){
    for(let i = 1; i < 10; i++){
         let field = document.getElementById(`field${i}`)
        field.classList.remove('x')
        field.classList.remove('o')
    }
}
displayGame();
function displayInfo(infoText){
    const infoEl = document.getElementById('info')
    infoEl.innerText = infoText
}


(function(){
    document.querySelectorAll('.field').forEach(field => {
        field.addEventListener('click', () =>{
              const index = parseInt(field.id.split('d')[1]);
            playing(index)
        })
    })
})()

function gameReset(){
    Gameboard.reset();
    usedFields.reset();
    displayGame()
    displayInfo('')
    Gameboard.gameOver = false
    resetClasses()
    turns.reset()
    

};


document.querySelector('#reset').addEventListener('click', () =>{
gameReset()
})

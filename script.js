const Gameboard = {
    player1 :'X',
    player2 :'O',
    fields: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    display() { return `${this.fields[1]} ${this.fields[2]} ${this.fields[3]}
${this.fields[4]} ${this.fields[5]} ${this.fields[6]}
${this.fields[7]} ${this.fields[8]} ${this.fields[9]}`
    },
    reset(){
        this.fields = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
}
console.log(Gameboard.display());

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
    }
}

function playing(field){
    if (turns.player1Turn && !(usedFields.fields[field])){
        Gameboard.fields[field] = Gameboard.player1
        turns.changeTurn()
    }
    else if(turns.player2Turn && !(usedFields.fields[field])){
        Gameboard.fields[field] = Gameboard.player2
        
        turns.changeTurn()
        
    }
   
   console.log(Gameboard.display())
   usedFields.changeStatus(field)
   const winner = checkWinner();
   if(winner){
    console.log(`${winner} IS A WINNER!!!!!` )
    Gameboard.reset()
   }
}

const usedFields = {
    fields: [false, false, false, false, false, false, false, false, false, false],
    changeStatus(index){
        if(!(this.fields[index])){
            this.fields[index] = true
        }
        else if(this.fields[index]){
            console.log(`Field ${index} can't be used twise`)
        }
        else{
            throw Error('Error with a function usedFields');
            
        }
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

    
    if(
        Gameboard.fields[a] === Gameboard.fields[b] &&
        Gameboard.fields[a] === Gameboard.fields[c] &&
        (Gameboard.fields[a] === Gameboard.player1 || Gameboard.fields[a] === Gameboard.player2)
    ){
        return Gameboard.fields[a];
    }
    }
    return null
}
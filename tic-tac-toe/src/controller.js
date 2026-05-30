export default class Controller {
    constructor(gameState, setGameState){
        this.gameState = gameState
        this.setGameState = setGameState;
    }

    //update squares when clicked
    handleClick(row, column, player){
        console.log(row,column);
        let newBoard = this.gameState.board;
        newBoard[row][column] = player
        this.setGameState({
            playerTurn : -this.gameState.playerTurn,
            board : newBoard,
        })
    }
}
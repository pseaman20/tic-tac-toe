export default class Controller {
    constructor(gameState, setGameState, player){
        console.log('new controller')
        this.gameState = gameState
        this.setGameState = setGameState;
        this.diag = 0;
        this.reverseDiag = 0;
        this.player = player;
        if(this.player == -1){
            this.letter = "X"
        } else {
            this.letter = "O"
        }
        this.wins = new Set([])
    }
    
    //update squares when clicked
    handleClick(row, column){
        if(this.player == this.gameState.playerTurn){
            console.log(row,column);
            this.gameState.board[row][column] = this.letter
            this.setGameState({
                playerTurn : -this.gameState.playerTurn,
                board : this.gameState.board,
            })
            if(this.getGameWon(this.gameState.board)){
                this.setGameState({...this.gameState,won : this.player})
            }
        }
    }

    getPlayer(){
        return this.player
    }
    //check for win
    getGameWon(board) {
        const winPatterns = [
            [[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]], // rows
            [[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]], // columns
            [[0,0], [1,1], [2,2]], [[2,0], [1,1], [0,2]]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [[ax,ay], [bx,by], [cx,cy]] = pattern;
            
            if (board[ax][ay] != ' ' && board[ax][ay] === board[bx][by] && board[ax][ay] === board[cx][cy]) {
                return this.player
            }
        }
        
        return null; // return null if there is no winner yet
}
}
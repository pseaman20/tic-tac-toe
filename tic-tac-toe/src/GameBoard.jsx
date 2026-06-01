export default function GameBoard({gameController}) {
    let r = 0;
    let c = 0;
    return(
        <>
        <div>
            <table id="board">
                <tbody>
                    {
                    gameController.gameState?.board?.map((row) =>{
                        c = 0;
                        const currR = r;
                        return <tr key={r++}>
                                {row.map((square) =>{
                                    const currC = c;
                                    return <td className={`square-${gameController.player == gameController.playerTurn? 'enabled' : 'disabled'}`} onClick={() =>gameController.handleClick(currR, currC)} id={""+r+c}key={""+(r)+(c++)}>{square}</td>
                                }
                                )}
                               </tr>
                    })
                    }
                </tbody>
            </table>
        </div>
        </>
    );
}
import { useContext } from "react";
import { GameContext } from "./game-context";
import { useEffect } from "react";


export default function GameBoard({gameState}) {
    let r = 0;
    let c = 0;
    return(
        <>
        <div>
            <table id="board">
                <tbody>
                    {
                    gameState.board?.map((row) =>{
                        c = 0;
                        return <tr key={r++}>
                                {row.map((square) =>
                                    <td className="square" id={""+r+c}key={""+(r)+(c++)}>{square}</td>
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
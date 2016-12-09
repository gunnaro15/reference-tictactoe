var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull = false;
        var board = [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.']
        ];
        var lastmove = '';

        function processEvent(event) {
            console.log(event.type);
            if(event.type==="GameJoined") {
                gamefull=true;
            }
            if(event.type==="MovePlaced") {
                board[event.move.r][event.move.c] = event.side;
                lastmove = event.side;
                console.log('cell(' + event.move.r + ', ' + event.move.c + ') = ' + event.side);
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
            printBoard();
        }

        processEvents(history);

        function gameFull() {
            return gamefull;
        }

        function cellTaken(move) {
            return board[move.r][move.c] !== '.';
        }

        function lastMove() {
            return lastmove;
        }

        function gameWon(side) {
            if((board[0][0] === side && board[1][1] === side && board[2][2] === side) ||
            (board[0][2] === side && board[1][1] === side && board[2][0] === side)) return true;

            for(var i = 0; i < 3;i++)
            {
                for(var j = 0; j < 3;j++)
                {
                    if((board[i][0] == side && board[i][1] == side && board[i][2] == side) ||
                    (board[0][j] == side && board[1][j] == side && board[2][j] == side)) return true;
                }
            }
            return false;
        }

        function printBoard() {
            for(var i=0; i<3; i++) {
                console.log(board[i][0] + ' ' + board[i][1] + ' ' + board[i][2]);
            }
        }

        return {
            gameWon: gameWon,
            lastMove: lastMove,
            cellTaken: cellTaken,
            gameFull: gameFull,
            processEvents: processEvents
        }
    };
};

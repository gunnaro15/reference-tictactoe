var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        const board_size = 3;
        var gamefull = false;
        var board = [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.']
        ];
        var lastmove = '';
        var movecount = 0;

        function processEvent(event) {
            //console.log(event.type);
            if(event.type==="GameJoined") {
                gamefull=true;
            }
            if(event.type==="MovePlaced") {
                board[event.move.r][event.move.c] = event.side;
                lastmove = event.side;
                movecount++;
                //console.log('cell(' + event.move.r + ', ' + event.move.c + ') = ' + event.side);
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
            //printBoard();
        }

        processEvents(history);

        function gameFull() {
            return gamefull;
        }

        function cellTaken(move) {
            return board[move.r][move.c] !== '.';
        }

        function sameLastMove(side) {
            return side===lastmove;
        }

        function gameWon(side) {
            if((board[0][0] === side && board[1][1] === side && board[2][2] === side) ||
            (board[0][2] === side && board[1][1] === side && board[2][0] === side)) return true;

            for(var i = 0; i < board_size; i++)
            {
                for(var j = 0; j < board_size; j++)
                {
                    if((board[i][0] == side && board[i][1] == side && board[i][2] == side) ||
                    (board[0][j] == side && board[1][j] == side && board[2][j] == side)) return true;
                }
            }
            return false;
        }

        function gameOver() {
            return movecount===(board_size*board_size);
        }

        function printBoard() {
            for(var i=0; i<board_size; i++) {
                console.log(board[i][0] + ' ' + board[i][1] + ' ' + board[i][2]);
            }
        }

        return {
            gameOver: gameOver,
            gameWon: gameWon,
            sameLastMove: sameLastMove,
            cellTaken: cellTaken,
            gameFull: gameFull,
            processEvents: processEvents
        }
    };
};

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
            if(event.type==="GameJoined"){
                gamefull=true;
            }
            if(event.type==="MovePlaced"){
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

        function gameFull(){
            return gamefull;
        }

        function cellTaken(move) {
            return board[move.r][move.c] !== '.';
        }

        function lastMove(){
            return lastmove;
        }

        function printBoard() {
            for(var i=0; i<3; i++) {
                console.log(board[i][0] + ' ' + board[i][1] + ' ' + board[i][2]);
            }
        }

        return {
            lastMove: lastMove,
            cellTaken: cellTaken,
            gameFull: gameFull,
            processEvents: processEvents
        }
    };
};

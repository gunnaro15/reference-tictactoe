var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull = false;
        var board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        function processEvent(event) {
            if(event.type==="GameJoined"){
                gamefull=true;
            }
            if(event.type==="MovePlaced"){
                if(!cellTaken(event.move)) {
                    board[event.move.r][event.move.c] = event.side;
                }
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        processEvents(history);

        function gameFull(){
            return gamefull;
        }

        function cellTaken(move) {
            return board[move.r][move.c] != '';
        }

        return {
            cellTaken: cellTaken,
            gameFull: gameFull,
            processEvents: processEvents
        }
    };
};

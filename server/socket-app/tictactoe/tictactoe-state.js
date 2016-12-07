var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull = false;
        var moves = [];

        function processEvent(event) {
            if(event.type==="GameJoined"){
                gamefull=true;
            }
            if(event.type==="MovePlaced"){
                moves.push(event.move);
            }
        }

        function legalMove(move) {
            for(var i=0; i<moves.length; i++) {
                if(moves[i]===move) return false;
            }
            return true;
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull(){
            return gamefull;
        }

        processEvents(history);

        return {
            legalMove: legalMove,
            gameFull: gameFull,
            processEvents: processEvents
        }
    };
};

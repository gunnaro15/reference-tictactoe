var should = require('should');
var _ = require('lodash');

var TictactoeState = require('./tictactoe-state')(inject({}));

var tictactoe = require('./tictactoe-handler')(inject({
    TictactoeState
}));

describe('CreateGame command', function() {

    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should emit GameCreated event', function () {

        given = [];
        when =
        {
            gameId: "123987",
            type: "CreateGame",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
        };
        then = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});

describe('JoinGame command', function () {

    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should emit GameJoined event', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];
        when =
        {
            gameId: "123987",
            type: "JoinGame",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:39",
        };
        then = [
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side:'O'
            }
        ];

    });

    it('should emit FullGameJoinAttempted event when game is full', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            }
        ];
        when =
        {
            gameId: "123987",
            type: "JoinGame",
            user: {
                userName: "Gulli"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
        };
        then = [
            {
                gameId: "123987",
                type: "FullGameJoinAttempted",
                user: {
                    userName: "Gulli"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            }
        ];
    });
});

describe('PlaceMove command', function () {

    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should emit MovePlaced event', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            }
        ];
        when =
        {
            gameId: "123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            side: 'X',
            move: { r: 0, c: 0 }
        };
        then = [
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'X',
                move: { r: 0, c: 0 }
            }
        ];

    })

    it('should emit IllegalMove event when cell is already occupied', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'X',
                move: { r: 0, c: 0 }
            },
        ];
        when =
        {
            gameId: "123987",
            type: "PlaceMove",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side: 'O',
            move: { r: 0, c: 0 }
        };
        then = [
            {
                gameId: "123987",
                type: "IllegalMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:29",
                side: 'O',
                move: { r: 0, c: 0 }
            }
        ];
    })

    it('should emit NotYourMove event if attempting to make move out of turn', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'X',
                move: { r: 0, c: 0 }
            },
        ];
        when =
        {
            gameId: "123987",
            type: "PlaceMove",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side: 'X',
            move: { r: 1, c: 0 }
        };
        then = [
            {
                gameId: "123987",
                type: "NotYourMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:29",
                side: 'X',
                move: { r: 1, c: 0 }
            }
        ];
    })

    it('should emit MovePlaced and GameWon events when player makes a winning move (horizontal)', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'X',
                move: { r: 0, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:29",
                side: 'O',
                move: { r: 2, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:29",
                side: 'X',
                move: { r: 0, c: 1 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:29",
                side: 'O',
                move: { r: 2, c: 1 }
            },
        ];
        when =
        {
            gameId: "123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:34:29",
            side: 'X',
            move: { r: 0, c: 2 }
        };
        then = [
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:34:29",
                side: 'X',
                move: { r: 0, c: 2 }
            },
            {
                gameId: "123987",
                type: "GameWon",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:34:29",
                side: 'X',
                move: { r: 0, c: 2 }
            }
        ];
    })

    it('should emit MovePlaced and GameWon events when player makes a winning move (vertical)', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'X',
                move: { r: 0, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:29",
                side: 'O',
                move: { r: 0, c: 2 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:29",
                side: 'X',
                move: { r: 1, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:29",
                side: 'O',
                move: { r: 1, c: 2 }
            },
        ];
        when =
        {
            gameId: "123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:34:29",
            side: 'X',
            move: { r: 2, c: 0 }
        };
        then = [
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:34:29",
                side: 'X',
                move: { r: 2, c: 0 }
            },
            {
                gameId: "123987",
                type: "GameWon",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:34:29",
                side: 'X',
                move: { r: 2, c: 0 }
            }
        ];
    })

    it('should emit MovePlaced and GameWon events when player makes a winning move (across left to right)', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'X',
                move: { r: 0, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:29",
                side: 'O',
                move: { r: 0, c: 2 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:29",
                side: 'X',
                move: { r: 1, c: 1 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:29",
                side: 'O',
                move: { r: 2, c: 0 }
            },
        ];
        when =
        {
            gameId: "123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:34:29",
            side: 'X',
            move: { r: 2, c: 2 }
        };
        then = [
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:34:29",
                side: 'X',
                move: { r: 2, c: 2 }
            },
            {
                gameId: "123987",
                type: "GameWon",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:34:29",
                side: 'X',
                move: { r: 2, c: 2 }
            }
        ];
    })

    it('should emit MovePlaced and GameWon events when player makes a winning move (across right to left)', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'X',
                move: { r: 0, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:29",
                side: 'O',
                move: { r: 0, c: 2 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:29",
                side: 'X',
                move: { r: 2, c: 2 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:29",
                side: 'O',
                move: { r: 1, c: 1 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:34:29",
                side: 'X',
                move: { r: 0, c: 1 }
            },
        ];
        when =
        {
            gameId: "123987",
            type: "PlaceMove",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:35:29",
            side: 'O',
            move: { r: 2, c: 0 }
        };
        then = [
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:35:29",
                side: 'O',
                move: { r: 2, c: 0 }
            },
            {
                gameId: "123987",
                type: "GameWon",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:35:29",
                side: 'O',
                move: { r: 2, c: 0 }
            }
        ];
    })

    it('should emit GameDraw event when game is over and neither has won', function () {

        given = [
            {
                gameId: "123987",
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            },
            {
                gameId: "123987",
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:39",
                side: 'O'
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side: 'X',
                move: { r: 0, c: 1 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:31:29",
                side: 'O',
                move: { r: 0, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:29",
                side: 'X',
                move: { r: 1, c: 1 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:29",
                side: 'O',
                move: { r: 0, c: 2 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:34:29",
                side: 'X',
                move: { r: 1, c: 2 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:35:29",
                side: 'O',
                move: { r: 1, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:29",
                side: 'X',
                move: { r: 2, c: 0 }
            },
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:29",
                side: 'O',
                move: { r: 2, c: 1 }
            },
        ];
        when =
        {
            gameId: "123987",
            type: "PlaceMove",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:38:29",
            side: 'X',
            move: { r: 2, c: 2 }
        };
        then = [
            {
                gameId: "123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:29",
                side: 'X',
                move: { r: 2, c: 2 }
            },
            {
                gameId: "123987",
                type: "Game",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:38:29",
                side: 'X',
                move: { r: 2, c: 2 }
            }
        ];
    })
});

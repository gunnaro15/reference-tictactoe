module.exports=function(injected){

    const io = require('socket.io-client');
    const RoutingContext = require('../../client/src/routing-context');
    const generateUUID = require('../../client/src/common/framework/uuid');

    var connectCount =0;

    function userAPI(){
        var waitingFor=[];
        var commandId=0;
        var Game;

        var routingContext = RoutingContext(inject({
            io,
            env:"test"
        }));

        connectCount++;
        const me = {
            expectUserAck:(cb)=>{
                waitingFor.push("expectUserAck");
                routingContext.socket.on('userAcknowledged', function(ackMessage){
                    expect(ackMessage.clientId).not.toBeUndefined();
                    waitingFor.pop();
                });
                return me;
            },
            sendChatMessage:(message)=>{
                var cmdId = generateUUID();
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"chatCommand", message });
                return me;
            },
            expectChatMessageReceived:(message)=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('chatMessageReceived', function(chatMessage){
                    expect(chatMessage.sender).not.toBeUndefined();
                    if(chatMessage.message===message){
                        waitingFor.pop();
                    }
                });
                return me;
            },
            cleanDatabase:()=>{
                var cmdId = commandId++;
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"cleanDatabase"});
                return me;

            },
            waitForCleanDatabase:()=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('databaseCleaned', function(chatMessage){
                    waitingFor.pop();
                });
                return me;
            },
            then:(whenDoneWaiting)=>{
                function waitLonger(){
                    if(waitingFor.length>0){
                        setTimeout(waitLonger, 10);
                        return;
                    } else {
                      whenDoneWaiting();
                    }
                }
                waitLonger();
                return me;
            },
            disconnect:function(){
                routingContext.socket.disconnect();
            },
            expectGameCreated:()=>{
                waitingFor.push("expectGameCreated");
                routingContext.eventRouter.on('GameCreated', function(game){
                    Game = game;
                    expect(game.gameId).not.toBeUndefined();
                    var index = waitingFor.indexOf("expectGameCreated");
                    if(index > -1) waitingFor.splice(index, 1);
                });
                return me;
            },
            createGame:()=>{
                var gId = generateUUID();
                var cmdId = generateUUID();
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"CreateGame", gameId:gId});
                return me;
            },
            expectGameJoined:()=>{
              waitingFor.push("expectGameJoined");
              routingContext.eventRouter.on('GameJoined', function(game){
                  Game = game;
                  expect(game.gameId).not.toBeUndefined();
                  var index = waitingFor.indexOf("expectGameJoined");
                  if(index > -1) waitingFor.splice(index, 1);
              });
              return me;
            },
            joinGame:(gId)=>{
                var cmdId = generateUUID();
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"JoinGame", gameId:gId});
                return me;
            },
            getGame:()=>{
                return Game;
            },
            expectMoveMade:()=>{
              waitingFor.push("expectMoveMade");
              routingContext.eventRouter.on('MovePlaced', function(move){
                  expect(move.gameId).not.toBeUndefined();
                  if(move.gameId === Game.gameId) {
                      var index = waitingFor.indexOf("expectMoveMade");
                      if(index > -1) waitingFor.splice(index, 1);
                  }
              });
              return me;
            },
            placeMove:(row, column)=>{
                var cmdId = generateUUID();
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"PlaceMove", gameId: Game.gameId, move: { r: row, c: column }, side: Game.side});
                return me;
            },
            expectGameWon:()=>{
              waitingFor.push("expectGameWon");
              routingContext.eventRouter.on('GameWon', function(won){
                  expect(won.gameId).not.toBeUndefined();
                  if(won.gameId === Game.gameId) {
                      var index = waitingFor.indexOf("expectGameWon");
                      if(index > -1) waitingFor.splice(index, 1);
                  }
              });
              return me;
            },
        };
        return me;

    }

    return userAPI;
};

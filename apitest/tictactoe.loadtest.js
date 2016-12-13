const io = require('socket.io-client');
const RoutingContext = require('../client/src/routing-context');
var UserAPI = require('./fluentapi/user-api');
var TestAPI = require('./fluentapi/test-api');

const userAPI = UserAPI(inject({
    io,
    RoutingContext
}));

const testAPI = TestAPI(inject({
    io,
    RoutingContext
}));

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('TicTacToe load test', function(){

    beforeEach(function(done){
        var testapi = testAPI();
        testapi.waitForCleanDatabase().cleanDatabase().then(()=>{
            testapi.disconnect();
            done();
        });
    });

    const count = 10;
    const timelimit = 2000;

    it('should play ' + count + '  games within '+ timelimit +'ms', function(done){

        var userA, userB;
        var startMillis = new Date().getTime();

        for(var i=0; i<count; i++) {

            userA = userAPI();
            userB = userAPI();

            userA.expectGameCreated().createGame().then(()=> {
                    userB.expectGameJoined().joinGame(userA.getGame().gameId).then(function () {
                        userA.expectMoveMade().placeMove(0, 0).then(()=> {
                            userA.expectMoveMade();
                            userB.expectMoveMade().placeMove(1, 0).then(()=> {
                                userB.expectMoveMade(); // By other user
                                userA.expectMoveMade().placeMove(1, 1).then(()=> {
                                    userA.expectMoveMade(); // By other user
                                    userB.expectMoveMade().placeMove(0, 2).then(()=> {
                                        userB.expectMoveMade(); // By other user
                                        userA.expectMoveMade().placeMove(2, 2)
                                            .expectGameWon().then(function(){
                                                user.disconnect();
                                                _.each(users, function(usr){
                                                    usr.disconnect();
                                                });

                                                var endMillis = new Date().getTime();
                                                var duration = endMillis - startMillis;
                                                if(duration > timelimit){
                                                    done.fail(duration + " exceeds limit " + timelimit);
                                                } else {
                                                    done();

                                                }
                                            });
                                    })
                                })
                            });
                        })
                    })
                }
            );
            userA.disconnect();
            userB.disconnect();
        };
    });
});

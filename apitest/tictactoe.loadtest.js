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

/*describe('TicTacToe load test', function(){

    beforeEach(function(done){
        var testapi = testAPI();
        testapi.waitForCleanDatabase().cleanDatabase().then(()=>{
            testapi.disconnect();
            done();
        });
    });

    const count = 10;
    const timelimit = 2000;

    it('should play ' + count + ' games within '+ timelimit +'ms', function(done){

        var userA, userB;
        var startMillis = new Date().getTime();

        for(var i=0; i<count; i++) {

        }

    });
});*/

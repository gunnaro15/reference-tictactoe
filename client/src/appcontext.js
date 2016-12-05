import inject from './common/framework/inject';

import generateUUID from 'common/framework/uuid';

import AppModule from 'App';
import ConnectedClientsModule from 'status/ConnectedClients';
import ConnectedUsersModule from 'status/ConnectedUsers';
import ChatModule from 'chat/Chat';
import RoutingContext from './routing-context';

function appContext(injected){
    const io = injected('io');
    const env = injected('env');

    const {eventRouter, commandRouter, queryRouter, socket} = RoutingContext(inject({io, env}));

    const ConnectedClients = ConnectedClientsModule(inject({
        socket
    }));
    const ConnectedUsers = ConnectedUsersModule(inject({
        socket
    }));
    const Chat = ChatModule(inject({
        commandPort:commandRouter,
        eventRouter,
        queryRouter,
        generateUUID: generateUUID
    }));

    const App = AppModule(inject({
        io,
        ConnectedClients,
        ConnectedUsers,
        Chat,
        socket,
        eventRouter
    }));

    var exports = {
        App
    };

    return exports;

}

export default appContext;
#test changes

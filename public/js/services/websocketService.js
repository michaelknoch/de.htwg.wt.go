'use strict';

angular.module('goApp')

.service('WebsocketService', function($http) {
    var wsproto = 'ws://';
    if (window.location.protocol === 'https:') {
        wsproto = 'wss://';
    }
    var socketUrl = wsproto + location.host + '/connectWebSocket';

    return {
        connect: function(onMessageFn) {
            if (!onMessageFn) {
                throw new Error('no onMessageFn given');
            } else if (typeof onMessageFn !== "function") {
                throw new Error('onMessageFn needs to be a function');
            }
            var ws = new WebSocket(socketUrl);
            ws.onmessage = onMessageFn;
            return ws;
        }
    };
});

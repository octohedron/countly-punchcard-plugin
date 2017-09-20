### Example request to /i
```Bash
  curl --request GET \
       --url "http://192.168.1.47/i?device_id=1234567890&app_key=6ccff9cb215973cbe39444259a76b3753bc0005c&dow=0&hour=10"
```

### Example ob caught on /i

```JavaScript
{ params:
   { href: '/i?device_id=1234567890&app_key=6ccff9cb215973cbe39444259a76b3753bc0005c&dow=0&hour=10',
     qstring:
      { device_id: '1234567890',
        app_key: '6ccff9cb215973cbe39444259a76b3753bc0005c',
        dow: '0',
        hour: '10' },
     res:
      ServerResponse {
        domain: null,
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: true,
        upgrading: false,
        chunkedEncoding: false,
        shouldKeepAlive: false,
        useChunkedEncodingByDefault: false,
        sendDate: true,
        _removedHeader: {},
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: true,
        _headerSent: true,
        socket: null,
        connection: null,
        _header: 'HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\nX-Frame-Options: deny\r\nX-XSS-Protection: 1; mode=block\r\nDate: Tue, 19 Sep 2017 11:47:27 GMT\r\nConnection: close\r\n\r\n',
        _headers: null,
        _headerNames: {},
        _onPendingData: [Function: updateOutgoingData],
        statusMessage: 'OK',
        statusCode: 200 },
     req:
      IncomingMessage {
        _readableState: [Object],
        readable: false,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 0,
        httpVersion: '1.0',
        complete: true,
        headers: [Object],
        rawHeaders: [Object],
        trailers: {},
        rawTrailers: [],
        upgrade: false,
        url: '/i?device_id=1234567890&app_key=6ccff9cb215973cbe39444259a76b3753bc0005c&dow=0&hour=10',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Object],
        _consuming: true,
        _dumped: true,
        read: [Function] },
     apiPath: '/i',
     fullPath: '/i',
     ip_address: '192.168.1.43',
     user: { country: 'Unknown', city: 'Unknown' },
     app_user_id: '5b35e806b49f0f817a1a173796050a9624812cfa',
     promises: [ [Object] ],
     app_id: 59bfe5996d72d337723be1df,
     app_cc: 'DE',
     app_name: 'octohedron',
     appTimezone: 'Europe/Berlin',
     app:
      { _id: 59bfe5996d72d337723be1df,
        name: 'octohedron',
        country: 'DE',
        type: 'mobile',
        category: '6',
        timezone: 'Europe/Berlin',
        created_at: 1505748377,
        edited_at: 1505748377,
        owner: '59bfba3137853a114cc9a0ec',
        key: '6ccff9cb215973cbe39444259a76b3753bc0005c' },
     time:
      { now: moment.parseZone("2017-09-19T13:47:27.316+02:00"),
        nowUTC: moment.utc("2017-09-19T11:47:27.316+00:00"),
        nowWithoutTimestamp: moment.parseZone("2017-09-19T13:47:27.316+02:00"),
        timestamp: 1505821647,
        mstimestamp: 1505821647316,
        yearly: '2017',
        monthly: '2017.9',
        daily: '2017.9.19',
        hourly: '2017.9.19.13',
        weekly: 38,
        month: '9',
        day: '19',
        hour: '13' },
     app_user:
      { _id: '5b35e806b49f0f817a1a173796050a9624812cfa',
        uid: '1',
        lac: 1505821569728,
        did: '1234567890',
        fac: 1505771235384 } },
  app:
   { _id: 59bfe5996d72d337723be1df,
     name: 'octohedron',
     country: 'DE',
     type: 'mobile',
     category: '6',
     timezone: 'Europe/Berlin',
     created_at: 1505748377,
     edited_at: 1505748377,
     owner: '59bfba3137853a114cc9a0ec',
     key: '6ccff9cb215973cbe39444259a76b3753bc0005c' } }
```

### Example request to /o
```Bash
  curl --request GET \
       --url "http://192.168.1.47/o?app_key=..&api_key=...&app_id=...&punchcard=true"
```

### Example ob caught on /o 
```JavaScript
{ params:
   { href: '/o?device_id=1234567890&app_key=6ccff9cb215973cbe39444259a76b3753bc0005c&dow=0&hour=10&api_key=16af54af81875afe721e15b3815731b1&app_id=59bfe5996d72d337723be1df',
     qstring:
      { device_id: '1234567890',
        app_key: '6ccff9cb215973cbe39444259a76b3753bc0005c',
        dow: '0',
        hour: '10',
        api_key: '16af54af81875afe721e15b3815731b1',
        app_id: '59bfe5996d72d337723be1df' },
     res:
      ServerResponse {
        domain: null,
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        upgrading: false,
        chunkedEncoding: false,
        shouldKeepAlive: false,
        useChunkedEncodingByDefault: false,
        sendDate: true,
        _removedHeader: {},
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Object],
        connection: [Object],
        _header: null,
        _headers: null,
        _headerNames: {},
        _onPendingData: [Function: updateOutgoingData] },
     req:
      IncomingMessage {
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 0,
        httpVersion: '1.0',
        complete: true,
        headers: [Object],
        rawHeaders: [Object],
        trailers: {},
        rawTrailers: [],
        upgrade: false,
        url: '/o?device_id=1234567890&app_key=6ccff9cb215973cbe39444259a76b3753bc0005c&dow=0&hour=10&api_key=16af54af81875afe721e15b3815731b1&app_id=59bfe5996d72d337723be1df',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Object],
        _consuming: false,
        _dumped: false },
     apiPath: '/o',
     fullPath: '/o' },
  validateUserForDataReadAPI: [Function: validateUserForDataReadAPI],
  validateUserForMgmtReadAPI: [Function: validateUserForMgmtReadAPI],
  validateUserForDataWriteAPI: [Function: validateUserForDataWriteAPI],
  validateUserForGlobalAdmin: [Function: validateUserForGlobalAdmin] }
```




[
  {
    "_id": "59c106978593a810477cfe53",
    "type": "mobile",
    "dow": "0",
    "hour": "10"
  },
  {
    "_id": "59c1069ce5df6c1048cc52c4",
    "type": "mobile",
    "dow": "0",
    "hour": "10"
  },
  {
    "_id": "59c1123e9aa30c11b8a552e7",
    "type": "mobile",
    "dow": "0",
    "hour": "10"
  }
]

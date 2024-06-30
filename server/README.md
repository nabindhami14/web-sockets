![](https://socket.io/images/bidirectional-communication-socket-dark.png)

![](https://socket.io/images/broadcasting2-dark.png)

```js
io.on("connection", (socket) => {
  socket.broadcast.emit("hello", "world");
});
```

```js
io.on("connection", (socket) => {
  socket.emit("hello", 1, "2", { 3: "4", 5: Buffer.from([6]) });
});

// Acknowledgement
io.on("connection", async (socket) => {
  const response = await socket.emitWithAck("hello", "world");
});

// Broadcasting
io.emit("hello"); // To all connected clients
io.on("connection", (socket) => {
  socket.broadcast.emit("hello"); // Except the sender
});
```

![](https://socket.io/images/rooms-dark.png)

```js
io.on("connection", (socket) => {
  socket.join("some room");
});

io.to("some room").emit("some event");
io.except("some room").emit("some event");
io.to("room1").to("room2").to("room3").emit("some event");
io.on("connection", (socket) => {
  socket.to("some room").emit("some event");
});
```

```js
socket.emit("hello", "world");
socket.emit("hello", 1, "2", { 3: "4", 5: Uint8Array.from([6]) });

io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg); // 'world'
  });
  socket.on("hello", (arg1, arg2, arg3) => {
    console.log(arg1); // 1
    console.log(arg2); // '2'
    console.log(arg3); // { 3: '4', 5: <Buffer 06> }
  });
});
```

> **_CLIENT TO SERVER_**

```js
io.on("connection", (socket) => {
  socket.emit("hello", "world");
  socket.emit("hello", 1, "2", { 3: "4", 5: Buffer.from([6]) });
});

socket.on("hello", (arg) => {
  console.log(arg); // 'world'
});
socket.on("hello", (arg1, arg2, arg3) => {
  console.log(arg1); // 1
  console.log(arg2); // '2'
  console.log(arg3); // { 3: '4', 5: ArrayBuffer (1) [ 6 ] }
});
```

> **_SERVER TO CLIENT_**

> [CHEATSHEET](https://socket.io/docs/v4/emit-cheatsheet/)

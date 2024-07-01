const express = require("express");
const NodeCache = require("node-cache");

const app = express();
const cache = new NodeCache();

app.use(express.json());

let users = [
  { id: 1, email: "john.doe@example.com", name: "John Doe" },
  { id: 2, email: "jane.smith@example.com", name: "Jane Smith" },
  { id: 3, email: "alice.jones@example.com", name: "Alice Jones" },
  { id: 4, email: "bob.miller@example.com", name: "Bob Miller" },
  { id: 5, email: "sara.white@example.com", name: "Sara White" },
  { id: 6, email: "mike.jenkins@example.com", name: "Mike Jenkins" },
  { id: 7, email: "emily.clark@example.com", name: "Emily Clark" },
  { id: 8, email: "david.ross@example.com", name: "David Ross" },
  { id: 9, email: "lisa.hall@example.com", name: "Lisa Hall" },
  { id: 10, email: "alex.garcia@example.com", name: "Alex Garcia" },
];

// register an endpoint
app.get("/api/v1/users", async (req, res) => {
  const data = cache.get("users");
  if (data) {
    return res.json({ users: data });
  }

  await new Promise((resolve) => setTimeout(resolve, 250));

  cache.set("users", users);
  return res.json({ users });
});

// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

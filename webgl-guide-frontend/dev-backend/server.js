const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()
const fs = require("fs")

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get("/lecture/:id", (req, res) => {
  const markdownPath = `${__dirname}/lectures/lec${req.params.id}.md`
  if (fs.existsSync(markdownPath)) {
    res.status(200).send(fs.readFileSync(markdownPath, "utf-8"))
  } else {
    res.status(404).send()
  }
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Use default router
server.use(router)

let port = 8082
let host = "0.0.0.0"
let args = process.argv.slice(2)
while (args.length) {
  switch (args[0]) {
    case "--port":
      port = parseInt(args[1])
      break
    case "--host":
      host = args[1]
      break
  }
  args = args.slice(2)
}
console.log(`JSON server starting on port ${port} and host ${host}...`)

while (true) {
  try {
    server.listen(port, host)
    break
  } catch (e) {
    port++
  }
}

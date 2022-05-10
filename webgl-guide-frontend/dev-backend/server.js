const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()
const fs = require("fs")

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

router.render = (req, res) => {
  if (req.path.includes("/lectures/")) {
    const markdownPath = `${__dirname}/lectures/lec${req.path.split("/")[2]}.md`
    console.log(markdownPath)
    if (fs.existsSync(markdownPath)) {
      res.jsonp({
        ...res.locals.data,
        content: fs.readFileSync(markdownPath, "utf-8"),
      })
    } else {
      res.status(404).send()
    }
  } else {
    res.jsonp(res.locals.data)
  }
}

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

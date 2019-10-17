var express = require("express");
var bodyParser = require("body-parser");

var ecosRoute = require("./routes/ecos_system");
var create10m = require("./routes/create10M");
var test_ecos = require("./routes/zone");
var test_streaming = require("./routes/test_streaming");
var test_offset = require("./routes/test_offset");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("this is another hello from server!");
});

app.use(ecosRoute);
app.use(create10m);
app.use(test_ecos.ecosTotal);
app.use(test_streaming);
app.use(test_offset);

// use totalpage from calculate as test_ecos to call app.get to render out how many page it has
test_ecos.totalCount(data => {
  for (let i = 0; i < data; i++) {
    app.get(`/api/test_ecos_${i}`, test_ecos.ecos);
  }
});

app.listen(5000, () => {
  console.log("Backend listening on port 5000");
});

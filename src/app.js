let express = require("express");
let app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.use(function (req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Page introuvable !");
});

app.listen(80);

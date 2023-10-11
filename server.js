let express = require("express")
let app = express()

app.use(express.static(__dirname+'/dist/novi'));

app.get("/*", (req, res) => {
    res.sendFile(__dirname+'idst/novi/index.html')
});

app.listen(process.env.PORT || 8080);

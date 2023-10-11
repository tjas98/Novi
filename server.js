let express = require("express")
let app = express()

app.use(express.static(__dirname+'/dist/novi'));

app.get("/*", (req, res) => {
    res.sendFile(__dirname+'idst/novi/index.html')
});

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.listen(process.env.PORT || 8080);

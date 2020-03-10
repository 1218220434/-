
const app = require("express")();
const body = require("body-parser")

app.all("*", (req, res, next) => {
    // 设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    // 跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  // 让options尝试请求快速结束
    else
        next();
});


app.use(body.json());

app.get("/", (req, res) => {
    res.send({
        status: 200,
        message: '访问主页'
    });
});


app.post("/login", (req, res) => {
    let { username, password } = req.body;
    if (username === 'admin' && password === '123') {
        res.send({
            message: "登陆成功"
        })
    } else {
        res.send({
            message: "登陆失败"
        })
    }
});



app.listen(8081, "127.0.0.1");

console.log("server running at http://127.0.0.1:8081");
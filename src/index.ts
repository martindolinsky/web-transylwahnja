import * as express from 'express';
import * as fs from "fs";
import * as menu from "./menu.json";
import * as data from "./data.json";

const app = express();
const router = express.Router();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(router);

app.use(function (_req, res) {
    res.status(404).render("404");
});

router.get("/", function (req, res) {
    res.render("index", {page: "home", menu, data});
});

router.get("/:page", function (req, res) {
    if (fs.existsSync("views/pages/" + req.params.page + ".ejs")) {
        res.render("index", {page: req.params.page, menu: menu});
    } else {
        res.status(404).render("404", {menu: menu});
    }
});

app.listen(8080, () => console.log('listening on port 8080'));

const { PythonShell } = require("python-shell");
const { stringToArray } = require("./stringToArray");
var data;
var pythonShellFunc = new Promise((resolve, reject) => {
  let options = {
    args: ["/home/swornim/NFT_FINAL_PROJECT/image/test.png"],
    scriptPath: "/home/swornim/NFT_FINAL_PROJECT/middleware",
  };

  PythonShell.run("phash.py", options, (err, res) => {
    var data = stringToArray(res);
    resolve(data);
  });
});

module.exports = { pythonShellFunc, data };

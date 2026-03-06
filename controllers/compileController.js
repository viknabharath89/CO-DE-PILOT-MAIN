const {
runPython,
runC,
runCPP,
runJava,
runGo,
runRuby,
runRust,
runKotlin,
runPHP,
runJS
} = require("../services/compileService");

exports.compileCode = async(req,res)=>{

const {language,code,input} = req.body;

let output="";

try{

switch(language){

case "javascript":
output = await runJS(code,input);
break;

case "python":
output = await runPython(code,input);
break;

case "c":
output = await runC(code,input);
break;

case "cpp":
output = await runCPP(code,input);
break;

case "java":
output = await runJava(code,input);
break;

case "php":
output = await runPHP(code,input);
break;

case "ruby":
output = await runRuby(code,input);
break;

case "go":
output = await runGo(code,input);
break;

case "rust":
output = await runRust(code,input);
break;

case "kotlin":
output = await runKotlin(code,input);
break;

default:
output="Language not supported";

}

res.json({output});

}catch(err){

res.json({output:err.toString()});

}

};
let editor;

require.config({
paths:{
'vs':'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'
}
});

require(['vs/editor/editor.main'],function(){

editor = monaco.editor.create(document.getElementById('editor'),{

value:'console.log("Hello World");',

language:'javascript',

theme:'vs-dark',

automaticLayout:true

});

});

function changeLanguage(){

const lang = document.getElementById("language").value;
const file = document.getElementById("filename");

const templates={

javascript:{
name:"main.js",
code:`console.log("Hello World");`
},

python:{
name:"main.py",
code:`print("Hello World")`
},

c:{
name:"main.c",
code:`#include <stdio.h>

int main(){
printf("Hello World");
return 0;
}`
},

cpp:{
name:"main.cpp",
code:`#include <iostream>
using namespace std;

int main(){
cout<<"Hello World";
}`
},

java:{
name:"Main.java",
code:`public class Main{
public static void main(String[] args){
System.out.println("Hello World");
}
}`
},

php:{
name:"main.php",
code:`<?php
echo "Hello World";
?>`
},

ruby:{
name:"main.rb",
code:`puts "Hello World"`
},

go:{
name:"main.go",
code:`package main
import "fmt"

func main(){
fmt.Println("Hello World")
}`
},

rust:{
name:"main.rs",
code:`fn main(){
println!("Hello World");
}`
},

kotlin:{
name:"Main.kt",
code:`fun main(){
println("Hello World")
}`
}

};

file.innerText = templates[lang].name;

editor.setValue(templates[lang].code);

monaco.editor.setModelLanguage(editor.getModel(),lang);

}

async function runCode(){

const language = document.getElementById("language").value;

const code = editor.getValue();

const input = document.getElementById("input").value;

document.getElementById("output").innerText="Running...";

const res = await fetch("/api/compile",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
language,
code,
input
})

});

const data = await res.json();

document.getElementById("output").innerText = data.output;

}
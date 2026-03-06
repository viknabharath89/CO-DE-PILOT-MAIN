let editor;

/* ------------------------------
   MONACO EDITOR
-------------------------------- */

require.config({
  paths: {
    'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'
  }
});

require(['vs/editor/editor.main'], function () {

  editor = monaco.editor.create(document.getElementById('editor'), {
    value: 'console.log("Hello World");',
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  });

});


/* ------------------------------
   LANGUAGE CHANGE
-------------------------------- */

function changeLanguage() {

  const lang = document.getElementById("language").value;
  const file = document.getElementById("filename");

  const templates = {

    javascript: {
      name: "main.js",
      code: `console.log("Hello World");`
    },

    python: {
      name: "main.py",
      code: `print("Hello World")`
    },

    c: {
      name: "main.c",
      code: `#include <stdio.h>

int main(){
printf("Hello World");
return 0;
}`
    },

    cpp: {
      name: "main.cpp",
      code: `#include <iostream>
using namespace std;

int main(){
cout<<"Hello World";
}`
    },

    java: {
      name: "Main.java",
      code: `public class Main{
public static void main(String[] args){
System.out.println("Hello World");
}
}`
    },

    php: {
      name: "main.php",
      code: `<?php
echo "Hello World";
?>`
    },

    ruby: {
      name: "main.rb",
      code: `puts "Hello World"`
    },

    go: {
      name: "main.go",
      code: `package main
import "fmt"

func main(){
fmt.Println("Hello World")
}`
    },

    rust: {
      name: "main.rs",
      code: `fn main(){
println!("Hello World");
}`
    },

    kotlin: {
      name: "Main.kt",
      code: `fun main(){
println("Hello World")
}`
    }

  };

  file.innerText = templates[lang].name;
  editor.setValue(templates[lang].code);
  monaco.editor.setModelLanguage(editor.getModel(), lang);

}


/* ------------------------------
   RUN CODE
-------------------------------- */

async function runCode() {

  const language = document.getElementById("language").value;
  const code = editor.getValue();
  const input = document.getElementById("input").value;

  const outputBox = document.getElementById("output");

  outputBox.innerText = "Running...";

  try {

    const res = await fetch("/api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language,
        code,
        input
      })
    });

    const data = await res.json();

    outputBox.innerText = data.output || "No output";

  } catch (error) {

    outputBox.innerText = "Server Error ⚠️";

  }

}


/* ------------------------------
   OPEN EXPLAIN PAGE
-------------------------------- */

function openExplain(){

  // get code from editor
  const code = editor.getValue();

  // store code in localStorage
  localStorage.setItem("explainCode", code);

  // slide animation
  document.body.classList.add("slide-out");

  // redirect after animation
  setTimeout(() => {
    window.location.href = "explain.html";
  }, 500);

}


/* ------------------------------
   SLIDE PAGE TRANSITION
-------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll(".page-link");

  links.forEach(link => {

    link.addEventListener("click", function (e) {

      e.preventDefault();

      const url = this.href;

      document.body.classList.add("slide-out");

      setTimeout(() => {
        window.location.href = url;
      }, 500);

    });

  });

});
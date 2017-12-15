var app = require('electron').remote
var dialog = app.dialog
var fs = require('fs')

document.getElementById('btn').addEventListener('click', saveFile);

function saveFile(){
    dialog.showSaveDialog((filename)=>{
        if (filename === undefined){
            alert("You didn't enter in a file name.");
        }

        var content = itemText.value 
        
        fs.writeFile(filename, content, (err)=>{
            if (err) console.log(err)
            alert("The file has been saved.")
        });
    });


}
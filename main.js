
document.addEventListener("DOMContentLoaded", function(){
    let save = document.getElementById("save");
    let deleteAll = document.getElementById("deleteAll");
    let copyAll = document.getElementById("copyAll");
    let textArea = document.getElementById("text");
    let bold = document.getElementById("bold")
    let plain = document.getElementById("plain")
    let emphasized = document.getElementById("emphasized")
    let unemphasized = document.getElementById("unemphasized")
    let underline = document.getElementById("underline")
    let normal = document.getElementById("normal")
    fileArray = [];
    if (localStorage.getItem("fileArray")){
        fileArray = JSON.parse(localStorage.getItem("fileArray"))
        displayFile(fileArray)
    }
    
    
    function saveFile(fileName){
        if (localStorage.getItem(fileName)){
            alert("File already exists. Change the file name")
            return 0
        }
        else if(fileName === null){
            alert("Operation Terminated...")
        }
        else if(fileName == ' '){
            alert("Enter Valid Name")
        }
        else{
            console.log(fileArray);
            removeListItem(fileArray)
            return 1
        }
    }


    function removeStyle() {
        textArea.style.fontWeight = 'none';
        textArea.style.textDecoration = 'none';
        textArea.style.fontStyle = 'none';
    }

    // function getSelectedText() {
    //     let text = '';
    //     if (window.getSelection) {
    //         text += window.getSelection().toString();
    //     }
    //     else{
    //         alert("Error in Selecting Text")
    //     }
    //     return text;
    // }

    bold.addEventListener("click", function(){
        textArea.style.fontWeight = 'bold';
    });
    underline.addEventListener("click", function(){
        textArea.style.textDecoration = 'underline';
    });
    emphasized.addEventListener("click", function(){
        textArea.style.fontStyle = 'italic';
    });
    plain.addEventListener("click", function(){
        textArea.style.fontWeight = '';
    });
    normal.addEventListener("click", function(){
        textArea.style.textDecoration = '';
    });
    unemphasized.addEventListener("click", function(){
        textArea.style.fontStyle = '';
    });

    $(document).on('click', '#files li', function(e){
        // console.log("file clicked");
        key = $(this).attr('id')
        keyFile = localStorage.getItem(key)
        console.log(key);
        jsonKeyFile = JSON.parse(keyFile)
        $("#text").val(jsonKeyFile);
        // removeStyle();
    })

    // $("#files li p span").on('click', function(e){
    //     let idx = Number($(this).attr('id')) - 1;
    //     let arr = localStorage.getItem("fileArray");
    //     parsedArr = JSON.parse(arr);

    //     if(parsedArr.len > 0){
    //         let idxVal = parsedArr[idx];
    //         localStorage.removeItem(idxVal)
    //         removeListItem(parsedArr)
    //         parsedArr.splice(idx, 1)
    //         // displayFile(parsedArr)
    //         arr = JSON.stringify(parsedArr);
    //         localStorage.setItem("fileArray", arr);

    //     }
    //     else{
    //         localStorage.clear()
    //     }




    // })
    
    function displayFile(fileArray){
        
        idx = 0
        for(let ele of fileArray) {
            ol = document.getElementById("files");

            li = document.createElement("li");
            li.setAttribute("id", `${ele}`);
            li.setAttribute("class", "list");

            // span = document.createElement("span")
            // span.setAttribute("id", `${idx}`);
            // span.appendChild(document.createTextNode("❌"))

            p = document.createElement("p");
            // p.setAttribute("id", `${ele}`);
            p.appendChild(document.createTextNode(ele));
            // p.appendChild(span);


            li.appendChild(p);
            ol.appendChild(li);
            
            idx += 1
         
        }
    }

    function removeListItem(fileArray){
        for (let ele of fileArray){
            list = document.getElementById(ele);
            // console.log(list);
            list.remove()
        }
    }

    
    save.addEventListener("click", function(){
        let fileName = prompt("Enter File name to be saved")
        if (saveFile(fileName)){
            // console.log(fileArray);
            
            fileArray.push(fileName)
            jsonFileArray = JSON.stringify(fileArray);
            localStorage.setItem("fileArray", jsonFileArray)
            let textContent = document.querySelector("#text").value;
            let jsonTextContent = JSON.stringify(textContent);
            
            localStorage.setItem(fileName, jsonTextContent);
            displayFile(fileArray)
            // console.log(fileArray);
        }   
    })

    deleteAll.addEventListener("click", function(){
        {
            console.log("deleteall");
            textArea.value = ''
            removeListItem(fileArray)
            localStorage.clear();
            // localStorage.removeItem("fileArray")
            fileArray = []
            // console.log(fileArray);
        }
    })


    copyAll.addEventListener("click", function(){
        let textContent = document.querySelector("#text").value;
        navigator.clipboard.writeText(textContent).then(function(){
            alert("Text copied to clipboard");
        });
    })
    
    
})
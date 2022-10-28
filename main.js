
document.addEventListener("DOMContentLoaded", function () {
  let save = document.getElementById("save");
  let deleteAll = document.getElementById("deleteAll");
  let copyAll = document.getElementById("copyAll");
  let textArea = document.getElementById("text");
  let content = document.querySelector("#content");
  let textContent = document.querySelector(".textContent");
  let toolStyle = document.querySelector(".toolStyle");
  let fileList = document.querySelector(".fileList");
  let bold = document.getElementById("bold")
  let plain = document.getElementById("plain")
  let emphasized = document.getElementById("emphasized")
  let unemphasized = document.getElementById("unemphasized")
  let underline = document.getElementById("underline")
  let normal = document.getElementById("normal")
  let dark_mode = document.getElementById("dark_Mode")
  let light_mode = document.getElementById("light_Mode")
  fileArray = [];
  if (localStorage.getItem("fileArray")) {
      fileArray = JSON.parse(localStorage.getItem("fileArray"))
      displayFile(fileArray)
  }


  function saveFile(fileName) {
      if (localStorage.getItem(fileName)) {
          Toastify({

              text: "File already exists. Please change the file name.",
              gravity: "top",
              position: "center",
              duration: 3000,
              style:
              {
                  background: "linear-gradient(to right, #00b09b, #96c93d)"
              }

          }).showToast();
          return 0
      }
      else if (fileName === null) {

          Toastify({

              text: "Operation Terminated...",
              gravity: "top",
              position: "center",
              duration: 2000,
              style:
              {
                  background: "linear-gradient(to right, #FF0000, #FF8C00)"

              }

          }).showToast();

      }
      else if (fileName == '') {

          Toastify({

              text: "Enter  valid name",
              gravity: "top",
              position: "center",
              duration: 2000,
              style:
              {
                  //background:"linear-gradient(to right, #00b09b, #96c93d)"      
                  background: "-webkit-linear-gradient(315deg, #73a5ff, #5477f5)"
              }

          }).showToast();
      }
      else {
          console.log(fileArray);
          Toastify({

              text: "File saved Successfully.",
              gravity: "top",
              position: "center",
              duration: 2000,
              style:
              {

                  background: "-webkit-linear-gradient(315deg, #41cb1b, #9ACD32)"
              }

          }).showToast();

          removeListItem(fileArray);
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

  bold.addEventListener("click", function () {
      textArea.style.fontWeight = 'bold';
  });
  underline.addEventListener("click", function () {
      textArea.style.textDecoration = 'underline';
  });
  emphasized.addEventListener("click", function () {
      textArea.style.fontStyle = 'italic';
  });
  plain.addEventListener("click", function () {
      textArea.style.fontWeight = '';
  });
  normal.addEventListener("click", function () {
      textArea.style.textDecoration = '';
  });
  unemphasized.addEventListener("click", function () {
      textArea.style.fontStyle = '';
  });
  dark_mode.addEventListener("click", function () {
      // lower left div
      textArea.style.background = '#3b3b3b';
      textArea.style.color = 'white';

      // left hand div 
      fileList.style.background = '#1f2324';
      fileList.style.color = 'white';

      content.style.background = '#373c3f';
      content.style.color = 'white';

      textContent.style.background = '#1f2324';
      textContent.style.color = 'white';

      // upper right div
      toolStyle.style.background = '#313538';

      dark_mode.style.background = '#fae588'
      light_mode.style.background = 'white'
  })
  light_mode.addEventListener("click", function () {
      textArea.style.background = 'white';
      textArea.style.color = 'black';
      fileList.style.background = 'white';
      fileList.style.color = 'black';
      content.style.background = 'radial-gradient(white, rgb(153, 149, 140))';
      content.style.color = 'black';
      textContent.style.background = 'white';
      textContent.style.color = 'black';
      toolStyle.style.background = '#c3d0de';
      fileList.style.border = '1px solid black'
      dark_mode.style.background = 'white'
      light_mode.style.background = '#fae588'
  })

  $(document).on('click', '#files li', function (e) {
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

  function displayFile(fileArray) {

      idx = 0
      for (let ele of fileArray) {
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

  function removeListItem(fileArray) {
      for (let ele of fileArray) {
          list = document.getElementById(ele);
          // console.log(list);
          list.remove()
      }
  }


  save.addEventListener("click", function () {
      let fileName = prompt("Enter File name to be saved")


      if (saveFile(fileName)) {
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

  deleteAll.addEventListener("click", function () {
      {
          Toastify({

              text: "All files deleted Successfully.",
              gravity: "top",
              position: "center",
              duration: 2000,
              style:
              {

                  background: "-webkit-linear-gradient(315deg, #f90c0c, #FFAE42)"
              }

          }).showToast();
          console.log("deleteall");
          textArea.value = ''
          removeListItem(fileArray)
          localStorage.clear();
          // localStorage.removeItem("fileArray")
          fileArray = []
          // console.log(fileArray);

      }
  })


  copyAll.addEventListener("click", function () {
      let textContent = document.querySelector("#text").value;
      navigator.clipboard.writeText(textContent).then(function () {

          Toastify({

              text: "Text copied to clipboard.",
              gravity: "top",
              position: "center",
              duration: 2000,
              style:
              {

                  background: "-webkit-linear-gradient(315deg, #73a6ff, #5377f5)"
              }

          }).showToast();
      });
  })


})
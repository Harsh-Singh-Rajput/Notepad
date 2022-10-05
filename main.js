document.addEventListener("DOMContentLoaded", function () {
  let save = document.getElementById("save");
  let deleteAll = document.getElementById("deleteAll");
  let copyAll = document.getElementById("copyAll");
  let textArea = document.getElementById("text");
  let bold = document.getElementById("bold");
  let plain = document.getElementById("plain");
  let emphasized = document.getElementById("emphasized");
  let unemphasized = document.getElementById("unemphasized");
  let underline = document.getElementById("underline");
  let normal = document.getElementById("normal");
  fileArray = [];
  if (localStorage.getItem("fileArray")) {
    fileArray = JSON.parse(localStorage.getItem("fileArray"));
    displayFile(fileArray);
  }

  function saveFile(fileName) {
    if (fileName == "") {
      Toastify({
        text: "Please enter a file name",
        gravity: "top",
        position: "center",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #FF0000, #FF8C00)",
        },
      }).showToast();
      return 0;
    }
    if (localStorage.getItem(fileName)) {
      Toastify({
        text: "File already exists. Please change the file name.",
        gravity: "top",
        position: "center",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      return 0;
    } else if (fileName === null) {
      Toastify({
        text: "Operation Terminated...",
        gravity: "top",
        position: "center",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #FF0000, #FF8C00)",
        },
      }).showToast();
    } else if (fileName == " ") {
      Toastify({
        text: "Enter  valid name",
        gravity: "top",
        position: "center",
        duration: 2000,
        style: {
          //background:"linear-gradient(to right, #00b09b, #96c93d)"
          background: "-webkit-linear-gradient(315deg, #73a5ff, #5477f5)",
        },
      }).showToast();
    } else {
      console.log(fileArray);
      Toastify({
        text: "File saved Successfully.",
        gravity: "top",
        position: "center",
        duration: 2000,
        style: {
          background: "-webkit-linear-gradient(315deg, #41cb1b, #9ACD32)",
        },
      }).showToast();

      removeListItem(fileArray);
      return 1;
    }
  }

  function removeStyle() {
    textArea.style.fontWeight = "none";
    textArea.style.textDecoration = "none";
    textArea.style.fontStyle = "none";
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
    textArea.style.fontWeight = "bold";
    bold.classList.add("active");
    plain.classList.remove("active");
  });
  underline.addEventListener("click", function () {
    textArea.style.textDecoration = "underline";
    underline.classList.add("active");
    normal.classList.remove("active");
  });
  emphasized.addEventListener("click", function () {
    textArea.style.fontStyle = "italic";
    emphasized.classList.add("active");
    unemphasized.classList.remove("active");
  });
  plain.addEventListener("click", function () {
    textArea.style.fontWeight = "";
    plain.classList.add("active");
    bold.classList.remove("active");
  });
  normal.addEventListener("click", function () {
    textArea.style.textDecoration = "";
    normal.classList.add("active");
    underline.classList.remove("active");
  });
  unemphasized.addEventListener("click", function () {
    textArea.style.fontStyle = "";
    unemphasized.classList.add("active");
    emphasized.classList.remove("active");
  });

  $(document).on("click", "#files li", function (e) {
    // console.log("file clicked");
    key = $(this).attr("id");
    keyFile = localStorage.getItem(key);
    console.log(key);
    jsonKeyFile = JSON.parse(keyFile);
    $("#text").val(jsonKeyFile);
    // removeStyle();
  });

  $(document).on("click", "li div.cont .btn-danger", function (e) {
    e.stopPropagation();
    key = $(this).attr("id");
    localStorage.removeItem(key);
    fileArray = fileArray.filter((item) => item !== key);
    localStorage.setItem("fileArray", JSON.stringify(fileArray));

    $(document)
      .find("li#" + key)
      .remove();
  });

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
    idx = 0;
    for (let ele of fileArray) {
      ol = document.getElementById("files");

      li = document.createElement("li");
      li.setAttribute("id", `${ele}`);
      li.setAttribute("class", "list");

      p = document.createElement("p");
      // p.setAttribute("id", `${ele}`);
      p.appendChild(document.createTextNode(ele));
      // p.appendChild(span);

      btn = document.createElement("button");
      btn.setAttribute("id", `${ele}`);
      btn.setAttribute("class", "btn btn-danger");
      btn.appendChild(document.createTextNode("X"));

      div = document.createElement("div");
      div.setAttribute("class", "cont");

      div.appendChild(p);
      div.appendChild(btn);
      li.appendChild(div);
      ol.appendChild(li);

      idx += 1;
    }
  }

  function removeListItem(fileArray) {
    for (let ele of fileArray) {
      list = document.getElementById(ele);
      // console.log(list);
      list.remove();
    }
  }

  save.addEventListener("click", function () {
    let fileName = prompt("Enter File name to be saved");

    if (saveFile(fileName)) {
      // console.log(fileArray);

      fileArray.push(fileName);
      jsonFileArray = JSON.stringify(fileArray);
      localStorage.setItem("fileArray", jsonFileArray);
      let textContent = document.querySelector("#text").value;
      let jsonTextContent = JSON.stringify(textContent);

      localStorage.setItem(fileName, jsonTextContent);
      displayFile(fileArray);
      // console.log(fileArray);
    }
  });

  deleteAll.addEventListener("click", function () {
    {
      Toastify({
        text: "All files deleted Successfully.",
        gravity: "top",
        position: "center",
        duration: 2000,
        style: {
          background: "-webkit-linear-gradient(315deg, #f90c0c, #FFAE42)",
        },
      }).showToast();
      console.log("deleteall");
      textArea.value = "";
      removeListItem(fileArray);
      localStorage.clear();
      // localStorage.removeItem("fileArray")
      fileArray = [];
      // console.log(fileArray);
    }
  });

  copyAll.addEventListener("click", function () {
    let textContent = document.querySelector("#text").value;
    navigator.clipboard.writeText(textContent).then(function () {
      Toastify({
        text: "Text copied to clipboard.",
        gravity: "top",
        position: "center",
        duration: 2000,
        style: {
          background: "-webkit-linear-gradient(315deg, #73a6ff, #5377f5)",
        },
      }).showToast();
    });
  });
});

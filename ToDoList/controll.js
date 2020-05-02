//為各條list製造close
function createClose(obj){
  var closeTab = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  closeTab.className = "close";
  closeTab.appendChild(txt);
  obj.appendChild(closeTab);
}

//按下close
function pressClose(){
  var closeList = document.getElementsByClassName("close");
  for(num = 0 ; num < closeList.length ; num++){
    closeList[num].onclick = function(){
      //this.parentElement.style.display = "none";
      this.parentElement.remove();
    }
  }
}

//按下submit
function clickBtn(){
  var inputValue = document.getElementById("inputText").value;
  if (inputValue === '') {
    alert("You must write something!");
  }else{
    var new_li = document.createElement("li");
    var t = document.createTextNode(inputValue);
    new_li.appendChild(t);

    document.getElementById("ulList").appendChild(new_li);
    document.getElementById("inputText").value = "";

    createClose(new_li);
    pressClose();
  }
}

//在input方塊直接按enter
function pressKey(kValue){
  if(kValue.keyCode === 13)
    clickBtn();
}


// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("li");
var num;
for(num = 0 ; num < myNodelist.length ; num++){
  createClose(myNodelist[num]);
}

//劃掉list上的項目
var ulist = document.querySelector('ul');
ulist.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('taskDone');
  }
}, false);

pressClose();

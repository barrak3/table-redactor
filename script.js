var letter = '[{"name":"Bob", "value":"23yeas"},{"name":"Alex", "value":"24years"}]';
var arr = JSON.parse(letter);
var id = 0;
go(arr);

function filling() { //Заполнение таблицы при инициализации
  var myInp = document.getElementById("myInputJSON"); 
  var arr = JSON.parse(myInp.value);
  go(arr);

}

function go(arr) {  //Заполнение таблицы

  var myInp = document.getElementById("myInputJSON"); 
  var myTable = document.getElementById("myTable"); 

  var select1 = document.getElementById("mySelect1"); 
  var select2 = document.getElementById("mySelect2");
  var select3 = document.getElementById("mySelect3");

  for (var i = 0; i < arr.length;i++){ 
    
    var newTr = document.createElement("tr");

    var newTd1 = document.createElement("td");
    var newTd2 = document.createElement("td");
    var newTd0 = document.createElement("td");

    var newOption1 = document.createElement("option");
    var newOption2 = document.createElement("option");
    var newOption3 = document.createElement("option");

    var newCheck = document.createElement("input");
    newCheck.setAttribute("type","checkbox");
    newCheck.setAttribute("class","checkbox");
  
    var newInp1 = document.createElement("input");
    var newInp2 = document.createElement("input");

    newInp1.value = arr[i].name;
    newInp2.value = arr[i].value;

    newTd0.innerHTML = id;
    newTd0.setAttribute("class","id");

    newOption1.innerHTML = id;
    newOption2.innerHTML = id;
    newOption3.innerHTML = id;

    id++;
      
    newTd1.appendChild(newInp1);
    newTd2.appendChild(newInp2);
    
    select1.appendChild(newOption1);
    select2.appendChild(newOption2);
    select3.appendChild(newOption3);
    
    newTr.appendChild(newTd0);
    newTr.appendChild(newTd1);  
    newTr.appendChild(newTd2);
    
    newTr.appendChild(newCheck);

    myTable.appendChild(newTr);
  }

}

function deleteELements() { //удаление выбранных строчек в таблице
  var myCheckBoxs = document.getElementsByClassName("checkbox"); 
  
  for (var i = 0; i < myCheckBoxs.length; i++){
    if ( myCheckBoxs[i].checked ) {  myCheckBoxs[i].parentNode.remove(); i--;}  
  }

}

function downloadElements() { //выгрузка данных в инпут
  var myInp = document.getElementById("myInputJSON"); 

  var myTable = document.getElementById("myTable"); 
  var myCheckBoxs = document.getElementsByClassName("checkbox"); 
  var mas = [];
  var obj = {};

  for (var i = 0; i < myCheckBoxs.length; i++){
    if ( myCheckBoxs[i].checked ) { 

     var obj = { name:myCheckBoxs[i].parentNode.childNodes[1].firstChild.value,
                 value:myCheckBoxs[i].parentNode.childNodes[2].firstChild.value }

     mas.push(obj);
     }  
  }
  
  myInp.value = JSON.stringify(mas);

}

function сhangeElements(){ //поменять местами строчки
  var select1 = document.getElementById("mySelect1"); 
  var select2 = document.getElementById("mySelect2"); 

  var numberChangingElement1 = +select1.value;
  var numberChangingElement2 = +select2.value;
 
  var idElements = document.getElementsByClassName("id");
  var a,b,c,d;
  
  a = idElements[numberChangingElement1].parentNode.childNodes[1].firstChild.value;
  b = idElements[numberChangingElement1].parentNode.childNodes[2].firstChild.value;
  
  c = idElements[numberChangingElement2].parentNode.childNodes[1].firstChild.value;
  d = idElements[numberChangingElement2].parentNode.childNodes[2].firstChild.value;
   
  idElements[numberChangingElement1].parentNode.childNodes[1].firstChild.value = c;
  idElements[numberChangingElement1].parentNode.childNodes[2].firstChild.value = d;
  
  idElements[numberChangingElement2].parentNode.childNodes[1].firstChild.value = a;
  idElements[numberChangingElement2].parentNode.childNodes[2].firstChild.value = b;

}
 
function addElement(){ //добавить новый элемент в таблицу
  var myInp2 = document.getElementById("myInputName");
  var myInp3 = document.getElementById("myInputValue");
  var obj = { name:myInp2.value,
              value:myInp3.value }
  var arr = [obj];
  go(arr);

}

function moveElement(){ //вставка выбранного элемента в выбранную строку
  var myCheckBoxs = document.getElementsByClassName("checkbox");

  var select3 = document.getElementById("mySelect3");
  var numberPositionElement = +select3.value;

  var f = -1;
  var c,d,b,a; //локальные переменные

  for (var i = 0; i < myCheckBoxs.length; i++){ //находим выбранный элемент
    if ( myCheckBoxs[i].checked ) { f = i; break;}  
  }
  
  if ( (f == -1) && (f != numberPositionElement) ) { return; } 

  c = myCheckBoxs[f].parentNode.childNodes[1].firstChild.value;  //сохранаяем значения выбраного элемента и значения элемента куда будет происходить вставка
  d = myCheckBoxs[f].parentNode.childNodes[2].firstChild.value;
  
  a = myCheckBoxs[numberPositionElement].parentNode.childNodes[1].firstChild.value;
  b = myCheckBoxs[numberPositionElement].parentNode.childNodes[2].firstChild.value;
  
  myCheckBoxs[numberPositionElement].parentNode.childNodes[1].firstChild.value = c;
  myCheckBoxs[numberPositionElement].parentNode.childNodes[2].firstChild.value = d;

  if (f > numberPositionElement){  //направление сдвигания столбцов 

    for (var i = 1; i <= (f - numberPositionElement) ;i++){  //сдвигание столбцов сверху вниз
      
      if(i%2!=0){
        c = myCheckBoxs[numberPositionElement + i].parentNode.childNodes[1].firstChild.value;
        d = myCheckBoxs[numberPositionElement + i].parentNode.childNodes[2].firstChild.value;

        myCheckBoxs[numberPositionElement + i].parentNode.childNodes[1].firstChild.value = a;
        myCheckBoxs[numberPositionElement + i].parentNode.childNodes[2].firstChild.value = b;
      }
      else{
        a = myCheckBoxs[numberPositionElement + i].parentNode.childNodes[1].firstChild.value;
        b = myCheckBoxs[numberPositionElement + i].parentNode.childNodes[2].firstChild.value;
  
        myCheckBoxs[numberPositionElement + i].parentNode.childNodes[1].firstChild.value = c;
        myCheckBoxs[numberPositionElement + i].parentNode.childNodes[2].firstChild.value = d;
      }

    }
  }
  else{

    for (var i = 1; i <= (numberPositionElement - f) ;i++){ //сдвигание столбцов снизу верх
      
      if(i%2!=0){
        c = myCheckBoxs[numberPositionElement - i].parentNode.childNodes[1].firstChild.value;
        d = myCheckBoxs[numberPositionElement - i].parentNode.childNodes[2].firstChild.value;

        myCheckBoxs[numberPositionElement - i].parentNode.childNodes[1].firstChild.value = a;
        myCheckBoxs[numberPositionElement - i].parentNode.childNodes[2].firstChild.value = b;
      }
      else{
        a = myCheckBoxs[numberPositionElement - i].parentNode.childNodes[1].firstChild.value;
        b = myCheckBoxs[numberPositionElement - i].parentNode.childNodes[2].firstChild.value;
  
        myCheckBoxs[numberPositionElement - i].parentNode.childNodes[1].firstChild.value = c;
        myCheckBoxs[numberPositionElement - i].parentNode.childNodes[2].firstChild.value = d;
      }

    }
  }

  for (var i = 0; i < myCheckBoxs.length; i++){ //ощистка чекбоксов
    myCheckBoxs[i].checked = false;  
  }

}


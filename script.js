var letter = '[{"name":"Bob", "value":"23yeas"},{"name":"Alex", "value":"24years"}]';//Массив записей
var id = 0;//id строк 

try{ //проверка на ввод массива записей
   var arr = JSON.parse(letter);

   for (var i = 0; i < arr.length; i++){
      
       if ( (arr[i].name === undefined) || (arr[i].value === undefined) || ( Object.getOwnPropertyNames(arr[i]).length != 2 ) ) { throw new Error(); }
   }

   go(arr);
}  catch(e){

   alert("Некорректные данные");
   
}

function fillingFromFile() { //загрузка массива данных из файла 
  var control = document.getElementById("your-files");
  var files = control.files;

  var reader = new FileReader();

  reader.onload = function(event) {
    var contents = event.target.result;

    try{
      var arr = JSON.parse(contents);
     

      for (var i = 0; i < arr.length; i++){ //для каждого их элементов массива проверяем верно ли заданы их свойства
      
        if ( (arr[i].name === undefined) || (arr[i].value === undefined) || ( Object.getOwnPropertyNames(arr[i]).length != 2 ) ) { throw new Error(); }
      }
     

    } catch(e){
     
        alert("Некорректные данные");

        return;
    }

   go(arr);  //если все верно добавляем данные в таблицу 
  
  };
 
  reader.onerror = function(event) {
    console.error("Файл не может быть прочитан! код " + event.target.error.code);
  };
 
  reader.readAsText(files[0]);

}

function filling() { //Заполнение табилцы в формате JSON из inputа
  var myInp = document.getElementById("myInputJSON"); 
  
  try{
     var arr = JSON.parse(myInp.value);
     

     for (var i = 0; i < arr.length; i++){
      
       if ( (arr[i].name === undefined) || (arr[i].value === undefined) || ( Object.getOwnPropertyNames(arr[i]).length != 2 ) ) { throw new Error(); }
     }
     

  }  catch(e){
     
     alert("Некорректные данные");

     return;

  }

  
  go(arr);

}

function go(arr) {  //Метод который заполняет в таблицу массив arr 

  var myTable = document.getElementById("myTable"); 

  var select1 = document.getElementById("mySelect1");  
  var select2 = document.getElementById("mySelect2");
  var select3 = document.getElementById("mySelect3");

  for (var i = 0; i < arr.length;i++){  //проходим по кадому объекту в массиве  arr
    
    var newTr = document.createElement("tr");  // новая строчка
   
    var newTd0 = document.createElement("td"); //3 новые ячейки в таблице
    var newTd1 = document.createElement("td");
    var newTd2 = document.createElement("td");
    

    var newOption1 = document.createElement("option"); //новые ячейкив select 
    var newOption2 = document.createElement("option");
    var newOption3 = document.createElement("option");

    var newCheck = document.createElement("input");

    newCheck.setAttribute("type","checkbox"); //новый chexbox
    newCheck.setAttribute("class","checkbox");
  
    var newInp1 = document.createElement("input"); //значение объекта arr[i] сохраняются в Input 
    var newInp2 = document.createElement("input");

    newInp1.value = arr[i].name;
    newInp2.value = arr[i].value;

    newTd0.innerHTML = id; //заполнение нумерации таблицы
    newTd0.setAttribute("class","id");

    newOption1.innerHTML = id;
    newOption2.innerHTML = id;
    newOption3.innerHTML = id;

    id++; // увеличение счетчика строк
      
    newTd1.appendChild(newInp1); //присоеденение всех элементов в документ
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
  
  var select1 = document.getElementById("mySelect1"); 
  var select2 = document.getElementById("mySelect2");
  var select3 = document.getElementById("mySelect3");

  for (var i = 0; i < myCheckBoxs.length; i++){ 
    if ( myCheckBoxs[i].checked ) { //если строчка выбрана
      

      for (var j = i+1; j < myCheckBoxs.length; j++){
        myCheckBoxs[j].parentNode.childNodes[0].innerHTML = +myCheckBoxs[j].parentNode.childNodes[0].innerHTML - 1; //  уменльшение id у строк после удаляемого элемента
      }

      id--; //уменьшаем количество элеменотов 
      
      select1.lastChild.parentNode.removeChild(select1.lastChild);//уменьшение на 1 количества строк 
      select2.lastChild.parentNode.removeChild(select2.lastChild);
      select3.lastChild.parentNode.removeChild(select3.lastChild);

    

      myCheckBoxs[i].parentNode.parentNode.removeChild(myCheckBoxs[i].parentNode); //удаление выбранного элемента 
 

      i--; // тк mycheckboxs живая коллекция html то после удаление следующий элемент станет на текущую позицию i для этого мы делаем декремент i 
    }  
  }
  
}

function downloadElements() { //выгрузка данных в инпут
  var myInp = document.getElementById("myInputJSON"); 

  var myTable = document.getElementById("myTable"); 
  var myCheckBoxs = document.getElementsByClassName("checkbox"); 
  var mas = [];
  var obj = {};

  for (var i = 0; i < myCheckBoxs.length; i++){ //все выбранные элементы мы помещаем в массив mas 
    if ( myCheckBoxs[i].checked ) { 

     var obj = { name:myCheckBoxs[i].parentNode.childNodes[1].firstChild.value,
                 value:myCheckBoxs[i].parentNode.childNodes[2].firstChild.value }

     mas.push(obj);
     }  
  }
  
  myInp.value = JSON.stringify(mas);//выгружаем в Input массив

}

function сhangeElements(){ //поменять местами строчки
  var select1 = document.getElementById("mySelect1"); 
  var select2 = document.getElementById("mySelect2"); 

  var numberChangingElement1 = +select1.value; //сохранем в переменные выбранные строчки
  var numberChangingElement2 = +select2.value;
 
  var idElements = document.getElementsByClassName("id");
  var a,b,c,d;
  
  a = idElements[numberChangingElement1].parentNode.childNodes[1].firstChild.value; //соответствует значениям первой строчки 
  b = idElements[numberChangingElement1].parentNode.childNodes[2].firstChild.value;
  
  c = idElements[numberChangingElement2].parentNode.childNodes[1].firstChild.value; //соответствует значениям второй строчки 
  d = idElements[numberChangingElement2].parentNode.childNodes[2].firstChild.value;
   
  idElements[numberChangingElement1].parentNode.childNodes[1].firstChild.value = c; //меняем местами значения 
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

function moveElement(){ //вставка выбранного элемента перед выбранной строкой
  var a = document.getElementsByClassName("checkbox"); // живая коллекция чекбоксов
  
  var myCheckBoxs = [].slice.call(a);
  

  var select3 = document.getElementById("mySelect3");
  var numberPositionElement = +select3.value;

  var f = -1;
  var tdSelect,tdCheckbox; //локальные переменные

  for (var i = 0; i < myCheckBoxs.length; i++){ //находим выбранный элемент
    if ( myCheckBoxs[i].checked ) { f = i; break;}  //при первом нахождении выбранного элемента выходим из цикла
  }
  
  if ( (f == -1) || (f == numberPositionElement)  ) { return; } //если нет выбранно элемента ничего не делаем или он уже стоит на своем месте 
  
  tdSelect = myCheckBoxs[numberPositionElement].parentNode // перестановка строк 
 
  tdCheckbox =  myCheckBoxs[f].parentNode.parentNode.removeChild(myCheckBoxs[f].parentNode);

  myCheckBoxs[numberPositionElement].parentNode.parentNode.insertBefore(tdCheckbox,tdSelect);


  for (var i = 0; i < myCheckBoxs.length; i++){ //ощистка чекбоксов
    myCheckBoxs[i].checked = false;  
  }
 
  
  for (var i = 0; i < a.length; i++){ //установка id 
    a[i].parentNode.childNodes[0].innerHTML = i ; 
  }

}


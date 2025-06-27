let fieldSize = document.querySelectorAll('a');
let fieldSizeConst = {s: 10, m: 20, l: 30, xl: 40, xxl: 50};
var countedFieldSize = 0;
let fieldArray = [];
let mainTable = document.querySelector('#mainTable');
let pVar = document.querySelector('p');


for (let elem of fieldSize) {

  // Обработчик выбора размера поля. Точка входа.
  elem.addEventListener('click', function()
  {

    // Получаем размер поля
    countedFieldSize = fieldSizeConst[elem.id];
     
    // определяем макс. кол-во бомб на строку
    let bombQuantityMax = Math.floor(fieldSizeConst[elem.id] / 5);

    // Заполняем массив "0" и сразу его минируем
    for (let i = 0; i < fieldSizeConst[elem.id]; i++) {

	fieldArray[i] = []; // создаем подмассив
	
	for (let j = 0; j < fieldSizeConst[elem.id]; j++) {

		fieldArray[i].push(0); // заполняем подмассив числами

	}

       // минируем строки
       for (let k = 0; k < bombQuantityMax; k++) {

         fieldArray[i][myRandom(0, fieldSizeConst[elem.id])] = 10; // 10 - это бомба

       }
    }

    // проставляем числа
    for (i = 0; i < fieldSizeConst[elem.id]; i++) {
	
	for (j = 0; j < fieldSizeConst[elem.id]; j++) {

            // проверяем, не мина ли это
            if(fieldArray[i][j] == 10){
              continue;
            }

            // левый верхний угол
            if(i==0 && j==0)
            {
                fieldArray[i][j] = Math.floor(fieldArray[i][j+1]/10) + Math.floor(fieldArray[i+1][j+1]/10) + Math.floor(fieldArray[i+1][j]/10);
            }

            // верхняя строка без углов
            if(i==0 && j >= 1 && j <= (fieldSizeConst[elem.id]-2))
            {
                fieldArray[i][j] = Math.floor(fieldArray[i][j-1]/10) + Math.floor(fieldArray[i+1][j-1]/10) + Math.floor(fieldArray[i+1][j]/10) + 
                                   Math.floor(fieldArray[i+1][j+1]/10) + Math.floor(fieldArray[i][j+1]/10);
            }

            // правый верхний угол
            if(i==0 && j== (fieldSizeConst[elem.id]-1))
            {
                fieldArray[i][j] = Math.floor(fieldArray[i][j-1]/10) + Math.floor(fieldArray[i+1][j-1]/10) + Math.floor(fieldArray[i+1][j]/10);
            }

            // левая колонка без углов
            if(i >= 1 && i <= (fieldSizeConst[elem.id]-2) && j == 0)
            {
                fieldArray[i][j] = Math.floor(fieldArray[i-1][j]/10) + Math.floor(fieldArray[i-1][j+1]/10) + Math.floor(fieldArray[i][j+1]/10) +
                                   Math.floor(fieldArray[i+1][j+1]/10) + Math.floor(fieldArray[i+1][j]/10);
            }

            // середина
            if(i >= 1 && i <= (fieldSizeConst[elem.id]-2) && j >= 1 && j <= (fieldSizeConst[elem.id]-2))
            {
                fieldArray[i][j] = Math.floor(fieldArray[i-1][j-1]/10) + Math.floor(fieldArray[i-1][j]/10) + Math.floor(fieldArray[i-1][j+1]/10) + 
                                   Math.floor(fieldArray[i][j-1]/10) + Math.floor(fieldArray[i][j+1]/10) + 
                                   Math.floor(fieldArray[i+1][j-1]/10) + Math.floor(fieldArray[i+1][j]/10) + Math.floor(fieldArray[i+1][j+1]/10);
            }

            // правая колонка без углов
            if(i >= 1 && i <= (fieldSizeConst[elem.id]-2) && j == (fieldSizeConst[elem.id]-1))
            {
                fieldArray[i][j] = Math.floor(fieldArray[i-1][j]/10) + Math.floor(fieldArray[i-1][j-1]/10) + Math.floor(fieldArray[i][j-1]/10) + 
                                   Math.floor(fieldArray[i+1][j-1]/10) + Math.floor(fieldArray[i+1][j]/10);
            }

            // левый нижний угол
            if(i == (fieldSizeConst[elem.id]-1) && j == 0)
            {
                fieldArray[i][j] = Math.floor(fieldArray[i-1][j]/10) + Math.floor(fieldArray[i-1][j+1]/10) + Math.floor(fieldArray[i][j+1]/10);
            }

            // нижняя строка без углов
            if(i == (fieldSizeConst[elem.id]-1) && j >= 1 && j <= (fieldSizeConst[elem.id]-2))
            {
                fieldArray[i][j] = Math.floor(fieldArray[i][j-1]/10) + Math.floor(fieldArray[i-1][j-1]/10) + Math.floor(fieldArray[i-1][j]/10) + 
                                   Math.floor(fieldArray[i-1][j+1]/10) + Math.floor(fieldArray[i][j+1]/10);
            }

            // правый нижний угол
            if(i == (fieldSizeConst[elem.id]-1) && j == (fieldSizeConst[elem.id]-1))
            {
                fieldArray[i][j] = Math.floor(fieldArray[i-1][j]/10) + Math.floor(fieldArray[i-1][j-1]/10) + Math.floor(fieldArray[i][j-1]/10);
            }
        }
    }
    console.log(fieldArray);


    // Рисуем таблицу и вешаем на ячейки обработчики
    for(i = 0; i < fieldSizeConst[elem.id]; i++)
    {
       let varTR = document.createElement('tr');
       mainTable.appendChild(varTR);

       for(j = 0; j < fieldSizeConst[elem.id]; j++)
       {
           let varTD = document.createElement('td');
           //varTD.textContent = fieldArray[i][j];
           varTD.id = i + '.' + j;
           varTD.dataset.i = i;
           varTD.dataset.j = j;
           varTD.classList.add('myTDCovered');


           // обработчик клика левой кнопки по ячейке
           varTD.addEventListener('click', function(){


               // если ячейка уже открыта или в ней проставлен флаг, завершаем обработку функции
               if(this.classList.contains('myTDUnCovered') || this.classList.contains('flagCell'))
                 return;

               // если это бомба, показываем её и завершаем игру
               if(fieldArray[this.dataset.i][this.dataset.j] == 10)
               {
                   gameOver();
               }

               // если ячейка с цифрой от 1 до 8
               if(fieldArray[this.dataset.i][this.dataset.j] >= 1 && fieldArray[this.dataset.i][this.dataset.j] <= 8)
               {
                  this.classList.remove('myTDCovered');
                  this.classList.add('myTDUnCovered');
                  varTD.textContent = fieldArray[this.dataset.i][this.dataset.j];
               }

               // если пустая ячейка
               if(fieldArray[this.dataset.i][this.dataset.j] == 0)
               {
                   cellsColoring(varTD.dataset.i, varTD.dataset.j);
               }

               console.log(fieldArray);

           });

           // обработчик клика правой кнопки по ячейке
           varTD.addEventListener('contextmenu', function(e){

               console.log("Right button");
               e.preventDefault();

               // если ячейка уже открыта или в ней проставлен флаг, завершаем обработку функции
               if(this.classList.contains('myTDUnCovered') || this.classList.contains('flagCell'))
                 return;
               
               if(fieldArray[this.dataset.i][this.dataset.j] >= 20){

                   // флаг уже установлен. Его надо снять.
                   fieldArray[this.dataset.i][this.dataset.j] = fieldArray[this.dataset.i][this.dataset.j] - 20;
                   this.classList.remove('flagCell');
                   this.classList.add('myTDCovered');
                   let imgSeacrh = this.querySelector('img');
                   imgSeacrh.remove();

               }
               else{

                   // флаг ещё не установлен. Его надо поставить.
                   fieldArray[this.dataset.i][this.dataset.j] = fieldArray[this.dataset.i][this.dataset.j] + 20;
                   this.classList.remove('myTDCovered');
                   this.classList.add('flagCell');
                   let imgVar = document.createElement('img');
                   imgVar.src = "flag2.png";
                   this.appendChild(imgVar);

               }

           });

           varTR.appendChild(varTD);
       }
    }



  });
}

// функция Рандома
function myRandom(min, max){

    return Math.floor(Math.random()*(max - min) + min);

};

// функция подсвечивания пустых элементов
function cellsColoring(row, col){
   
    // красим ячейку, как посещенную
    fieldArray[row][col] = 12;

    // проверяем значение ячейки сверху
    if(row >= 1)
    {

        if(fieldArray[row - 1][col] == 0)   // если ячейку ещё не посещали
        {
            console.log('up');
            cellsColoring(row - 1, col);
        }
    }

    // проверяем значение ячейки справа
    if(col <= (countedFieldSize - 2))
    {

        if(fieldArray[row][Number(col) + 1] == 0)   // если ячейку ещё не посещали
        {
            console.log('right');
            cellsColoring(row, Number(col)+1);
        }
      
    }

    // проверяем значение ячейки снизу
    if(row <= (countedFieldSize - 2))
    {

        if(fieldArray[Number(row) + 1][col] == 0)   // если ячейку ещё не посещали
        {
            console.log('down');
            cellsColoring(Number(row)+1, col);
        }
      
    }

    // проверяем значение ячейки слева
    if(col => 1)
    {

        if(fieldArray[row][Number(col) - 1] == 0)   // если ячейку ещё не посещали
        {
            console.log('down');
            cellsColoring(row, Number(col) - 1);
        }
      
    }


    fieldArray[row][col] = 13;
    
    // открываем ячейку
    let tempTD = document.getElementById(row + '.' + col);
    tempTD.classList.remove('myTDCovered');
    tempTD.classList.add('myTDUnCovered');
   
};

// функция завершения игры и открытия всей карты
function gameOver(){

    for(i = 0; i < countedFieldSize; i++)
    {     
       for(j = 0; j < countedFieldSize; j++)
       {
           let tempTD = document.getElementById(i + '.' + j);

           // если это пустая ячейка
           if(fieldArray[i][j] == 0)
           {
               tempTD.classList.remove('myTDCovered');
               tempTD.classList.add('myTDUnCovered');
           }

           // если это бомба
           if(fieldArray[i][j] == 10)
           {
                   tempTD.textContent = "";
                   tempTD.classList.remove('myTDCovered');
                   tempTD.classList.add('bombCell');
                   let imgVar = document.createElement('img');
                   imgVar.src = "bomb2_new.png";
                   tempTD.appendChild(imgVar);
           }

           // если это цифирь
           if(fieldArray[i][j] >= 1 && fieldArray[i][j] <= 8)
           {           
                   tempTD.classList.remove('myTDCovered');
                   tempTD.classList.add('myTDUnCovered');
                   tempTD.textContent = fieldArray[i][j];
           }

           // если это флаг
           if(fieldArray[i][j] >= 20)
           {           
                   tempTD.classList.remove('flagCell');
                   tempTD.classList.add('myTDUnCovered');
                   let imgSeacrh = tempTD.querySelector('img');
                   imgSeacrh.remove();

                   if(fieldArray[i][j] > 20)
                       tempTD.textContent = fieldArray[i][j] - 20;

           }

           

       }
    }

    pVar.textContent = 'Game over';

}

class MyCube {
  //конструктор
  constructor(rows, cols, cube){
    this.rows = rows;
    this.cols = cols;
    this.cube = cube;

    this.border = 2;

    let wraperdiv = this.creatDiv("wraper", this.cube * (this.cols + 2), this.cube * (this.rows + 2));
    wraperdiv.onmousemove = this.mouseOwer.bind(this);

    let maindiv = this.creatDiv("main", this.cube * this.cols + this.border, this.cube * this.rows + this.border);
    wraperdiv.appendChild(maindiv);

    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        maindiv.appendChild(this.creatElement(i,j));

    let button = this.creatButton("right", "+");
    button.onclick = this.mouseClickRight.bind(this);
    maindiv.appendChild(button);

    button = this.creatButton("bottom", "+");
    button.onclick = this.mouseClickBottom.bind(this);
    maindiv.appendChild(button);

    button = this.creatButton("top", "-");
    button.onclick = this.mouseClickTop.bind(this);
    maindiv.appendChild(button);

    button = this.creatButton("left", "-");
    button.onclick = this.mouseClickLeft.bind(this);
    maindiv.appendChild(button);

    let body = document.querySelector("body");
    body.appendChild(wraperdiv);
 }

   //создание рабочей области
   creatDiv(str, wid, heig){
     let newDiv = document.createElement('div');
     newDiv.className = str;
     newDiv.style.width = wid + "px";
     newDiv.style.height = heig + "px";
     newDiv.style.top = this.cube + "px";
     newDiv.style.left = this.cube + "px";
     return newDiv;
   }

   //создание элементов в заданной позиции
   creatElement(col, row) {
     let newElement = document.createElement('div');
     newElement.className = "btn b" + col + row;
     newElement.style.width = this.cube + "px";
     newElement.style.height = this.cube + "px";
     newElement.style.top = this.cube * col + "px";
     newElement.style.left = this.cube * row + "px";
     return newElement;
   }

   //создание кнопок с заданным текстовм
   creatButton(str, val){
     let newButton = document.createElement('button');
     newButton.className = "btn "+ str;
     newButton.innerHTML = val;
     newButton.style.width = this.cube + "px";
     newButton.style.height = this.cube + "px";
     return newButton;
   }

   //изменение рабочей области
   changeDiv(){
     let wraper = document.querySelector(".wraper");
     let main = document.querySelector(".main");
     wraper.style.height = (this.rows + 2) * this.cube+ "px";
     main.style.height = this.rows * this.cube + this.border + "px";
     wraper.style.width = (this.cols + 2) * this.cube+ "px";
     main.style.width = this.cols * this.cube + this.border + "px";
   }

   //скрытие кнопок
   hidenButton(){
     let left = document.querySelector(".left");
     let top = document.querySelector(".top");
     left.style.visibility = "hidden";
     top.style.visibility = "hidden";
   }

   //отображение кнопок
   showButton(x, y){
     let left = document.querySelector(".left");
     let top = document.querySelector(".top");
     if (this.cols > 1)
       top.style.visibility = "visible";
     if (this.rows > 1)
       left.style.visibility = "visible";
     if (event.target.className !== "main")
       {
       left.style.top = y;
       top.style.left = x;
     }
   }

   //преобразование строки размера в число
   convertPx(str){
     let rez = str;
     rez = rez.substring(0, rez.length - 2);
     return rez;
   }

   //движение мыши
   mouseOwer(event) {
     if  (event.target.className.indexOf("wraper") != -1 ||
          event.target.className.indexOf("bottom") !=-1 ||
          event.target.className.indexOf("right") !=-1)
        this.hidenButton();
     else
        this.showButton(event.target.style.left, event.target.style.top)
      }

    //клик на правой кнопке
    mouseClickRight(event) {
      let main = document.querySelector(".main");
      for (let i = 0; i < this.rows; i++){
         main.appendChild(this.creatElement(i, this.cols));
       }
       this.cols++;
       this.changeDiv();
      }

    //клик на верхней кнопке
    mouseClickTop(event) {
      this.hidenButton();
      let main = document.querySelector(".main");
      let n = this.convertPx(event.target.style.left)/ this.cube;
      for (let i = 0; i < this.rows; i++){
         let str = ".b" + i + n;
         let btn = main.querySelector(str);
         btn.remove();
         if (n < this.cols){
           for (let j = n + 1; j<this.cols; j++)
            {
              let old = ".b" + i + j;
              btn = main.querySelector(old);
              btn.className = "btn b" + i + (j - 1);
              btn.style.left = this.convertPx(btn.style.left) - this.cube + "px";
            }
          }
       }
       this.cols--;
       this.changeDiv();
      }

   //клик на нижней кнопке
   mouseClickBottom(event) {
      let main = document.querySelector(".main");
      for (let i = 0; i < this.cols; i++){
         main.appendChild(this.creatElement(this.rows, i));
       }
       this.rows++;
       this.changeDiv();
      }

    //клик на левой кнопке
    mouseClickLeft(event){
      this.hidenButton();
      let main = document.querySelector(".main");
      let n = this.convertPx(event.target.style.top)/ this.cube;
      for (let i = 0; i < this.cols; i++){
         let str = ".b" + n + i;
         let btn = main.querySelector(str);
         btn.remove();
         if (n < this.rows){
           for (let j = n + 1; j<this.rows; j++)
            {
              let old = ".b" + j + i;
              btn = main.querySelector(old);
              btn.className = "btn b" + (j - 1) + i;
              btn.style.top = this.convertPx(btn.style.top) - this.cube + "px";
            }
          }
       }
       this.rows--;
       this.changeDiv();
      }
}

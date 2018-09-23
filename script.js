// прототип с методами для нового элемента
var MyCube = Object.create(HTMLElement.prototype);

 MyCube.createdCallback = function() {
    this.rows = 4;
    this.cols = 4;
    this.cube = 50;
    }

  MyCube.attachedCallback = function (){
      let workdiv = document.createElement('div');
      workdiv.className = "work";
      workdiv.style.width = this.cube * (this.cols + 2) + "px";
      workdiv.style.height = this.cube * (this.rows + 2) + "px";
      workdiv.style.left = this.cube + "px"
      workdiv.style.top = this.cube + "px"
      workdiv.onmousemove = this.mOwer.bind(this);
      let maindiv = document.createElement('div');
      maindiv.className = "main";
      maindiv.style.width = this.cube * this.cols + "px";
      maindiv.style.height = this.cube * this.rows + "px";
      maindiv.style.left = this.cube + "px"
      maindiv.style.top = this.cube + "px"
      workdiv.appendChild(maindiv);
      for (let i = 0; i < this.rows; i++)
        for (let j = 0; j < this.cols; j++)
        {
          let newButton = document.createElement('button');
          newButton.className = "bt";
          newButton.style.width = this.cube + "px";
          newButton.style.height = this.cube + "px";
          maindiv.appendChild(newButton);
        }
        var newButton = document.createElement('button');
        newButton.className = "bt right";
        newButton.innerHTML = '+';
        newButton.onclick = this.mClickR.bind(this);
        newButton.style.width = this.cube + "px";
        newButton.style.height = this.cube + "px";
        maindiv.appendChild(newButton);
        newButton = document.createElement('button');
        newButton.className = "bt bottom";
        newButton.innerHTML = '+';
        newButton.onclick = this.mClickB.bind(this);
        newButton.style.width = this.cube + "px";
        newButton.style.height = this.cube + "px";
        maindiv.appendChild(newButton);
        newButton = document.createElement('button');
        newButton.className = "bt top";
        newButton.innerHTML = '-';
        newButton.onclick = this.mClickT.bind(this);
        newButton.style.width = this.cube + "px";
        newButton.style.height = this.cube + "px";
        maindiv.appendChild(newButton);
        newButton = document.createElement('button');
        newButton.className = "bt left";
        newButton.innerHTML = '-';
        newButton.onclick = this.mClickL.bind(this);
        newButton.style.width = this.cube + "px";
        newButton.style.height = this.cube + "px";
        maindiv.appendChild(newButton);
      var body = document.querySelector("body");
      body.appendChild(workdiv);
   }

MyCube.mOwer = function () {
  var left = document.querySelector(".left");
  var top = document.querySelector(".top");
  var work = document.querySelector(".work");
  var x = event.pageX==undefined?event.pageX:event.clientX;
  var y = event.pageY==undefined?event.pageX:event.clientY;
  if (this.cols > 1)
    top.style.visibility = "visible";
  if (this.rows > 1)
    left.style.visibility = "visible";
  let str = work.style.left;
  str = str.substring(0, str.length - 2);
  x = x - Number(str) - this.cube;
  str = work.style.top;
  str = str.substring(0, str.length - 2);
  y = y - Number(str) - this.cube;
  if (y > 2)
    left.style.top = Math.floor(y / this.cube) * (this.cube)+ "px";
  if (x > 2)
    top.style.left = Math.floor(x / this.cube) * this.cube+ "px";
  if (x > (this.cols * this.cube) || y > (this.rows * this.cube) || ((x < 0) && (y < 0)))
  {
    left.style.visibility = "hidden";
    top.style.visibility = "hidden";
  }
}

MyCube.mClickR = function () {
  this.cols++;
  var work = document.querySelector(".work");
  var main = document.querySelector(".main");
  work.style.width = (this.cols + 2) * this.cube + "px";
  main.style.width = this.cols * this.cube+ "px";
  for (let i = 0; i<this.rows; i++){
     var newButton = document.createElement('button');
     newButton.className = "bt";
     newButton.style.width = this.cube + "px";
     newButton.style.height = this.cube + "px";
     main.insertBefore(newButton,main.children[0]);
   }
}

MyCube.mClickT = function() {
  this.cols--;
  var left = document.querySelector(".left");
  var top = document.querySelector(".top");
  left.style.visibility = "hidden";
  top.style.visibility = "hidden";
  var work = document.querySelector(".work");
  var main = document.querySelector(".main");
  work.style.width = (this.cols + 2)* this.cube+ "px";
  main.style.width = this.cols * this.cube+ "px";
  for (let i = 0; i < this.rows; i++)
     main.removeChild(main.children[i]);
}

MyCube.mClickB = function () {
  this.rows++;
  var work = document.querySelector(".work");
  var main = document.querySelector(".main");
  work.style.height = (this.rows + 2) * this.cube+ "px";
  main.style.height = this.rows * this.cube+ "px";
  for (let i = 0; i < this.cols; i++){
     var newButton = document.createElement('button');
     newButton.className = "bt";
     newButton.style.width = this.cube + "px";
     newButton.style.height = this.cube + "px";
     main.insertBefore(newButton,main.children[0]);
   }
}

MyCube.mClickL = function (){
  this.rows--;
  var left = document.querySelector(".left");
  var top = document.querySelector(".top");
  left.style.visibility = "hidden";
  top.style.visibility = "hidden";
  var work = document.querySelector(".work");
  var main = document.querySelector(".main");
  work.style.height = (this.rows + 2)* this.cube+ "px";
  main.style.height = this.rows * this.cube+ "px";
  for (let i = 0; i < this.cols; i++){
     main.removeChild(main.children[i]);
   }
}

// регистрируем новый элемент в браузере
  document.registerElement("mygic-cube", {
    prototype: MyCube
  });

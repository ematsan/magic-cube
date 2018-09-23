class MyCube {
  constructor(rows, cols, cube){
    this.rows = rows;
    this.cols = cols;
    this.cube = cube;
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
        newButton.className = "bt b" + i + j;
        newButton.style.width = this.cube + "px";
        newButton.style.height = this.cube + "px";
        newButton.style.top = this.cube * i + "px";
        newButton.style.left = this.cube * j + "px";
        maindiv.appendChild(newButton);
      }
      let newButton = document.createElement('button');
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
    let body = document.querySelector("body");
    body.appendChild(workdiv);
 }

   mOwer() {
      let left = document.querySelector(".left");
      let top = document.querySelector(".top");
      let work = document.querySelector(".work");
      let x = event.pageX==undefined?event.pageX:event.clientX;
      let y = event.pageY==undefined?event.pageX:event.clientY;
      let str = work.style.left;
      str = str.substring(0, str.length - 2);
      x = x - Number(str) - this.cube;
      str = work.style.top;
      str = str.substring(0, str.length - 2);
      y = y - Number(str) - this.cube;
      if ((top.style.visibility == "hidden") && (y < 0))
        return;
      if ((left.style.visibility == "hidden") && (x < 0))
        return;
      if (this.cols > 1)
        top.style.visibility = "visible";
      if (this.rows > 1)
        left.style.visibility = "visible";
      if (y > 2)
        left.style.top = Math.floor(y / this.cube) * this.cube + "px";
      if (x > 2)
        top.style.left = Math.floor(x / this.cube) * this.cube + "px";
      if (x > (this.cols * this.cube - 2) || y > (this.rows * this.cube - 2) || ((x < 0) && (y < 0)))
      {
        left.style.visibility = "hidden";
        top.style.visibility = "hidden";
      }
      }

    mClickR() {
      let work = document.querySelector(".work");
      let main = document.querySelector(".main");
      for (let i = this.rows - 1; i >= 0; i--){
         let newButton = document.createElement('button');
         newButton.className = "bt b" + i + this.cols;
         newButton.style.width = this.cube + "px";
         newButton.style.height = this.cube + "px";
         newButton.style.top = this.cube * i + "px";
         newButton.style.left = this.cube * this.cols+ "px";
         main.insertBefore(newButton,main.children[0]);
       }
       this.cols++;
       work.style.width = (this.cols + 2) * this.cube+ "px";
       main.style.width = this.cols * this.cube+ "px";
      }

    mClickT() {
      let left = document.querySelector(".left");
      let top = document.querySelector(".top");
      let work = document.querySelector(".work");
      let main = document.querySelector(".main");
      this.cols--;
      left.style.visibility = "hidden";
      top.style.visibility = "hidden";
      for (let i = this.rows - 1; i >=  0; i--){
         let str = ".b" + i + this.cols;
         let btn = main.querySelector(str);
         btn.remove();
       }
      work.style.width = (this.cols + 2)* this.cube+ "px";
      main.style.width = this.cols * this.cube+ "px";
      }

   mClickB() {
      let work = document.querySelector(".work");
      let main = document.querySelector(".main");
      for (let i = 0; i < this.cols; i++){
         let newButton = document.createElement('button');
         newButton.className = "bt b" + this.rows + i;
         newButton.style.width = this.cube + "px";
         newButton.style.height = this.cube + "px";
         newButton.style.top = this.cube * this.rows + "px";
         newButton.style.left = this.cube * i + "px";
         main.appendChild(newButton);
       }
       this.rows++;
       work.style.height = (this.rows + 2) * this.cube+ "px";
       main.style.height = this.rows * this.cube+ "px";
      }

    mClickL(){
      let left = document.querySelector(".left");
      let top = document.querySelector(".top");
      let work = document.querySelector(".work");
      let main = document.querySelector(".main");
      this.rows--;
      left.style.visibility = "hidden";
      top.style.visibility = "hidden";
      for (let i = 0; i < this.cols; i++){
         let str = ".b" + this.rows + i;
         let btn = main.querySelector(str);
         btn.remove();
       }
      work.style.height = (this.rows + 2)* this.cube+ "px";
      main.style.height = this.rows * this.cube+ "px";
      }
}

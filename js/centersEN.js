let count = 0;

let cairaInfoCentro = [
    {
        title: "Get students",
        subtitle: "We make you a setup and we decided on a strategy to get students",
        image: "assets/Recursos/+student.png"
    },{
        title: "A new channel",
        subtitle: "Create content to receive leads. Manage a new uptake channel",
        image: "assets/Recursos/conex.png"
    },{
        title: "We share the success",
        subtitle: "Our work gives its fruits. we don't win if you don't win",
        image: "assets/Recursos/Corona.png"
    }
];

const cambiarInfoCentro = () =>{
    let title = document.getElementById("in-title");
    let sub = document.getElementById("in-sub");
    let img = document.getElementById("in-img");

    let n_title = document.createTextNode(cairaInfoCentro[count].title);
    let n_sub = document.createTextNode(cairaInfoCentro[count].subtitle);
    let n_img = cairaInfoCentro[count].image;

    title.removeChild(title.firstChild);
    sub.removeChild(sub.firstChild);
    img.setAttribute("src",n_img);
    title.appendChild(n_title);
    sub.appendChild(n_sub);
}
window.onload=function(){
    let arrows3 = document.getElementsByClassName("arrow3");
  
    arrows3[0].addEventListener("click", function(){
        count--;
        if(count<0){
            count=cairaInfoCentro.length-1;
        }
        cambiarInfoCentro();
    });
    arrows3[1].addEventListener("click", function(){
        count++;
        if(count==cairaInfoCentro.length){
            count=0;
        }
        console.log(cairaInfoCentro.length)
        cambiarInfoCentro();
    });
}


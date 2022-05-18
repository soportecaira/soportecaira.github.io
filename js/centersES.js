let count = 0;

let cairaInfoCentro = [
    {
        title: "Consigue estudiantes",
        subtitle: "Hablamos contigo para crear una estrategia para conseguir estudiantes",
        image: "assets/Recursos/+student.png"
    },{
        title: "Un nuevo canal",
        subtitle: "Crea contenido para recibir leads. Gestiona un nuevo canal de captación.",
        image: "assets/Recursos/conex.png"
    },{
        title: "Compartimos los éxitos",
        subtitle: "Nuestro trabajo da sus frutos. Nosotros no ganamos si tú no ganas.",
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

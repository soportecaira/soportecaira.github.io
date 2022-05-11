let count = 0;
let count2 = 0;

let mensajes = [
    {
        message: "Aquí el estudiante escribirá lo fantastica y maravillosa que es Caira y el increible diseño de su web.",
        stars: "★★★★★",
        image: "assets/Iso gradiente.png"
    },{
        message: "Echaremos de menos la barra morada de Social Engine",
        stars: "★★★★★",
        image: "assets/Iso gradiente.png"
    },{
        message: "Vendo Opel Corsa",
        stars: "★★★★★",
        image: "assets/Iso gradiente.png"
    }
];

let cairaInfo = [
    {
        title: "Information",
        subtitle: "Discover all the avialiable options",
        image: "assets/Recursos/Informate.png"
    },{
        title: "Interact",
        subtitle: "Know the experiences of former students",
        image: "assets/Recursos/Interactua.png"
    },{
        title: "Compare",
        subtitle: "Assess the advantages and disadvantages",
        image: "assets/Recursos/Compara.png"
    },{
        title: "Hop up!",
        subtitle: "Collect all you need and go on an adventure!",
        image: "assets/Recursos/Lanzate.png"
    }
];

const cambiarInfo = () =>{
    let title = document.getElementById("in-title");
    let sub = document.getElementById("in-sub");
    let img = document.getElementById("in-img");

    let n_title = document.createTextNode(cairaInfo[count2].title);
    let n_sub = document.createTextNode(cairaInfo[count2].subtitle);
    let n_img = cairaInfo[count2].image;

    title.removeChild(title.firstChild);
    sub.removeChild(sub.firstChild);
    img.setAttribute("src",n_img);
    title.appendChild(n_title);
    sub.appendChild(n_sub);
}

const cambiarMensaje = () =>{
    let card = document.getElementsByClassName("op-card");
    let txt = document.getElementById("op-txt");
    let star = document.getElementById("op-star");
    let img = document.getElementById("op-img");

    let n_txt = document.createTextNode(mensajes[count].message);
    let n_star = document.createTextNode(mensajes[count].stars);
    let n_img = mensajes[count].image;

    for(let i=0; i<card.length; i++){

        star.removeChild(star.firstChild);
        txt.removeChild(txt.firstChild);
        img.setAttribute("src",n_img);
        star.appendChild(n_star);
        txt.appendChild(n_txt);

        card[i].style.animation = 'fadeIn 1.5s';

        setTimeout(()=>{
            card[i].style.animation = "";
        },500);
    }
}

window.onload = function(){
    /*
    //MENU HAMBURGUESA:

    let logo = document.querySelector('.container');
    let menu = document.querySelector('.menu');
    logo.addEventListener('click',function(){
        menu.classList.toggle('mobile');
        menu.classList.toggle('showmenu');  
    });

    //ENLACE LOGIN - REGISTRO :

    let goToRegister = document.getElementById("a-form1");
    let goToLogin = document.getElementById("a-form2");
    let login = document.getElementById("form-1");
    let register = document.getElementById("form-2");
    let form = document.getElementsByClassName("form")[0];

    goToRegister.addEventListener("click",function(){
        login.style.display = "none";
        register.style.display = "block";
        form.style.height = "540px";
    });
    goToLogin.addEventListener("click",function(){
        login.style.display = "block";
        register.style.display = "none";
        form.style.height = "450px";
    });
    */

    //CARRUSELES:

    let arrows = document.getElementsByClassName("arrow");
    let arrows2 = document.getElementsByClassName("arrow2");

    arrows[0].addEventListener("click", function(){
        count--;
        if(count<0){
            count=mensajes.length-1;
        }
        cambiarMensaje();
    });
    arrows[1].addEventListener("click", function(){
        count++;
        if(count==mensajes.length){
            count=0;
        }
        
        cambiarMensaje();
    });

    arrows2[0].addEventListener("click", function(){
        count2--;
        if(count2<0){
            count2=cairaInfo.length-1;
        }
        cambiarInfo();
    });
    arrows2[1].addEventListener("click", function(){
        count2++;
        if(count2==cairaInfo.length){
            count2=0;
        }
        console.log(cairaInfo.length)
        cambiarInfo();
    });
}
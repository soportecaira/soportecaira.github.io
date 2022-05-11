count=0;
let partners = [ 
    ["ada.jpg","bcas.png","isam.jpg","trepcamp.png"],
    ["4geeks.png","assembler.jpg","hult.png","ironhack.jpg"],
    ["retail.png","siena.png","sige.png","techma.png"],
    ["unavir.jpg","elingua.png","lunar.jpg","Iso gradiente.png"]
];

let enlances = [ 
    ["https://ada-school.org/","https://bcasapp.com/","https://isam.education/","https://www.trepcamp.org/"],
    ["https://4geeksacademy.com/es/inicio","https://assemblerinstitute.com/","https://www.hult.edu/","https://www.ironhack.com/en"],
    ["https://retail-institute.org/","https://www.siena.edu/programs/education/","https://www.sige.es/","https://techmabs.com/"],
    ["https://www.facebook.com/Unavir-108107404246902/","https://elingua.es/","https://lunarxy.com/",""]
];

    setInterval(function(){
        
        let part = document.getElementsByClassName("partner");
        let links = document.getElementsByClassName("link");
        for(let i=0; i<part.length; i++){
            part[i].setAttribute("src", "assets/Recursos/logos/"+partners[count][i]);
            part[i].style.animation = 'none';
            part[i].offsetHeight; 
            part[i].style.animation = null;
            links[i].setAttribute("href", enlances[count][i]);
        }

        count++;
        if(count==partners.length){
            count=0;
        }
    }, 5000);


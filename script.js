/************************************************************
 * RUTH & HERVÉ - SCRIPT MARIAGE LUXE
 ************************************************************/


/* =========================
   INVITATION PERSONNALISÉE PAR TABLE
========================= */


let guestTable = "";



/*
   Création d'un identifiant propre
   Exemple :
   "Couple: Yves Moïse Tangomo"
   devient :
   "couple-yves-moise-tangomo"
*/

function createGuestId(nom){


    return nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-|-$/g,"");


}





document.addEventListener("DOMContentLoaded", async () => {


    try {



        const response =
        await fetch("invites.json");



        const data =
        await response.json();




        const params =
        new URLSearchParams(window.location.search);



        const id =
        params.get("id");




        const guestElement =
        document.getElementById("guestName");



        const tableElement =
        document.getElementById("guestTable");



        const inputName =
        document.getElementById("name");




        let invite = null;





        /*
          Recherche automatique
          dans toutes les tables
        */


        data.tables.forEach(table => {



            table.invites.forEach(nom => {



                const identifiant =
                createGuestId(nom);




                if(identifiant === id){



                    invite = {


                        nom: nom,


                        table: table.table



                    };



                }



            });



        });






        if(invite){



            if(guestElement){


                guestElement.textContent =
                invite.nom;


            }





            if(inputName){


                inputName.value =
                invite.nom;


            }






            if(tableElement){


                tableElement.textContent =
                "Votre place : " + invite.table;


            }





            guestTable =
            invite.table;





        }else{



            if(guestElement){


                guestElement.textContent =
                "Madame / Monsieur";


            }



        }





    }catch(error){



        console.error(
            "Erreur lors du chargement de invites.json :",
            error
        );



    }



});





/* =========================
   OUVERTURE INVITATION
========================= */


const welcomeScreen =
document.getElementById("welcome-screen");



const enterBtn =
document.getElementById("enter-site");



const music =
document.getElementById("backgroundMusic");




if(enterBtn){



    enterBtn.addEventListener("click",()=>{



        if(welcomeScreen){



            welcomeScreen.style.opacity="0";



            setTimeout(()=>{



                welcomeScreen.style.display="none";



                const programme =
                document.getElementById("programme");



                if(programme){



                    programme.scrollIntoView({

                        behavior:"smooth"

                    });



                }



            },700);



        }






        if(music){



            music.volume=0.6;



            music.play().catch(()=>{});



        }






        startScrollAnimations();




    });



}/* =========================
   MUSIQUE
========================= */


const musicBtn =
document.getElementById("musicBtn");



if(music && musicBtn){



    musicBtn.addEventListener("click",()=>{



        if(music.paused){



            music.play();



            musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';



        }else{



            music.pause();



            musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';



        }



    });



}





/* =========================
   NAVIGATION
========================= */


function goPage(sectionId){



    const section =
    document.getElementById(sectionId);




    if(section){



        section.scrollIntoView({


            behavior:"smooth",


            block:"start"



        });



    }



}






/* =========================
   GALERIE PHOTO
========================= */



function openImage(img){



    const lightbox =
    document.getElementById("lightbox");



    const lightboxImg =
    document.getElementById("lightbox-img");




    if(!lightbox || !lightboxImg){

        return;

    }




    lightbox.style.display="flex";



    lightboxImg.src =
    img.src;




}






function closeImage(){



    const lightbox =
    document.getElementById("lightbox");




    if(lightbox){



        lightbox.style.display="none";



    }



}






/* =========================
   RSVP WHATSAPP
========================= */



function sendRSVP(){



    const name =
    document.getElementById("name")?.value.trim();




    const status =
    document.getElementById("status")?.value;





    if(!name){



        alert(
        "Veuillez renseigner votre nom."
        );


        return;


    }






    const phone =
    "243997681830";






    const message =

`Bonjour Ruth & Hervé ❤️


Je suis : ${name}


Ma table : ${guestTable}


Ma réponse est :

${status}


Merci beaucoup pour votre invitation.

À bientôt.`;







    const url =

    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;






    window.open(
        url,
        "_blank"
    );



}







/* =========================
   ANIMATIONS AU SCROLL
========================= */


function startScrollAnimations(){



    const sections =
    document.querySelectorAll("section");





    const observer =

    new IntersectionObserver((entries)=>{



        entries.forEach(entry=>{



            if(entry.isIntersecting){



                entry.target.classList.add("show");



            }



        });



    },{


        threshold:0.15


    });






    sections.forEach(section=>{



        section.classList.add("hidden");



        observer.observe(section);



    });




}/* =========================
   PÉTALES QUI TOMBENT
========================= */


function createPetal(){



    const petal =
    document.createElement("div");




    petal.classList.add("petal");





    petal.style.left =

    Math.random() * window.innerWidth + "px";





    petal.style.animationDuration =

    (Math.random()*3 + 2) + "s";





    document.body.appendChild(petal);






    setTimeout(()=>{


        petal.remove();



    },5000);




}





setInterval(createPetal,400);








/* =========================
   TÉLÉCHARGEMENT INVITATION PDF
========================= */


function downloadInvitation(){



    const link =
    document.createElement("a");





    link.href =

    "documents/Invitation_Ruth_Herve.pdf";





    link.download =

    "Invitation_Ruth_Herve.pdf";





    document.body.appendChild(link);





    link.click();





    document.body.removeChild(link);



}







/* =========================
   FERMETURE LIGHTBOX AU CLIC
========================= */


document.addEventListener("click",(event)=>{



    const lightbox =
    document.getElementById("lightbox");



    if(
        lightbox &&
        event.target === lightbox
    ){



        closeImage();



    }



});







/* =========================
   PROTECTION CONTRE ERREURS
========================= */


window.addEventListener(
"error",
function(event){


    console.error(
        "Erreur JavaScript : ",
        event.message
    );


});
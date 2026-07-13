const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});
const modal = document.getElementById("projectModal");

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalDesc = document.getElementById("modalDesc");

const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".detail-btn").forEach(button=>{

button.addEventListener("click",(e)=>{

e.preventDefault();

modal.style.display="flex";

modalTitle.innerHTML=button.dataset.title;

modalImage.src=button.dataset.image;

modalDesc.innerHTML=button.dataset.description;

});

});

closeModal.onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target==modal){

modal.style.display="none";

}

}
const filterButtons=document.querySelectorAll(".filter-btn");

const projectCards=document.querySelectorAll(".project-card");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const filter=button.dataset.filter;

projectCards.forEach(card=>{

if(filter==="all"){

card.style.display="block";

}else{

if(card.classList.contains(filter)){

card.style.display="block";

}else{

card.style.display="none";

}

}

});

});

});
/* ==========================================
        GALLERY LIGHTBOX
========================================== */

const lightbox=document.querySelector(".lightbox");

const lightboxImage=document.getElementById("lightboxImage");

const closeLightbox=document.querySelector(".close-lightbox");

document.querySelectorAll(".gallery-item").forEach(image=>{

image.addEventListener("click",()=>{

lightbox.style.display="flex";

lightboxImage.src=image.src;

});

});

closeLightbox.onclick=()=>{

lightbox.style.display="none";

}

lightbox.onclick=(e)=>{

if(e.target==lightbox){

lightbox.style.display="none";

}

}
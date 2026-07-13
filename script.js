/* ==========================================
        LOADING SCREEN
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

    loader.style.transition = "0.6s";

});

/* ==========================================
        SCROLL TO TOP
========================================== */

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        scrollBtn.style.display = "flex";

    }else{

        scrollBtn.style.display = "none";

    }

});

scrollBtn.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* ==========================================
        MOBILE MENU
========================================== */

const menuBtn = document.querySelector(".menu-btn");

const nav = document.querySelector(".navbar nav");

menuBtn.onclick = () =>{

    nav.classList.toggle("active");

};

/* ==========================================
        CLOSE MENU
========================================== */

document.querySelectorAll(".navbar nav a").forEach(link=>{

    link.onclick=()=>{

        nav.classList.remove("active");

    }

});

/* ==========================================
        ACTIVE MENU
========================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=window.scrollY;

const offset=section.offsetTop-120;

const height=section.offsetHeight;

if(top>=offset){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ==========================================
        SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

/* ==========================================
        FADE UP ANIMATION
========================================== */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(sec=>{

sec.classList.add("fade-up");

observer.observe(sec);

});

/* ==========================================
        COUNTER
========================================== */

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

counter.innerText="0";

const update=()=>{

const target=+counter.dataset.target;

const value=+counter.innerText;

const speed=40;

const inc=target/speed;

if(value<target){

counter.innerText=Math.ceil(value+inc);

setTimeout(update,20);

}else{

counter.innerText=target;

}

}

update();

});
/* ==========================================
        CURSOR GLOW
========================================== */

const cursor=document.getElementById("cursorGlow");

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});/* ==========================================
        SCROLL PROGRESS
========================================== */

const progressBar=document.getElementById("progressBar");

window.addEventListener("scroll",()=>{

const total=document.documentElement.scrollHeight-window.innerHeight;

const progress=(window.scrollY/total)*100;

progressBar.style.width=progress+"%";

});
/* ==========================================
        BOTTOM NAVIGATION
========================================== */

const bottomLinks=document.querySelectorAll(".bottom-nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=window.scrollY;

const offset=section.offsetTop-120;

const height=section.offsetHeight;

if(top>=offset){

current=section.id;

}

});

bottomLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});
/* =====================================
        PARTICLES
===================================== */

const canvas = document.getElementById("particles");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

const particles=[];

for(let i=0;i<80;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+1,

dx:(Math.random()-0.5)*0.5,

dy:(Math.random()-0.5)*0.5

});

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fillStyle="rgba(56,189,248,.7)";

ctx.fill();

p.x+=p.dx;

p.y+=p.dy;

if(p.x<0||p.x>canvas.width)p.dx*=-1;

if(p.y<0||p.y>canvas.height)p.dy*=-1;

});

requestAnimationFrame(animateParticles);

}

animateParticles();

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

});
/* =====================================
        SKILL BAR
===================================== */

const progress=document.querySelectorAll(".progress-bar");

const skillObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.width=

entry.target.textContent.trim();

}

});

});

progress.forEach(bar=>{

skillObserver.observe(bar);

});
document.querySelectorAll(".btn-primary").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const d=Math.max(this.clientWidth,this.clientHeight);

circle.style.width=d+"px";

circle.style.height=d+"px";

circle.style.left=e.offsetX-d/2+"px";

circle.style.top=e.offsetY-d/2+"px";

this.appendChild(circle);

setTimeout(()=>circle.remove(),700);

});

});
/*=========================================
            DARK MODE
=========================================*/

const themeButton=document.querySelector(".theme-toggle");

themeButton.addEventListener("click",()=>{

document.body.classList.toggle("light");

const icon=themeButton.querySelector("i");

if(document.body.classList.contains("light")){

icon.className="fa-solid fa-sun";

}else{

icon.className="fa-solid fa-moon";

}

});
/*=========================================
            SAVE THEME
=========================================*/

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="light"){

document.body.classList.add("light");

document.querySelector(".theme-toggle i").className="fa-solid fa-sun";

}

themeButton.addEventListener("click",()=>{

localStorage.setItem(

"theme",

document.body.classList.contains("light")

? "light"

: "dark"

);

});
/*=========================================
        THEME COLOR
=========================================*/

document.querySelectorAll(".theme-color").forEach(color=>{

color.onclick=()=>{

const value=color.dataset.color;

document.documentElement.style.setProperty("--primary",value);

localStorage.setItem("themeColor",value);

}

});

const savedColor=localStorage.getItem("themeColor");

if(savedColor){

document.documentElement.style.setProperty("--primary",savedColor);

}
const reveals=document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{

reveals.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<window.innerHeight-120){

item.classList.add("active");

}

});

});
if("serviceWorker" in navigator){

navigator.serviceWorker.register("sw.js");

}
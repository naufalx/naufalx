const words = [

    "Embedded System Engineer",

    "Robot Developer",

    "IoT Developer",

    "ESP32 Programmer",

    "Electronics Engineer"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.querySelector(".hero h3");

function typingEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent = currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typingEffect, 1500);

            return;

        }

    } else {

        typingElement.textContent = currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length)

                wordIndex = 0;

        }

    }

    setTimeout(typingEffect, deleting ? 40 : 90);

}

typingEffect();
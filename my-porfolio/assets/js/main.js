document.addEventListener('DOMContentLoaded', () => {
    const showMore1 = document.getElementById('showMore1');
    const showMore2 = document.getElementById('showMore2');
    const showMore3 = document.getElementById('showMore3');
    const showMore4 = document.getElementById('showMore4');
    const showMore5 = document.getElementById('showMore5');
    const showMore6 = document.getElementById('showMore6');
    const showMore7 = document.getElementById('showMore7');
    const showMore8 = document.getElementById('showMore8');
    const showMore9 = document.getElementById('showMore9');
    const hiddenElement1 = document.getElementById('hiddenElement1');
    const hiddenElement2 = document.getElementById('hiddenElement2');
    const hiddenElement3 = document.getElementById('hiddenElement3');
    const hiddenElement4 = document.getElementById('hiddenElement4');
    const hiddenElement5 = document.getElementById('hiddenElement5');
    const hiddenElement6 = document.getElementById('hiddenElement6');
    const hiddenElement7 = document.getElementById('hiddenElement7');
    const hiddenElement8 = document.getElementById('hiddenElement8');
    const hiddenElement9 = document.getElementById('hiddenElement9');
    
    const i = document.getElementById('i');
    const down = document.getElementById('down');
    const aboutMe = document.getElementById('aboutMe');
    const header = document.getElementById('header');
    const hidden = document.getElementById('hidden1');
    const hidden2 = document.getElementById('hidden2');
    const hidden3 = document.getElementById('hidden3');
    const hidden4 = document.getElementById('hidden4');
    const hidden5 = document.getElementById('hidden5');
    const hidden6 = document.getElementById('hidden6');
    const hidden7 = document.getElementById('hidden7');
    const hidden8 = document.getElementById('hidden8');
    const hidden9 = document.getElementById('hidden9');

    const showMoreButtons = [showMore1, showMore2, showMore3, showMore4, showMore5, showMore6, showMore7, showMore8, showMore9];
    const hiddenElements = [hiddenElement1, hiddenElement2, hiddenElement3, hiddenElement4, hiddenElement5, hiddenElement6, hiddenElement7, hiddenElement8, hiddenElement9];
    const hiddenElements2 = [hidden, hidden2, hidden3, hidden4, hidden5, hidden6, hidden7, hidden8, hidden9];

    hiddenElements2.forEach((button2, index) => {
        if (button2 && hiddenElements[index]) {
            button2.addEventListener('click', () => {
                hiddenElements.forEach((element, i) => {
                    if (i === index) {
                        element.style.display = 'none';
                    }
                });
            });
        }
    });
    showMoreButtons.forEach((button, index) => {
        if (button && hiddenElements[index]) {
            button.addEventListener('click', () => {
                hiddenElements.forEach((element, i) => {
                    if (i === index) {
                        element.style.display = 'block';
                    } else {
                        element.style.display = 'none';
                    }
                });
            });
        }
    });

    let lastScrollY = window.scrollY;
    document.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            header.style.transform = 'translateY(-15vh)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
    });
    const button_up = document.getElementById('button_up')
    document.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            button_up.style.opacity = '1'
        } else {
            button_up.style.opacity = '0'
        }
    });
    document.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.style.position = 'fixed';
        } else {
            header.style.position = 'absolute';
        }
    });
    const contact = document.getElementById('contact')
    const contactA = contact.getBoundingClientRect().top  - 450; 
    document.addEventListener('scroll', () => {
        if (window.scrollY > contactA) {
            button_up.style.backgroundColor = '#363338';
            button_up.style.color = '#2082e3';
            button_up.style.border = '2px solid #363338';
        } else {
            button_up.style.backgroundColor = '#2082e3';
            button_up.style.color = '#363338';
            button_up.style.border = '2px solid #2082e3';
        }
    });

    setTimeout(() => {
        i.style.transform = 'translateY(0)';
        down.style.transform = 'translateY(0)';
    }, 300);
    setTimeout(() => {
        i.style.opacity = 0.25;
        down.style.opacity = 0.25;
    }, 500);
    setTimeout(() => {
        i.style.opacity = 0.5;
        down.style.opacity = 0.5;
    }, 700);
    setTimeout(() => {
        i.style.opacity = 0.75;
        down.style.opacity = 0.75;
    }, 900);
    setTimeout(() => {
        i.style.opacity = 1;
        down.style.opacity = 1;
    }, 1100);
    setTimeout(() => {
        aboutMe.style.transform = 'translateY(0)';
    }, 1300);
    setTimeout(() => {
        aboutMe.style.opacity = 1;
    }, 1300);
});

// Efecto maquina de escribir
const text = `if (sad() === true) { 
    sad().stop(); 
    beAwesome(); 
}   `;
let index = 0;
function type() {
        if (index < text.length) {
            setTimeout(type, 200);
            document.getElementById('typing').innerHTML += text.charAt(index);
            index++;
            if (index === text.length) {
                document.getElementById('typing').innerHTML = '';
                index = 0;
            }
        }
}
const text2 = '.......................................................................................................................................................'
let index2 = 0
function type2() {
    if (index2 < text2.length) {
        document.getElementById('run').innerHTML += text2.charAt(index);
        index2++;
        setTimeout(type2, 100)
        if (index2 + 1 === text2.length) {
            document.getElementById('run').innerHTML = '';
            index2 = 0;
        }
    } 
}
window.onload = () => {
    setTimeout(type, 2500);
    setTimeout(type2, 1000);
};
document.addEventListener('DOMContentLoaded', () => {
    const showMoreButtons = [];
    const hiddenElements = [];
    const hiddenElements2 = [];

    for (let i = 1; i <= 18; i++) {
        showMoreButtons.push(document.getElementById(`showMore${i}`));
        hiddenElements.push(document.getElementById(`hiddenElement${i}`));
        hiddenElements2.push(document.getElementById(`hidden${i}`));
    }

    const closeElement = (element) => {
        element.style.transition = 'left 0.5s ease';
        element.style.left = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
            element.style.transition = '';
            element.style.left = '';
        }, 500);
    };

    hiddenElements2.forEach((button2, index) => {
        if (button2 && hiddenElements[index]) {
            button2.addEventListener('click', (e) => {
                e.stopPropagation();
                closeElement(hiddenElements[index]);
            });
        }
    });

    showMoreButtons.forEach((button, index) => {
        if (button && hiddenElements[index]) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                hiddenElements.forEach((element, i) => {
                    if (i === index) {
                        if (element.style.display === 'block') {
                            closeElement(element);
                        } else {
                            element.style.display = 'block';
                            element.style.transition = 'none';
                            element.style.left = '0';

                            const container = element.offsetParent || document.body;
                            const elementHeight = element.offsetHeight;
                            const containerHeight = container.clientHeight;
                            let topPosition = button.offsetTop;

                            if (topPosition + elementHeight > containerHeight) {
                                topPosition = containerHeight - elementHeight - (containerHeight * 0.05);
                            }

                            element.style.top = `${topPosition}px`;

                            setTimeout(() => {
                                element.style.transition = 'left 0.5s ease';
                                element.style.left = '-65%';
                            }, 10);
                        }
                    } else {
                        element.style.display = 'none';
                        element.style.left = '';
                        element.style.transition = '';
                    }
                });
            });
        }
    });

    document.addEventListener('click', (event) => {
        hiddenElements.forEach((element, index) => {
            if (element.style.display === 'block') {
                const isClickInsideElement = element.contains(event.target);
                const isClickOnButton = showMoreButtons[index].contains(event.target);
                if (!isClickInsideElement && !isClickOnButton) {
                    closeElement(element);
                }
            }
        });
    });

    let lastScrollY = window.scrollY;
    const header = document.getElementById('header');
    document.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            header.style.transform = 'translateY(-15vh)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
    });

    const button_up = document.getElementById('button_up');
    const contact = document.getElementById('contact');

    document.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        if (scrollPos > 100) {
            button_up.style.opacity = '1';
        } else {
            button_up.style.opacity = '0';
        }

        if (scrollPos > 0) {
            header.style.position = 'fixed';
        } else {
            header.style.position = 'absolute';
        }

        const contactTop = contact.offsetTop - 700;
        const contactBottom = contact.offsetTop + contact.offsetHeight;

        if (scrollPos > contactTop && scrollPos < contactBottom) {
            button_up.style.backgroundColor = '#363338';
            button_up.style.color = '#2082e3';
            button_up.style.border = '2px solid #363338';
        } else {
            button_up.style.backgroundColor = '#2082e3';
            button_up.style.color = '#363338';
            button_up.style.border = '2px solid #2082e3';
        }
    });

    const i = document.getElementById('i');
    const down = document.getElementById('down');
    const aboutMe = document.getElementById('aboutMe');
    
    if (i && down && aboutMe) {
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
    }

    const cv = document.getElementById('cv');
    if (cv) {
        cv.addEventListener('click', () => {
        });
    }

    const menu = document.getElementById('menu');
    const menuNavegacion = document.getElementById('menuNavegacion');
    
    if (menu && menuNavegacion) {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
            if (menuNavegacion.style.display === 'block') {
                menuNavegacion.style.display = 'none';
            } else {
                menuNavegacion.style.display = 'block';
            }
        });
        
        window.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuNavegacion.contains(e.target)) {
                menuNavegacion.style.display = 'none';
            }
        });
    }
});

const text = `if (sad() === true) { 
    sad().stop(); 
    beAwesome(); 
}   `;
let index = 0;
function type() {
    if (index < text.length) {
        document.getElementById('typing').innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 200);
    } else {
        setTimeout(() => {
            document.getElementById('typing').innerHTML = '';
            index = 0;
            setTimeout(type, 1000);
        }, 2000);
    }
}

let text2 = "";

function checkScreenSize() {
    if (window.innerWidth < 768) {
        text2 = ".".repeat(30);
    } else if (window.innerWidth < 1024) {
        text2 = ".".repeat(35);
    } else {
        text2 = ".".repeat(148);
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

let index2 = 0;
function type2() {
    if (index2 < text2.length) {
        document.getElementById('run').innerHTML += text2.charAt(index2);
        index2++;
        setTimeout(type2, 100);
    } else {
        setTimeout(() => {
            document.getElementById('run').innerHTML = '';
            index2 = 0;
            setTimeout(type2, 1000);
        }, 1000);
    }
}

window.onload = () => {
    setTimeout(type, 2500);
    setTimeout(type2, 1000);
};
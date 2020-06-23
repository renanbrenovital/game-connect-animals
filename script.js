const playAudio = archive => {
    const audio = new Audio(`/sounds/${archive}.mp3`);
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => audio.pause(), 4000);
};

const confetti = () => {
    let confetti = document.querySelectorAll('.confetti');

    function randomNumber(min, max) { 
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    confetti.forEach(el => {
     let titleWidth = el.offsetWidth;
     let totalConfetti = Math.floor(titleWidth / 10);
     
     for(var i = 0; i <= totalConfetti; i++) {
      let confetto = "<i style='transform: translate3d(" + (randomNumber(1, 500) - 250) + "px, " + (randomNumber(1, 200) - 150) + "px, 0) rotate(" + randomNumber(1, 360) + "deg); background: hsla(" + randomNumber(1, 360) +", 100%, 50%, 1);'></i>"
      el.insertAdjacentHTML("beforeend", confetto);
     }
    });
}

const isDropImg = event => {
    const split = event.target.id.split('_');
    return event.target.tagName === 'IMG' && split[1] === 'drop';
}

const onDragStart = event => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.style.opacity = 0;
}

const onDragOver = event => {
    event.preventDefault();
}

const onDragEnter = event => { 
    if(isDropImg(event)) {
        event.target.style.background = '#EBAF4B';
    }        
}

const onDragLeave = event => {
    if(isDropImg(event)) {
        event.target.style.background = 'transparent';
    }        
}

let winCount = 0;

const onDrop = event => {
    const id = event.dataTransfer.getData('text');
    const elementDrag = document.getElementById(id);
    const elementDrop = document.getElementById(event.target.id);
    
    if(isDropImg(event)) {
        event.target.style.background = 'transparent';
    }

    if(id + '_drop' === event.target.id) {
        playAudio(id);
        elementDrop.src = `images/${id}.svg`;
        elementDrop.classList.add('animal-scale');
        setTimeout(() => elementDrop.classList.remove('animal-scale'), 1000);
        elementDrag.style.display = 'none';
        winCount++;
        if(winCount === 4) {
            setTimeout(() => { 
                document.getElementById('drag').style.display = 'none';
                document.getElementById('win').style.display = 'inline';
                confetti();
                playAudio('victory');
            }, 2000);
        }
    }
    else {
        playAudio('fail');
        elementDrag.style.opacity = 1;
    }  

    event.dataTransfer.clearData();
}


function registerEventListeners() {
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('dragover', onDragOver);
    document.addEventListener('dragenter', onDragEnter);
    document.addEventListener('dragleave', onDragLeave);
    document.addEventListener('drop', onDrop);
}

window.addEventListener('load', registerEventListeners);
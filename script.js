const playAudio = archive => new Audio(`/sounds/${archive}.mp3`).play();

const isDropImg = event => {
    const split = event.target.id.split('_');
    return event.target.tagName === 'IMG' && split[1] === 'drop';
}

const onDragStart = event => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.style.opacity = 0.2;
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

const onDrop = event => {
    const id = event.dataTransfer.getData('text');
    
    if(isDropImg(event)) {
        event.target.style.background = 'transparent';
    }

    if(id + '_drop' === event.target.id) {
        playAudio(id);
        event.target.src = `images/${id}.svg`;
    }
    else {
        playAudio('fail');
        document.getElementById(id).style.opacity = 1;
    }
    

    event.dataTransfer.clearData();
}

document.addEventListener('dragstart', onDragStart);
document.addEventListener('dragover', onDragOver);
document.addEventListener('dragenter', onDragEnter);
document.addEventListener('dragleave', onDragLeave);
document.addEventListener('drop', onDrop);
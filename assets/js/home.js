$('.contact-list').on('click', e => {
    if(e.target.tagName == 'BUTTON'){
        e.target.parentNode.remove();
    }
});
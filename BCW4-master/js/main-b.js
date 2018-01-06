'use strict';
// Create function 'showImages' which
// loads images.json which has links to images as an array.

// create a loop which builds the following HTML from every image in the array:
/*
 <li>
 <figure>
 <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
 <figcaption>
 <h3>Title</h3>
 </figcaption>
 </figure>
 </li>
 */
// After the loop print the HTML into <ul> element using innerHTML
let modalShowing = false;
const showImages = () => {
    const ul = document.querySelector('ul');

    fetch('images.json').then((response) => {
        return response.json();
    }).then((json) => {
        let html = '';
        json.forEach((image) => {
            html +=
                `<li>
          <figure>
            <a href="img/original/${image.mediaUrl}"><img src="img/thumbs/${image.mediaThumb}"></a>
            <figcaption>
                <h3>${image.mediaTitle}</h3>
            </figcaption>
          </figure>
        </li>`;
        });
        ul.innerHTML = html;
        setupModalFunctionality();
    });
};

showImages();

//Event listener setup for showing the modal window
const setupModalFunctionality = () => {
    let links = document.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', (evt) => {
            console.log('clicked ' + evt.target.parentElement);
            evt.preventDefault();

            const modalDiv = document.querySelector('#modal');
            const modalImg = modalDiv.querySelector('img');

            modalImg.setAttribute('src', evt.target.parentElement.getAttribute('href'));
            modalDiv.classList.replace('hidden', 'lightbox');
            modalShowing = true;
            toggleBG();
        });
    });

    //Event listener for checking when the user clicks outside the modal
    document.addEventListener('click', (evt) => {

        if(evt.target.tagName != 'IMG' &&
            evt.target.parentElement.getAttribute('id') != 'modal' && modalShowing) {

            let modalDiv = document.querySelector('#modal');
            modalDiv.classList.replace('lightbox', 'hidden');
            modalShowing = false;
            toggleBG();
        }
    });
};

//Toggles the background dimming when modal window is showing
const toggleBG = () => {
    const backgroundDiv = document.querySelector('#dimmingDiv');
    if(modalShowing) {
        backgroundDiv.classList.add('dimming');
    } else {
        backgroundDiv.classList.remove('dimming');
    }
};
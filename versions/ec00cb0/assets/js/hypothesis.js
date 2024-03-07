// only add hypothesis once the page loads 
// because it's ridiculously laggy

// copying https://stackoverflow.com/a/61511955/13113166
// to style after hypothesis loaded

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

window.hypothesisConfig = function() {
    return {
        branding: {
            appBackgroundColor: 'transparent'
        },
        enableExperimentalNewNoteButton: true
    }
}


function style_hypothesis(){
    let style = document.createElement('style');
    style.textContent = `
        .bg-grey-2 {
          background-color: transparent !important;
        }
        
        button.focus-visible-ring:nth-child(2) {
            display: none;
        }

    `

    waitForElement('hypothesis-sidebar')
      .then((element) => {
        element.shadowRoot.appendChild(style);
      })
}


function load_hypothesis(){
    console.log('loading hypothesis')
    let footer = document.getElementById('footer');
    let script = document.createElement('script');
    script.type = 'text/javascript'
    script.async = true;
    script.onload = style_hypothesis;
    script.src = "https://hypothes.is/embed.js";
    footer.appendChild(script);

}

window.addEventListener('load', (event) => {
    load_hypothesis();
})

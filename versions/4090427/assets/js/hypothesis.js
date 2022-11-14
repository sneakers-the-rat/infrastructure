window.hypothesisConfig = function() {
    return {
        branding: {
            appBackgroundColor: 'transparent'
        }
    }
}

window.onload = function() {
    let style = document.createElement('style');
    style.textContent = `
        .bg-grey-2 {
          background-color: transparent !important;
        }
    `

    let container = document.getElementsByTagName("hypothesis-sidebar")[0];
    container.shadowRoot.appendChild(style);
}
let ztop = 0
let prev_window_bar = null

class OldWin extends HTMLElement {

    constructor() {
        super();
        this.classList.add("window", "draggable");
        this.style.margin = "32px";
        this.style.overflow = "auto";

        const body = document.createElement("div");
        body.classList.add("window-body");
        body.innerHTML = this.innerHTML;
        this.innerHTML = null;

        const bar = document.createElement("div");
        bar.classList.add("title-bar", "inactive");

        const title = document.createElement("div");
        title.classList.add("title-bar-text");
        title.innerText = this.title;
        bar.append(title);

        bar.innerHTML += "<div class=\"title-bar-controls\">\n" +
            "               <button aria-label=\"Minimize\"></button>\n" +
            "               <button aria-label=\"Maximize\"></button>\n" +
            "               <button aria-label=\"Close\"></button>\n" +
            "             </div>";

        this.append(bar);
        this.append(body);

        this.onmousedown = () => {this.select()};
    }

    select() {
        this.style.zIndex = ++ztop

        let bar = this.querySelector(".title-bar");
        bar.classList.remove("inactive");
        if (prev_window_bar != null && prev_window_bar !== bar) prev_window_bar.classList.add("inactive");
        prev_window_bar = bar;
    }
}

function dragMoveListener(event) {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

interact('.draggable')
    .draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        listeners: {
            move: dragMoveListener
        }
    })

customElements.define( 'old-win', OldWin );

// Deselect all windows if background is clicked
document.body.addEventListener("mousedown", function(e) {
    if(e.target !== e.currentTarget) return;
    if (prev_window_bar != null) prev_window_bar.classList.add("inactive");
    prev_window_bar = null
})
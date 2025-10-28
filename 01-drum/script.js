const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal')

openModal.addEventListener("click", () => {
    modal.style.display = "flex";
})


closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});


window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


// play audio when prssing key

function playSound (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play()
    
    const drumPart = document.querySelector(`.drum-part[data-key="${e.keyCode}"]`);
    if (drumPart) {
        drumPart.classList.add("active");
        
        setTimeout(() => drumPart.classList.remove("active"), 200);
    }
}

// drum highlight

document.addEventListener("DOMContentLoaded", () => {
    const drumContainer = document.getElementById('drum-container')

    // Define drum parts with positions
    const drumPart = [
        { id: "hihat", key: 74, shape: "poly", coords: [63, 183, 25, 201, 66, 210, 128, 206] },
        { id: "open-hat", key: 75, shape: "poly", coords: [350, 168, 294, 192, 305, 196, 401, 186] },
        { id: "tom-toms1", key: 76, shape: "rect", coords: [109,253,309,329] },
        { id: "kick-drum", key: 70, shape: "circle", coords: [217, 426, 101] },
        { id: "snare-drum", key: 83, shape: "rect", coords: [210,308,324,359] },
        { id: "ride-cymbal", key: 68, shape: "poly", coords: [320, 258, 370, 244, 413, 260, 369, 263] }
    ];


    drumPart.forEach(drum => {
        const drumDiv = document.createElement("div");
        drumDiv.classList.add("drum-part");
        drumDiv.dataset.key = drum.key
        drumDiv.title = drum.id
    
        // apply div based on coords size
    
        if (drum.shape === "rect") {
            const [x1, y1, x2, y2] = drum.coords;
            drumDiv.style.left = `${x1}px`
            drumDiv.style.top = `${y1}px`
            drumDiv.style.width = `${x2-x1}px`
            drumDiv.style.height = `${y2-y1}px`
        } 
        else if (drum.shape === "circle"){
            const [x, y, r] = drum.coords;
            drumDiv.style.left = `${x - r}px`
            drumDiv.style.top = `${y - r}px`
            drumDiv.style.width = `${2 * r}px`
            drumDiv.style.height = `${2 * r}px`
            drumDiv.style.borderRadius = "50%"
        }
        else if (drum.shape === "poly"){
    
            // loop over the coords to get x and y
            let x = [];
            let y = [];
    
            for (let i = 0; i < drum.coords.length; i += 2) {
                x.push(drum.coords[i]);
                y.push(drum.coords[i + 1])
            }
            
            // find smallest values
            const xMin = Math.min(...x);
            const xMax = Math.max(...x);
            const yMin = Math.min(...y);
            const yMax = Math.max(...y);
    
            drumDiv.style.left = `${xMin}px`;
            drumDiv.style.top = `${yMin}px`;
            drumDiv.style.width = `${xMax - xMin}px`;
            drumDiv.style.height = `${yMax - yMin}px`;
        }
    
        drumContainer.appendChild(drumDiv);
    })

})


window.addEventListener("keydown", playSound);
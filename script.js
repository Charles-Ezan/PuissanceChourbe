const CellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')

CellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once : true})
})

function handleClick(e) {
    const cell = e.target
    cell.classList.add('red')
    console.log('click' + cell)
}

function setCheckers(cell, color) {
    board.classList.add(YELLOW_CLASS)
}

function returnCellValue(){
    cell.classList.add('red')
}
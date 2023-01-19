import MakeImageModule from "../../main/builders/make-image-module"

console.log('[ Image Tracker script ]...')

const builder = MakeImageModule()

window.addEventListener('load', () => {
    builder.getAllInDocument()
})

window.addEventListener('wheel', () => {
    builder.getAllInDocument()
})

window.addEventListener('mousemove', () => {
    builder.getAllInDocument()
})

window.addEventListener('click', () => {
    builder.getAllInDocument()
})

const get = () => {
    builder.getAllInDocument()
    setTimeout(get, 100)
}

get()
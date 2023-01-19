const OpenWindowPopup = (url : string) => {
    return {
        right() {
            window.open(url, 'popup', `width=600, height=${window.innerHeight}, top=0, left=${window.innerWidth}` )
        },
        left() {
            window.open(url, 'popup', `width=600, height=${window.innerHeight}, top=0, left=0` )
        }
    }
}

export default OpenWindowPopup
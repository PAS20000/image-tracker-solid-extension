export default class OnMessageError extends Error {
    constructor(e : string) {
        super('OnMessageError')
        this.message = e
    }
}
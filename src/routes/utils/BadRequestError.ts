export class BadRequestError extends Error {
    public readonly status: number

    constructor(message: string) {
        super(message)
        this.name = 'BadRequestError'
        this.status = 400
    }
}

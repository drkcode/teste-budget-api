export class ResourceNotFoundError extends Error {
    constructor(public status: string, message: string) {
        super(message);
    }
}

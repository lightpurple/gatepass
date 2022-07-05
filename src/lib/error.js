import cleanStack from 'clean-stack'

export class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

export function parseError(error) {
    return `\ncode: ${error.code}\nmessage: ${error.message}\nstack: ${cleanStack(error.stack)}`;
}

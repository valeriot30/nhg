export default class Logger
{
    private prefix: String

    constructor() {
        console.clear()
        this.prefix = ''
    }

    setPrefix(prefix: String) {
        this.prefix = prefix
    }

    log(message: string, ...optionalParams: any[]) {
        console.log(this.prefix.concat(message), ...optionalParams)
    }

    debug(message: string, ...optionalParams: any[]) {
        this.log("%c[DEBUG] %c" + message, "color: teal;", "color: #777;", ...optionalParams)
    }

    info(message: string, ...optionalParams: any[]) {
        console.info("%c[INFO] %c" + message, "color: blue;", "color: #777;", ...optionalParams)
    }

    error(message: string, ...optionalParams: any[]) {
        console.error("%c[ERROR] %c" + message, "color: red;", "color: #777;", ...optionalParams)
    }

    warning(message: string, ...optionalParams: any[]) {
        console.warn("%c[WARNING] %c" + message, "color: #ff6200;", "color: #777;", ...optionalParams)
    }
}
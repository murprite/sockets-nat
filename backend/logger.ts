export default class Logger {

    error(endpoint: string, msg: string) {
        this.log(endpoint, msg, "color: red");
    }

    debug(endpoint: string, msg: string) {
        this.log(endpoint, msg, "color: blue");
    }

    info(endpoint: string, msg: string) {
        this.log(endpoint, msg, "color: blue");
    }

    warning(endpoint: string, msg: string) {
        this.log(endpoint, msg, "color: orange");
    }

    private log(endpoint: string, msg: string, css: string) {
        return console.log(`[%c${endpoint}] %c${msg}`, css, "color: gray");
    }
}
const COLORS = {
    gray: "\x1b[100m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    green: "\x1b[42m",
}

export default class Logger {
    error(endpoint: string, msg: string) {
        this.log(endpoint, msg, COLORS.red);
    }

    debug(endpoint: string, msg: string) {
        this.log(endpoint, msg, COLORS.blue);
    }

    info(endpoint: string, msg: string) {
        this.log(endpoint, msg, COLORS.blue);
    }

    warning(endpoint: string, msg: string) {
        this.log(endpoint, msg, COLORS.green);
    }

    private log(endpoint: string, msg: string, colorCode: string) {
        return console.log(`[\x1b[100m${endpoint}\x1b[0m]`, `${colorCode}${msg}\x1b[0m`);
    }
}
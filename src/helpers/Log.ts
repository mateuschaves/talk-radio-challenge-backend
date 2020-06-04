import signale from 'signale';

class Log {

    public info(message: string) {
        return signale.info(`[${new Date()}] ${message}`);
    }

    public error(message: string) {
        return signale.error(`[${new Date()}] ${message}`);
    }

    public warn(message: string) {
        return signale.warn(`[${new Date()}] ${message}`);
    }
}

export default new Log();
class Logger {
    public error(error: Error | string) {
        console.log(
            '%c Error ',
            'background: red; border-radius: 12px; padding: 4px; color: white; font-weight: 900',
            '\n',
            error
        );
    }

    public info(...args: any) {
        console.log(
            '%c INFO ',
            'background: blue; border-radius: 12px; padding: 4px; color: white; font-weight: 900',
            '\n',
            ...args
        );
    }

    public request(url: string, ...args: any) {
        console.log(
            '%c REQUEST ',
            'background: green; border-radius: 12px; padding: 4px; color: white; font-weight: 900',
            '\n',
            `url: ${url}`,
            '\n',
            ...args
        );
    }

    public response(url: string, ...args: any) {
        console.log(
            '%c RESPONSE ',
            'background: black; border-radius: 12px; padding: 4px; color: white; font-weight: 900',
            '\n',
            `url: ${url}`,
            '\n',
            ...args
        );
    }

    public msg(...args: any) {
        console.log(
            '%c WS MSG ',
            'background: black; border-radius: 12px; padding: 4px; color: white; font-weight: 900',
            '\n',
            ...args
        );
    }

    public warn(...args: any) {
        console.warn(
            '%c WARNING ',
            'background: orange; border-radius: 12px; padding: 4px; color: white; font-weight: 900',
            '\n',
            ...args
        );
    }
}

export default new Logger();

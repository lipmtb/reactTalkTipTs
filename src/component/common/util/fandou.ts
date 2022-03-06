
export default (fn: Function, delay: number) => {


    let timer: NodeJS.Timeout | null = null;
    return (...args: unknown[]) => {

        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(null, args);

        }, delay)


    }

}
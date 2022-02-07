

export const deepClone: (tar: unknown) => unknown = (tar: unknown) => {

    if (Array.isArray(tar)) {
        const newArr = [];
        for (let item of tar) {
            newArr.push(deepClone(item));
        }
        return newArr;
    } else if (tar instanceof Object) {
        const newObj: { [props: string]: unknown } = {};
        for (let prop in (tar as { [props: string]: unknown })) {
            newObj[prop] = deepClone((tar as { [props: string]: unknown })[prop]);
        }
        return newObj;
    }
    return tar;
}
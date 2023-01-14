export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export const trataNull = (Array) => {
    if(Array === null || !Array){
        return [];
    } else {
        return Array;
    }
}
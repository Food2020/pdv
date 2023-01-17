export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export const trataArrayNull = (Array) => {
    if(Array === null || !Array){
        return [];
    } else {
        return Array;
    }
}

export const trataNull = (elem) => {
    if(elem === null || !elem){
        return "";
    } else {
        return elem;
    }
}
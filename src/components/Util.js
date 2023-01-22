export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export const renderizaLabelSelect = (valor, options) => {
    let obj = options.find((item) => item.value == valor);
    return obj ? obj.label : "";
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
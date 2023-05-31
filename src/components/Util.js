import { format,parse } from 'date-fns';

function _checkZero(data) {
	if (data.length == 1) {
		data = "0" + data;
	}
	return data;
}
export function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
export const renderizaDateTime = (dateTime) => {
	var date = new Date(dateTime);
	var day = date.getDate() + "";
	var month = date.getMonth() + 1 + "";
	var year = date.getFullYear() + "";
	var hour = date.getHours() + "";
	var minutes = date.getMinutes() + "";
	var seconds = date.getSeconds() + "";

	day = _checkZero(day);
	month = _checkZero(month);
	year = _checkZero(year);
	hour = _checkZero(hour);
	minutes = _checkZero(minutes);
	seconds = _checkZero(seconds);

	return day + "/" + month + "/" + year + " " + hour + ":" + minutes;
};
export const dateBrToDate = (dateBr) => {
	if(!dateBr){
		return "";
	}
	let timeStamp = parse(dateBr, 'dd/MM/yyyy', new Date());
	var date = new Date(timeStamp);
	return date;
};
export const renderizaLabelSelect = (valor, options) => {
	let obj = options.find((item) => item.value == valor);
	return obj ? obj.label : "";
};
export const renderizaSituacao = (situacao) => {
	return situacao === 1 ? "Ativo" : "Inativo";
};

export const trataArrayNull = (Array) => {
	// if (Array === null || !Array) {
	// 	return [];
	// } else {
	// 	return Array;
	// }
	return Array ?? [];
};
export const trataNull = (elem) => {
	// if (elem === null || !elem) {
	// 	return "";
	// } else {
	// 	return elem;
	// }
	return elem ?? "";
};
export const arrayToOption = (array,isProd) => {
	let arrayOptions = array.map((item) => {
		let properties = {
			value: isProd ? item.idProduto : item.id,
			label: item.nome,
		};
		return properties;
	});

	return arrayOptions;
}
export const optionToValue = (valor, multiple) => {
	return multiple ? valor.map((item) => item.value) : valor.value;
};

export const valueToOption = (valor, multiple) => {
	return multiple
		? valor?.map((item) => ({
				value: item,
				label: item,
		  }))
		: {
				value: valor,
				label: valor,
		  };
};

export const valueToOptionNumber = (valor, multiple,options) => {
	return multiple
		? valor?.map((item) => ({
				value: item,
				label: item,
		  }))
		: options.find(option => Number(option.value) === Number(valor));
};
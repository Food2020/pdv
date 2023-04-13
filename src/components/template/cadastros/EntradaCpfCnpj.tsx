import { useState } from "react";
import InputMask from "react-input-mask";

export default function EntradaCpfCnpj(props) {
	const [mask, setMask] = useState('999.999.999-99');

	function handleInputChange(event) {
		let value = event.target.value.replace(/\D/g, '');
		const tamanhoAtual = props.valor.replace(/\D/g, '').length;

		if (value.length < 11 || tamanhoAtual === 10) {
			setMask('999.999.999-99');
		  } else{
			if(tamanhoAtual === 11){
				const eventType = event.nativeEvent.inputType;
				const newChar = event.nativeEvent.data;

				if(eventType === "insertText"){
					value += newChar;
				}
			}	
			setMask('99.999.999/9999-99');
		  }
		props.valorMudou(value);
	  }

	return (
		<div>
            <div className = {`px-3 mb-4 ${props.className}`}>
                <label className = "block mb-2">
				CPF/CNPJ
                </label>
				<InputMask
					mask={mask}
					value={props.valor}
					readOnly = {props.somenteLeitura}
					onChange={handleInputChange}
					className = {`w-full
								border border-blue-500 border-md rounded-lg
								focus: outline-none bg-gray-50 px-4 py-2
								${props.somenteLeitura ? '' : 'focus:bg-white'}
							`}     
				>
				</InputMask>
			</div>
        </div>
	);
}

//https://react-select.com/home

import Select from "react-select";
import AsyncSelect from "react-select/async";

export default function Selecao(props) {
    
    function RetornaValor(){
        return props.options.filter((item) => item.value == props.valor);
    }

	function renderizaSelect() {
		if (props.loadOptions) {
			return (
				<AsyncSelect
					value={RetornaValor()}
					onChange={(newValue) => {
                        props.valorMudou?.(newValue.value);
                    }}
					loadOptions={props.loadOptions}
				/>
			);
		} else {
			return (
				<Select
					value={RetornaValor()}
                    onChange={(newValue) => {
                        props.valorMudou?.(newValue.value);
                    }}
					options={props.options}
				/>
			);
		}
	}

	return (
		<div className={`px-3 mb-4 ${props.className}`}>
			<label className="block mb-2">{props.texto}</label>
			{renderizaSelect()}
		</div>
	);
}
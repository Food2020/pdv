//https://react-select.com/home

import Select from "react-select";
import AsyncSelect from "react-select/async";

export default function Selecao(props) {		  
	function renderizaSelect() {
		if (props.loadOptions) {
			return (
				<AsyncSelect
					value={props.valor}
					onChange={(newValue) => {
                        props.valorMudou?.(newValue.value);
                    }}
					loadOptions={props.loadOptions}
				/>
			);
		} else {
			return (
				<Select
					value={props.valor}
                    onChange={(newValue) => {
                        props.valorMudou?.(newValue);
                    }}
					options={props.options}
					isMulti={props.isMulti}
					required={props.require}
				/>
			);
		}
	}

	return (
		<div>
			<div className={`px-3 mb-4 ${props.className}`}>
				<label className="block mb-2">{props.texto}</label>
				{renderizaSelect()}
			</div>
		</div>
	);
}
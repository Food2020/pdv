import InputMask from "react-input-mask";

export default function EntradaCep(props) {
	const handleSearch = () => {
		const cep = props.valor.replace(/\D/g, "");
		if (cep.length === 8) {
			fetch(`https://viacep.com.br/ws/${cep}/json/`)
				.then((response) => response.json())
				.then((data) => props.changeAddress(data))
				.catch((error) => console.error(error));
		}
	};

	return (
		<div>
			<div className={`px-3 mb-4 ${props.className}`}>
				<label className="block mb-2">Cep</label>
				<InputMask
					mask="99999-999"
					value={props.valor}
					readOnly={props.somenteLeitura}
					onKeyUp={handleSearch}
                    onChange = {e => props.valorMudou?.(e.target.value)}
					className={`w-full
								border border-blue-500 border-md rounded-lg
								focus: outline-none bg-gray-50 px-4 py-2
								${props.somenteLeitura ? "" : "focus:bg-white"}
							`}
				></InputMask>
			</div>
		</div>
	);
}

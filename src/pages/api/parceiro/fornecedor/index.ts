import ParceiroController from "../../../../backend/bd/Controller/ParceiroController";
import SuperJSON from "superjson";

export default async function handler(req, res) {
	const parceiroController = new ParceiroController();
	if (req.method === "GET") {
		const parceiros = await getFornecedores(parceiroController);
		res.status(200).json(JSON.parse(SuperJSON.stringify(parceiros)));
	}

	async function getFornecedores(parceiroController) {
		return await parceiroController.getFornecedores();
	}
}

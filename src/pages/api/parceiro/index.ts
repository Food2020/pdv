import ParceiroController from "../../../backend/bd/Controller/ParceiroController";
import SuperJSON from "superjson";
import { parceiros } from "@prisma/client";

export default async function handler(req, res) {
	const parceiroController = new ParceiroController();

	if (req.method === "POST") {
		const parceiro = req.body;
		const parceiroCadastrado = await saveParceiro(parceiroController, parceiro);
		try {
			return res.status(200).json(parceiroCadastrado);
		} catch (e) {
			return e;
		}
	}

	if (req.method === "GET") {
		const parceiros = await getParceiro(parceiroController);
		res.status(200).json(JSON.parse(SuperJSON.stringify(parceiros)));
	}

	if (req.method === "PUT") {
		try {
			const data = JSON.parse(JSON.stringify(req.body));
			const parceiro = await updateParceiro(parceiroController, data);
			return res.status(200).json({ parceiro: parceiro });
		} catch (e) {
			return e;
		}
	}

	if (req.method === "DELETE") {
		const parceiro = req.body;
		await deleteParceiro(parceiroController, parceiro);
		try {
			res.status(200).json({ message: "parceiro deletado" });
		} catch (e) {
			return e;
		}
	}
}

async function saveParceiro(parceiroController, data) {
	return await parceiroController.create(data);
}

async function getParceiro(parceiroController) {
	return await parceiroController.get();
}

async function updateParceiro(parceiroController, data: parceiros) {
	return await parceiroController.update(data);
}

async function deleteParceiro(parceiroController, data) {
	return await parceiroController.delete(data);
}

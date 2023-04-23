import ClienteController from "../../../backend/bd/Controller/ClienteController";
import SuperJSON from "superjson";
import { clientes } from "@prisma/client";

export default async function handler(req, res) {
	const clienteController = new ClienteController();

	if (req.method === "POST") {
		const cliente = req.body;
		const clienteCadastrado = await saveCliente(clienteController, cliente);
		try {
			return res.status(200).json(clienteCadastrado);
		} catch (e) {
			return e;
		}
	}

	if (req.method === "GET") {
		const clientes = await getCliente(clienteController);
		res.status(200).json(JSON.parse(SuperJSON.stringify(clientes)));
	}

	if (req.method === "PUT") {
		try {
			const data = JSON.parse(JSON.stringify(req.body));
			const cliente = await updateCliente(clienteController, data);
			return res.status(200).json({ cliente: cliente });
		} catch (e) {
			return e;
		}
	}

	if (req.method === "DELETE") {
		const cliente = req.body;
		await deleteCliente(clienteController, cliente);
		try {
			res.status(200).json({ message: "cliente deletado" });
		} catch (e) {
			return e;
		}
	}
}

async function saveCliente(clienteController, data) {
	return await clienteController.create(data);
}

async function getCliente(clienteController) {
	return await clienteController.get();
}

async function updateCliente(clienteController, data: clientes) {
	return await clienteController.update(data);
}

async function deleteCliente(clienteController, data) {
	return await clienteController.delete(data);
}

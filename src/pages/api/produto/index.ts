import ProductController from "../../../backend/bd/Controller/ProductController";
import SuperJSON from "superjson";
import { products } from "@prisma/client";

export default async function handler(req, res) {
	const productController = new ProductController();

	if (req.method === "POST") {
		const produto = req.body;
		const produtoCadastrado = await saveProduct(productController, produto);
		return res
			.status(200)
			.json({ produto: produtoCadastrado, methotd: "POST" });
	}

	if (req.method === "GET") {
		const produtos = await getProduct(productController);
		res.status(200).json(JSON.parse(SuperJSON.stringify(produtos)));
	}

	if (req.method === "PUT") {
		const data = JSON.parse(JSON.stringify(req.body));
		const produto = await updateProduct(productController, data);
		return res.status(200).json({ produto: produto, method: "PUT" });
	}

	if (req.method === "DELETE") {
		const produto = req.body;
		await deleteProduct(productController, produto);
		try {
			res.status(200).json({ message: "produto deletado" });
		} catch (e) {
			return e;
		}
	}
}

async function saveProduct(productController, data) {
	return await productController.create(data);
}

async function getProduct(productController) {
	return await productController.get();
}

async function updateProduct(productController, data: products) {
	return await productController.update(data);
}

async function deleteProduct(productController, data) {
	return await productController.delete(data);
}

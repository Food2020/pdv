import React, { useState } from "react";

const ProductTable = ({
        produto = []
}) => {

  const [products, setProducts] = useState<any>([produto]);

  const [editingProductId, setEditingProductId] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleEditClick = (productId) => {
    const product = products.find((p :any) => p.id === productId);
    setEditingProductId(productId);
    setNewProductName(product.name);
    setQuantidade(product.price);
  };

  const handleSaveClick = () => {
    const updatedProducts = products.map((product) => {
      if (product.id === editingProductId) {
        return {
          ...product,
          name: newProductName,
          price: quantidade
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setEditingProductId(null);
    setNewProductName("");
    setQuantidade("");
  };

  const handleRemoveClick = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acoes</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product: any) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingProductId === product.id ? (
                  <button onClick={handleSaveClick}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(product.id)}>Edit</button>
                )}
                <button onClick={() => handleRemoveClick(product.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

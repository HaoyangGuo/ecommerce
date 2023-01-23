import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";

const Catalog: React.FC = () => {
	const [products, setProducts] = useState<Product[]>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		agent.Catalog.list()
			.then((products) => setProducts(products))
			.catch((error) => console.log(error.response))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <Loading message="Loading products..." />;

	return (
		<div style={{ paddingBottom: "2rem" }}>
			{products ? <ProductList products={products} /> : null}
		</div>
	);
};

export default Catalog;

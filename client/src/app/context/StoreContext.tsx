import { createContext, useContext, useState } from "react";
import { Cart } from "../models/cart";

interface StoreContext {
	cart: Cart | null;
	setCart: (cart: Cart) => void;
	removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContext | undefined>(undefined);

export function useStoreContext() {
	const context = useContext(StoreContext);
	if (context === undefined) {
		throw new Error(
			"useStoreContext must be used within a StoreContextProvider"
		);
	}
	return context;
}

export function StoreContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [cart, setCart] = useState<Cart | null>(null);

	const removeItem = (productId: number, quantity: number) => {
		if (!cart) return;
		const items = [ ...cart.items ];
		const itemIndex = items.findIndex((i) => i.productId === productId);
		if (itemIndex < 0) return;
		items[itemIndex].quantity -= quantity;
		if (items[itemIndex].quantity <= 0) {
			items.splice(itemIndex, 1);
		}
		setCart((prevState) => ({ ...prevState!, items }));
	};

	return (
		<StoreContext.Provider value={{ cart, setCart, removeItem }}>
			{children}
		</StoreContext.Provider>
	);
}

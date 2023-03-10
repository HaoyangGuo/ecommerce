import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { History } from "../../util/History";

// const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
	async (response) => {
		// await sleep();
		return response;
	},
	(error: AxiosError) => {
		const { data, status } = error.response as any;
		switch (status) {
			case 400:
				if (data.errors) {
					const modelStateErrors: string[] = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modelStateErrors.push(data.errors[key]);
						}
					}
					throw modelStateErrors.flat();
				} else {
					toast.error(data.title);
				}
				break;
			case 401:
				toast.error(data.title);
				break;
			case 500:
				// history.push({ pathname: "/server-error" });
				History.navigate!("/server-error", {
					state: { error: data },
				});
				break;
			default:
				break;
		}
		return Promise.reject(error);
	}
);

const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string) => axios.post(url).then(responseBody),
	put: (url: string) => axios.put(url).then(responseBody),
	delete: (url: string) => axios.delete(url).then(responseBody),
};

const Cart = {
	get: () => requests.get("cart"),
	addItem: (id: number, quantity: number = 1) =>
		requests.post(`cart?productId=${id}&quantity=${quantity}`),
	removeItem: (id: number, quantity: number = 1) =>
		requests.delete(`cart?productId=${id}&quantity=${quantity}`),
};

const Catalog = {
	list: () => requests.get("products"),
	details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
	get400Error: () => requests.get("buggy/bad-request"),
	get401Error: () => requests.get("buggy/unauthorized"),
	get404Error: () => requests.get("buggy/not-found"),
	get500Error: () => requests.get("buggy/server-error"),
	getValidationError: () => requests.get("buggy/validation-error"),
};

const agent = {
	Catalog,
	TestErrors,
	Cart,
};

export default agent;

import { useNavigate, NavigateFunction } from "react-router-dom";
const History = {
	navigate: null as NavigateFunction | null,
};

const NavigateSetter = () => {
	History.navigate = useNavigate();

	return null;
};

export { History, NavigateSetter };

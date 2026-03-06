import { useNavigate } from "react-router-dom";

export default function OpenCartModal() {
    const navigate = useNavigate();

    const addToCartNow = () => {
        navigate('#addToCart');
    }

    return addToCartNow;
}


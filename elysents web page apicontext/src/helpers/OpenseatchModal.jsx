import { useNavigate } from "react-router-dom";

export default function OpenSearchModal() {
    const navigate = useNavigate();

    const searchNow = () => {
        navigate('#search');
    }

    return searchNow;
}


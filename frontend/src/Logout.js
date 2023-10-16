import { useEffect } from "react";

const Logout = () => {
    // localStorage.clear();
    useEffect(() => {
        const handleBeforeUnload = async (event) => {
            try {
                fetch(`http://localhost:7000/api/v1/user/logout`)
                    .then(() => {
                        return localStorage.clear();
                    })
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Cleanup the event listener when the component unmounts
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

}
export default Logout;
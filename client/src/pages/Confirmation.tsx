import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

export const Confirmation = () => {
    const { user } = useUser();

    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!verified) {
            console.log("CoduCruisers nu körs jag!");
            const verifySession = async () => {
                console.log("CodeCruisers och jag går in i funktionen");

                let sessionId;
                const dataFromLS = localStorage.getItem("sessionId");
                console.log("Data from localStorage (sessionId):", dataFromLS);

                let subLevel;
                const subLevelFromLS = localStorage.getItem("subscriptionLevel");
                console.log("Data from localStorage (subscriptionLevel):", subLevelFromLS);

                if (dataFromLS) {
                    try {
                        sessionId = JSON.parse(dataFromLS);
                        console.log("Parsed sessionId:", sessionId);
                    } catch (error) {
                        console.error("Failed to parse sessionId:", error);
                    }
                }

                if (subLevelFromLS) {
                    try {
                        subLevel =  Number(subLevelFromLS);
                        console.log("Parsed subscriptionLevel:", subLevel);
                    } catch (error) {
                        console.error("Failed to parse subscriptionLevel:", error);
                    }
                }
                
                const response = await fetch("http://localhost:3000/api/payments/verify-session", {
                method: "POST",    
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ sessionId, subLevel, user })
                })
                console.log(response);
                
                const data = await response.json();
                console.log(data);
                

                if (response.ok) {
                    setVerified(data.verified)
                    setIsLoading(false)
                }
            }
            verifySession()
        }
    }, [verified])


    return <>
    {verified && !isLoading ? <h1>Tack för ditt köp</h1> : "Laddar..."}</>
}

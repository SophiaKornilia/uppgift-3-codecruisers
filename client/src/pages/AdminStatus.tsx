import { useState } from "react"
import { AdminLogin } from "./AdminLogin";
import { Admin } from "./Admin";
import { AdminGet } from "../components/AdminGet";

export const AdminStatus = () => {
    const [admin, setAdmin] = useState(
		() => localStorage.getItem("admin") !== null
	);
	const handleAdminStatus = (adminStatus: boolean) => {
		adminStatus
			? localStorage.setItem("admin", "true")
			: localStorage.removeItem("admin");
		setAdmin(adminStatus);
	};

    return (
        <>{admin ? (
			<><AdminGet /><Admin /><button onClick={() => handleAdminStatus(false)}>Logout</button>
			</>) : (
				<AdminLogin handleAdminStatus={handleAdminStatus} />
				)
			}</>
    )

}
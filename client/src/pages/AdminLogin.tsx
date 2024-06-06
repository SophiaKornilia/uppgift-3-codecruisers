import { useState } from "react";

interface ILoginProps {
	handleAdminStatus: (value: boolean) => void;
}

export const AdminLogin = ({ handleAdminStatus }: ILoginProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

    const handleLogin = () => {
		if (username === "admin" && password === "admin") {
			setError("");
			handleAdminStatus(true);
		} else {
			setError("Wrong username or password... or both ;) ");
			setPassword("");
			setUsername("");
		}
	};


    return (
		<div>
			{error && (
				<div role="alert">
					{error}
				</div>
			)}

			<div>
				<div>
					<label htmlFor="adminUsername">
						Username
					</label>
					<input
						type="text"
						id="adminUsername"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="adminPassword">
						Password
					</label>
					<input
						type="password"
						id="adminPassword"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button
					onClick={handleLogin}
				>
					Login
				</button>
			</div>
		</div>
	);
};

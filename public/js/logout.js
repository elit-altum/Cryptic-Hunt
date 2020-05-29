const logoutUser = async () => {
	console.log("check");
	try {
		const res = await axios({
			method: "GET",
			url: "/api/v1/users/logout",
		});
		console.log(res);
		M.toast({
			html: `Logged out successfully!`,
			classes: "success-toast",
		});
		setTimeout(() => {
			location.assign("/login");
		}, 2000);
	} catch (err) {
		console.log(err);
		M.toast({
			html: `Could not logout. Please try again!`,
			classes: "error-toast",
		});
	}
};

const checkLogout = () => {
	const toastHTML =
		'<span>Logout?</span><button class="btn-flat toast-action" onclick="logoutUser()">Logout</button>';
	M.toast({ html: toastHTML });
};

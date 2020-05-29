// submitting login form
const loginForm = document.querySelector(".login-form");

const loginUser = async (username, password) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/users/login",
			data: {
				username,
				password,
			},
		});
		M.toast({
			html: `Welcome to the cypher ${res.data.data.user.username}. You will be redirected to the question.`,
			classes: "success-toast",
		});
		setTimeout(() => {
			location.assign("/play");
		}, 2000);
	} catch (err) {
		M.toast({ html: `${err.response.data.message}`, classes: "error-toast" });
	}
};

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	loginUser(username, password);
});

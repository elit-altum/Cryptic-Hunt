// submitting login form
const loginForm = document.querySelector(".login-form");

const loginUser = async (problem, answer, hint, level) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/questions",
			data: {
				problem,
                answer, 
                hint, 
                level
			},
		});
		M.toast({
			html: `New Question Accepted.`,
			classes: "success-toast",
		});
        setTimeout(() => {
            location.reload();
        }, 2000);
	} catch (err) {
		M.toast({ html: `${err.response.data.message}`, classes: "error-toast" });
	}
};

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const problem = document.getElementById("statement").value;
	const answer = document.getElementById("answer").value;
	const hint = document.getElementById("hint").value;
	const level = document.getElementById("level").value;

	loginUser(problem, answer, hint, level);
});

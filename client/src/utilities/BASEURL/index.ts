const BASEURL =
	process.env.NODE_ENV === "production"
		? "https://asgoodasmoney.herokuapp.com"
		: "http://localhost:5000";

export default BASEURL;
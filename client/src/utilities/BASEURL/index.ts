const BASEURL =
	process.env.NODE_ENV === "production"
		? "http://urltobedeterminedforplaybank.com"
		: "http://localhost:5000";

export default BASEURL;
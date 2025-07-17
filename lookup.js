const Links = {
	"Goffa": "https://goffatoys.com/",
	"Fiesta": "https://fiestatoy.com/",
	"ToyFactory": "https://shop.thetoyfactory.biz/",
	"RINovelty": "https://www.rinovelty.com/",
};

const queryLinkGenerators = {
	"Goffa": styleNumber => `${Links.Goffa}search?q=${styleNumber}`,
	"Fiesta": styleNumber => `${Links.Fiesta}search?type=product&q=${styleNumber}&submit=search`,
	"ToyFactory": styleNumber => `${Links.ToyFactory}${styleNumber}.html`,
	"RINovelty": styleNumber => `${Links.RINovelty}search?term=${styleNumber}`,
};

function GetInfo() {
	const styleNumber = document.getElementById("styleNumber").value.trim();
	const company = document.getElementById("company").value.trim();
	LookupPrize(styleNumber, company);
}

function LookupPrize(styleNumber, company) {
	const links = [];

	if (queryLinkGenerators[company]) {
		links.push(queryLinkGenerators[company](styleNumber));
	} else {
		Object.values(queryLinkGenerators).forEach(generator => {
			links.push(generator(styleNumber));
		});
		alert("No company selected. Searching all companies.");
	}

	links.forEach(link => window.open(link));
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("lookup").addEventListener("click", GetInfo);
});

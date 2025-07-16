const GoffaLink = "https://goffatoys.com/";
const FiestaLink = "https://fiestatoy.com/";
const ToyFactoryLink = "https://shop.thetoyfactory.biz/";
const RINoveltyLink = "https://www.rinovelty.com/";

function GetInfo() {
	const styleNumber = document.getElementById("styleNumber").value;
	const company = document.getElementById("company").value;

	LookupPrize(styleNumber, company);
}

function LookupPrize(styleNumber, company) {
	let links = [];

	switch (company) {
		case "Goffa":
			links.push(GoffaQueryLink(styleNumber));
			break;
		case "Fiesta":
			links.push(FiestaQueryLink(styleNumber));
			break;
		case "ToyFactory":
			links.push(ToyFactoryQueryLink(styleNumber));
			break;
		case "RINovelty":
			links.push(RINoveltyQueryLink(styleNumber));
			break;
		default:
			// No company selected, generate links for all companies
			links.push(GoffaQueryLink(styleNumber));
			links.push(FiestaQueryLink(styleNumber));
			links.push(ToyFactoryQueryLink(styleNumber));
			links.push(RINoveltyQueryLink(styleNumber));
			alert("No company selected. Searching all companies.");
			break;
	}

	links.forEach(link => {
		window.open(link);
	});
}

//#region  Company query links
function GoffaQueryLink(styleNumber) {
	return `${GoffaLink}search?q=${styleNumber}`;
}

function FiestaQueryLink(styleNumber) {
	return `${FiestaLink}search?type=product&q=${styleNumber}&submit=search`;
}

function ToyFactoryQueryLink(styleNumber) {
	return `${ToyFactoryLink}${styleNumber}.html`;
}

function RINoveltyQueryLink(styleNumber) {
	return `${RINoveltyLink}search?term=${styleNumber}`;
}
//#endregion

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("lookup").addEventListener("click", GetInfo);
});
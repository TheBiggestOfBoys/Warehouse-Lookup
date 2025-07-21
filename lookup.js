const Links = {
	"Goffa": "https://goffatoys.com/",
	"Fiesta": "https://fiestatoy.com/",
	"ToyFactory": "https://shop.thetoyfactory.biz/",
	"RINovelty": "https://www.rinovelty.com/",
	"Kokos": "https://kokos.com/",
	"ClassicToy": "https://classictoyco.com/",
	"ToyBarn": "https://www.toybarn.com/",
	"IdealToys": "http://www.idealtoysdirect.com/",
	"Jazwares": "https://shop.jazwares.com/",
	"AdventurePlanet": "https://www.bbtoystore.com/store/",
	"PeekABoo": "https://www.peekabootoys.com/",
};

const queryLinkGenerators = {
	"Goffa": styleNumber => `${Links.Goffa}search?q=${styleNumber}`,
	"Fiesta": styleNumber => `${Links.Fiesta}search?type=product&q=${styleNumber}&submit=search`,
	"ToyFactory": styleNumber => `${Links.ToyFactory}${styleNumber}.html`,
	"RINovelty": styleNumber => `${Links.RINovelty}search?term=${styleNumber}`,
	"Kokos": styleNumber => `${Links.Kokos}?s=${styleNumber}`,
	"ClassicToy": styleNumber => `${Links.ClassicToy}?s=${styleNumber}`,
	"ToyBarn": styleNumber => `${Links.ToyBarn}search.php?search_query=${styleNumber}`,
	"IdealToys": styleNumber => `${Links.IdealToys}searchresults.aspx?term=${styleNumber}`,
	"Jazwares": styleNumber => `${Links.Jazwares}search?q=${styleNumber}`,
	"AdventurePlanet": styleNumber => `${Links.AdventurePlanet}SRCH.html?Search=${styleNumber}`,
	"PeekABoo": styleNumber => `${Links.PeekABoo}?s=${styleNumber}`,
};

function GetInfo() {
	const styleNumber = document.getElementById("styleNumber").value.trim();
	const company = document.getElementById("company").value.trim();
	
	if (!styleNumber) {
		alert("Please enter a SKU or Style number.");
		document.getElementById("styleNumber").focus();
		return;
	}
	
	LookupPrize(styleNumber, company);
}

function LookupPrize(styleNumber, company) {
	const links = [];

	if (company && queryLinkGenerators[company]) {
		links.push(queryLinkGenerators[company](styleNumber));
	} else {
		Object.values(queryLinkGenerators).forEach(generator => {
			links.push(generator(styleNumber));
		});
		alert("No company selected. Searching all companies.");
	}

	links.forEach(link => window.open(link));
}

// Populate company dropdown from Links keys
const companySelect = document.getElementById("company");
Object.keys(Links).forEach(company => {
	const option = document.createElement("option");
	option.value = company;
	option.textContent = company === "RINovelty" ? "Rhode Island Novelty" :
		company === "ToyFactory" ? "Toy Factory" : company;
	companySelect.appendChild(option);
});

document.getElementById("lookup").addEventListener("click", GetInfo);

// Add Enter key support
document.getElementById("styleNumber").addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		GetInfo();
	}
});

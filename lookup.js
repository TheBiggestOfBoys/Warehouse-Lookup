const Links = {
	"Goffa": "https://goffatoys.com/",
	"Fiesta": "https://fiestatoy.com/",
	"Toy Factory": "https://shop.thetoyfactory.biz/",
	"R I Novelty": "https://www.rinovelty.com/",
	"Kokos": "https://kokos.com/",
	"Classic Toy": "https://classictoyco.com/",
	"Toy Barn": "https://www.toybarn.com/",
	"Ideal Toys": "http://www.idealtoysdirect.com/",
	"Jazwares": "https://shop.jazwares.com/",
	"Adventure Planet": "https://www.bbtoystore.com/store/",
	"Peek A Boo": "https://www.peekabootoys.com/",
};

const queryLinkGenerators = {
	"Goffa": styleNumber => `${Links.Goffa}search?q=${styleNumber}`,
	"Fiesta": styleNumber => `${Links.Fiesta}search?type=product&q=${styleNumber}&submit=search`,
	"Toy Factory": styleNumber => `${Links["Toy Factory"]}${styleNumber}.html`,
	"R I Novelty": styleNumber => `${Links["R I Novelty"]}search?term=${styleNumber}`,
	"Kokos": styleNumber => `${Links.Kokos}?s=${styleNumber}`,
	"Classic Toy": styleNumber => `${Links["Classic Toy"]}?s=${styleNumber}`,
	"Toy Barn": styleNumber => `${Links["Toy Barn"]}search.php?search_query=${styleNumber}`,
	"Ideal Toys": styleNumber => `${Links["Ideal Toys"]}searchresults.aspx?term=${styleNumber}`,
	"Jazwares": styleNumber => `${Links.Jazwares}search?q=${styleNumber}`,
	"Adventure Planet": styleNumber => `${Links["Adventure Planet"]}SRCH.html?Search=${styleNumber}`,
	"Peek A Boo": styleNumber => `${Links["Peek A Boo"]}?s=${styleNumber}`,
};

function GetInfo() {
	const styleNumber = document.getElementById("styleNumber").value.trim();
	const company = document.getElementById("company").value.trim();

	if (!styleNumber) {
		document.getElementById("styleNumber").focus();
		return;
	}

	GenerateLinks(styleNumber, company);
}

function GenerateLinks(styleNumber, company) {
	const links = [];
	const button = document.getElementById("lookup");

	// Show loading state
	const originalText = button.textContent;
	button.textContent = "Searching...";
	button.disabled = true;

	if (company && queryLinkGenerators[company]) {
		links.push(queryLinkGenerators[company](styleNumber));
	} else {
		Object.values(queryLinkGenerators).forEach(generator => {
			links.push(generator(styleNumber));
		});
	}

	// Restore button state
	setTimeout(() => {
		button.textContent = originalText;
		button.disabled = false;
	}, 300);

	links.length === 1 ? window.open(links[0]) : PopulateList(links);
	return links;
}

// Helper function to reverse lookup company name from URL
function getCompanyFromUrl(url) {
	for (const [company, baseUrl] of Object.entries(Links)) {
		if (url.startsWith(baseUrl)) {
			return company;
		}
	}
	return "Unknown";
}

function PopulateList(links) {
	const list = document.getElementById("linksList");
	list.innerHTML = ""; // Clear previous links

	if (links.length === 0) {
		list.innerHTML = "<li>No results found.</li>";
		return;
	}

	links.forEach(link => {
		const listItem = document.createElement("li");
		const companyName = getCompanyFromUrl(link);
		listItem.innerHTML = `<strong>${companyName}:</strong> `;

		const anchor = document.createElement("a");
		anchor.href = link;
		anchor.target = "_blank";
		anchor.textContent = link;
		listItem.appendChild(anchor);
		list.appendChild(listItem);
	});
}

// Function to clear all inputs and results
function clearAll() {
	document.getElementById("styleNumber").value = "";
	document.getElementById("company").value = "";
	const list = document.getElementById("linksList");
	if (list) {
		list.innerHTML = "";
	}
	document.getElementById("styleNumber").focus();
}

// Populate company dropdown from Links keys
const companySelect = document.getElementById("company");
Object.keys(Links).forEach(company => {
	const option = document.createElement("option");
	option.value = company;
	option.textContent = company;
	companySelect.appendChild(option);
});

document.getElementById("lookup").addEventListener("click", GetInfo);
document.getElementById("clear").addEventListener("click", clearAll);

// Add Enter key support
document.getElementById("styleNumber").addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		GetInfo();
	}
});

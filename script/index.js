let allIssues = [];


const loadAll = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    //console.log(fetch)
        .then(res => res.json())
        .then(json => {
            allIssues = json.data;
            displayIssues(allIssues); 
        })
        .catch(err => console.error(err));
}



const displayIssues = (issues) => {
    const container = document.getElementById("all-container");
    container.innerHTML = ""; 
    container.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";

    issues.forEach(issue => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg p-6 mb-6";

       
        const createdAt = new Date(issue.createdAt);
        const formattedDate = createdAt.toLocaleDateString() + " " + createdAt.toLocaleTimeString();

        card.innerHTML = `
            <h2 class="text-lg font-semibold mb-2">${issue.title}</h2>
            <p class="text-gray-700 mb-2">${issue.description}</p>
            
            <!-- Labels -->
            <div class="flex gap-2 mb-2">
                ${issue.labels.map(label => `<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">${label}</span>`).join("")}
            </div>

            
            <div class="flex flex-col gap-1 text-sm text-gray-600">
                <span><strong>Assignee:</strong> ${issue.assignee || "Unassigned"}</span>
                <span><strong>Created At:</strong> ${formattedDate}</span>
            </div>

            
            <div class="flex justify-end mb-2">
    
            <span class="text-sm text-gray-500 px-2 py-1 border rounded-md">${issue.priority}</span>
            </div>
        `;

          card.addEventListener("click", () => {
        loadSingleIssue(issue.id);
    });
        container.appendChild(card);
    });
}


const loadSingleIssue = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    //console.log(fetch)
        .then(res => res.json())
        .then(data => showIssueModal(data.data))
        .catch(err => console.error(err));
};

const showIssueModal = (issue) => {
    const modal = document.getElementById("my_modal_5");

    modal.querySelector(".modal-box").innerHTML = `
        <h3 class="text-2xl font-bold mb-4">${issue.title}</h3>

        <p class="mb-4 text-gray-700">${issue.description}</p>

        <div class="flex gap-2 mb-4">
            ${issue.labels
                .map(
                    label =>
                        `<span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">${label}</span>`
                )
                .join("")}
        </div>

        <div class="flex gap-4 mb-4">
            <span class="text-sm px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                Status: ${issue.status}
            </span>

            <span class="text-sm px-3 py-1 rounded-full bg-red-100 text-red-800 font-semibold">
                Priority: ${issue.priority}
            </span>
        </div>

        <p class="mb-1"><strong>Author:</strong> ${issue.author}</p>
        <p class="mb-4"><strong>Assignee:</strong> ${issue.assignee || "Unassigned"}</p>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">Close</button>
            </form>
        </div>
    `;

    modal.showModal();
};


document.addEventListener("DOMContentLoaded", () => {
    loadAll();

    const buttons = document.querySelectorAll(".max-w-7xl.mt-6 .flex > button");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const text = btn.textContent.trim().toLowerCase();
            if (text === "all") {
                displayIssues(allIssues);
            } else if (text === "open") {
                displayIssues(allIssues.filter(issue => issue.status === "open"));
            } else if (text === "closed") {
                displayIssues(allIssues.filter(issue => issue.status === "closed"));
            }
        });
    });
});
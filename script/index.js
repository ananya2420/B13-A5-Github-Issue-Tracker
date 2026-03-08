let allIssues = [];


const loadAll = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
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

            <!-- Assignee and CreatedAt -->
            <div class="flex flex-col gap-1 text-sm text-gray-600">
                <span><strong>Assignee:</strong> ${issue.assignee || "Unassigned"}</span>
                <span><strong>Created At:</strong> ${formattedDate}</span>
            </div>

            <!-- Status and Priority -->
            <div class="flex justify-end mb-2">
    
    <span class="text-sm text-gray-500 px-2 py-1 border rounded-md">${issue.priority}</span>
</div>
        `;
        container.appendChild(card);
    });
}



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
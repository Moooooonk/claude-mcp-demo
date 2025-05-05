// GitHub MCP Demo - Script to demonstrate Multiple Committer Push
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for collapsible sections
    const collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Fetch repository commit history
    fetchCommitHistory();
});

// Function to fetch commit history from GitHub API
async function fetchCommitHistory() {
    const repoOwner = 'Moooooonk';
    const repoName = 'claude-mcp-demo';
    const commitHistoryElement = document.getElementById('commit-history');
    
    if (!commitHistoryElement) return;
    
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`);
        const commits = await response.json();
        
        // Clear loading message
        commitHistoryElement.innerHTML = '';
        
        // Display commits
        commits.forEach(commit => {
            const commitElement = document.createElement('div');
            commitElement.className = 'commit-item';
            
            const date = new Date(commit.commit.author.date);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            
            commitElement.innerHTML = `
                <div class="commit-header">
                    <span class="commit-author">${commit.commit.author.name}</span>
                    <span class="commit-date">${formattedDate}</span>
                </div>
                <div class="commit-message">${commit.commit.message}</div>
                <div class="commit-sha">
                    <a href="${commit.html_url}" target="_blank">${commit.sha.substring(0, 7)}</a>
                </div>
            `;
            
            commitHistoryElement.appendChild(commitElement);
        });
    } catch (error) {
        commitHistoryElement.innerHTML = `<p class="error">Error fetching commit history: ${error.message}</p>`;
    }
}
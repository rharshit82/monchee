// Simple PDF export utility using browser's print functionality
// This creates a clean, printable version of content

export interface PDFExportOptions {
  title: string;
  content: string;
  filename: string;
}

export function exportToPDF(options: PDFExportOptions) {
  const { title, content, filename } = options;
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    throw new Error('Unable to open print window. Please check your popup blocker.');
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1e40af;
          margin: 0;
        }
        .subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          margin: 10px 0 0 0;
        }
        .content {
          font-size: 1rem;
          line-height: 1.8;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 15px;
          border-left: 4px solid #3b82f6;
          padding-left: 15px;
        }
        .badge {
          display: inline-block;
          background: #f3f4f6;
          color: #374151;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.875rem;
          margin-right: 8px;
          margin-bottom: 8px;
        }
        .code {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 15px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          margin: 15px 0;
        }
        .stats {
          display: flex;
          gap: 20px;
          margin: 20px 0;
        }
        .stat {
          text-align: center;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #3b82f6;
        }
        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
        }
        @media print {
          body { margin: 0; padding: 15px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">${title}</h1>
        <p class="subtitle">Generated from Monchee - System Design Learning Platform</p>
      </div>
      <div class="content">
        ${content}
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
}

// Specific export functions for different content types
export function exportCheatsheetPDF(data: {
  title: string;
  description: string;
  content: {
    whyItMatters: string;
    placementPatterns: string[];
    invalidationStrategies: string[];
    pitfalls: string[];
    bestPractices: string[];
  };
  username?: string;
}) {
  const { title, description, content, username } = data;
  
  const pdfContent = `
    <div class="section">
      <h2 class="section-title">Description</h2>
      <p>${description}</p>
    </div>
    
    <div class="section">
      <h2 class="section-title">Why It Matters</h2>
      <p>${content.whyItMatters}</p>
    </div>
    
    <div class="section">
      <h2 class="section-title">Placement Patterns</h2>
      <ul>
        ${content.placementPatterns.map(pattern => `<li>${pattern}</li>`).join('')}
      </ul>
    </div>
    
    <div class="section">
      <h2 class="section-title">Invalidation Strategies</h2>
      <ul>
        ${content.invalidationStrategies.map(strategy => `<li>${strategy}</li>`).join('')}
      </ul>
    </div>
    
    <div class="section">
      <h2 class="section-title">Common Pitfalls</h2>
      <ul>
        ${content.pitfalls.map(pitfall => `<li>${pitfall}</li>`).join('')}
      </ul>
    </div>
    
    <div class="section">
      <h2 class="section-title">Best Practices</h2>
      <ul>
        ${content.bestPractices.map(practice => `<li>${practice}</li>`).join('')}
      </ul>
    </div>
  `;
  
  const filename = username 
    ? `monchee-cheatsheet-${title.toLowerCase().replace(/\s+/g, '-')}-${username}.pdf`
    : `monchee-cheatsheet-${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  
  exportToPDF({
    title: `${title} - Cheatsheet`,
    content: pdfContent,
    filename
  });
}

export function exportLabPDF(data: {
  title: string;
  subtitle: string;
  difficulty: string;
  duration: string;
  problemStatement: string;
  requirements: {
    functional: string[];
    nonFunctional: string[];
  };
  hints: string[];
  extensions: string[];
  interviewRelevance: string;
  username?: string;
}) {
  const { title, subtitle, difficulty, duration, problemStatement, requirements, hints, extensions, interviewRelevance, username } = data;
  
  const pdfContent = `
    <div class="section">
      <h2 class="section-title">Lab Overview</h2>
      <p><strong>Difficulty:</strong> <span class="badge">${difficulty}</span></p>
      <p><strong>Duration:</strong> ${duration}</p>
      <p>${subtitle}</p>
    </div>
    
    <div class="section">
      <h2 class="section-title">Problem Statement</h2>
      <p>${problemStatement}</p>
    </div>
    
    <div class="section">
      <h2 class="section-title">Requirements</h2>
      <h3>Functional Requirements</h3>
      <ul>
        ${requirements.functional.map(req => `<li>${req}</li>`).join('')}
      </ul>
      <h3>Non-Functional Requirements</h3>
      <ul>
        ${requirements.nonFunctional.map(req => `<li>${req}</li>`).join('')}
      </ul>
    </div>
    
    <div class="section">
      <h2 class="section-title">Hints & Guidance</h2>
      <ul>
        ${hints.map(hint => `<li>${hint}</li>`).join('')}
      </ul>
    </div>
    
    <div class="section">
      <h2 class="section-title">Extensions</h2>
      <ul>
        ${extensions.map(ext => `<li>${ext}</li>`).join('')}
      </ul>
    </div>
    
    <div class="section">
      <h2 class="section-title">Interview Relevance</h2>
      <p>${interviewRelevance}</p>
    </div>
  `;
  
  const filename = username 
    ? `monchee-lab-${title.toLowerCase().replace(/\s+/g, '-')}-${username}.pdf`
    : `monchee-lab-${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  
  exportToPDF({
    title: `${title} - Lab`,
    content: pdfContent,
    filename
  });
}

export function exportProfilePDF(data: {
  username: string;
  displayName?: string;
  bio?: string;
  level: number;
  xp: number;
  points: number;
  streak: number;
  badges: Array<{
    name: string;
    description: string;
    category: string;
  }>;
  completedActivities: Array<{
    type: string;
    title: string;
    completedAt: string;
  }>;
}) {
  const { username, displayName, bio, level, xp, points, streak, badges, completedActivities } = data;
  
  const pdfContent = `
    <div class="section">
      <h2 class="section-title">Profile Information</h2>
      <p><strong>Username:</strong> @${username}</p>
      ${displayName ? `<p><strong>Display Name:</strong> ${displayName}</p>` : ''}
      ${bio ? `<p><strong>Bio:</strong> ${bio}</p>` : ''}
    </div>
    
    <div class="section">
      <h2 class="section-title">Learning Stats</h2>
      <div class="stats">
        <div class="stat">
          <div class="stat-value">${level}</div>
          <div class="stat-label">Level</div>
        </div>
        <div class="stat">
          <div class="stat-value">${xp.toLocaleString()}</div>
          <div class="stat-label">XP</div>
        </div>
        <div class="stat">
          <div class="stat-value">${points.toLocaleString()}</div>
          <div class="stat-label">Points</div>
        </div>
        <div class="stat">
          <div class="stat-value">${streak}</div>
          <div class="stat-label">Day Streak</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Badges Earned (${badges.length})</h2>
      <div>
        ${badges.map(badge => `
          <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px;">
            <strong>${badge.name}</strong>
            <span class="badge">${badge.category}</span>
            <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #6b7280;">${badge.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Completed Activities (${completedActivities.length})</h2>
      <div>
        ${completedActivities.map(activity => `
          <div style="margin-bottom: 10px; padding: 8px; background: #f9fafb; border-radius: 4px;">
            <strong>${activity.title}</strong>
            <span class="badge">${activity.type}</span>
            <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #6b7280;">
              Completed ${new Date(activity.completedAt).toLocaleDateString()}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  const filename = `monchee-profile-${username}.pdf`;
  
  exportToPDF({
    title: `${displayName || username} - Profile`,
    content: pdfContent,
    filename
  });
}

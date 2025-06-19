 <script>
    document.getElementById('fileInput').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ''; // Clear previous content

        const fileName = file.name.toLowerCase();

        if (fileName.endsWith('.json')) {
          try {
            const parsed = JSON.parse(content);
            outputDiv.innerHTML = `<pre>${JSON.stringify(parsed, null, 2)}</pre>`;
          } catch (err) {
            outputDiv.innerHTML = `<pre>Error parsing JSON</pre>`;
          }
        } else if (fileName.endsWith('.csv')) {
          const rows = content.trim().split('\n').map(row => row.split(','));
          const table = document.createElement('table');
          rows.forEach((row, index) => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
              const td = document.createElement(index === 0 ? 'th' : 'td');
              td.textContent = cell.trim();
              tr.appendChild(td);
            });
            table.appendChild(tr);
          });
          outputDiv.appendChild(table);
        } else {
          // Default plain text
          outputDiv.innerHTML = `<pre>${content}</pre>`;
        }
      };

      reader.readAsText(file);
    });
  </script>

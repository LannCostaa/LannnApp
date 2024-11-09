document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#spreadsheet tbody");
  const addRowButton = document.getElementById("add-row");
  const saveButton = document.getElementById("save-data");
  const resetButton = document.getElementById("reset-table");

  // Tambah baris baru
  addRowButton.addEventListener("click", () => {
    const row = document.createElement("tr");
    for (let i = 0; i < 3; i++) {
      const cell = document.createElement("td");
      cell.contentEditable = true; // Membuat sel bisa diedit
      row.appendChild(cell);
    }
    table.appendChild(row);
  });

  // Simpan data ke localStorage
  saveButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to save the data?")) {
      const data = [];
      table.querySelectorAll("tr").forEach(row => {
        const rowData = [];
        row.querySelectorAll("td").forEach(cell => {
          rowData.push(cell.textContent);
        });
        data.push(rowData);
      });
      localStorage.setItem("spreadsheetData", JSON.stringify(data));
      alert("Data saved successfully!");
    }
  });

  // Reset tabel
  resetButton.addEventListener("click", () => {
    if (confirm("This will clear all rows. Continue?")) {
      table.innerHTML = ""; // Hapus semua baris
      localStorage.removeItem("spreadsheetData");
    }
  });

  // Load data dari localStorage saat aplikasi dibuka
  const savedData = JSON.parse(localStorage.getItem("spreadsheetData"));
  if (savedData) {
    savedData.forEach(rowData => {
      const row = document.createElement("tr");
      rowData.forEach(cellData => {
        const cell = document.createElement("td");
        cell.contentEditable = true;
        cell.textContent = cellData;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });
  }
});

export async function fetchAllBaserowRows() {
    const allRows = [];
    let offset = 0;
    const limit = 3000;
  
    while (true) {
      const res = await fetch(`https://api.baserow.io/api/database/rows/table/465189/?user_field_names=true&limit=${limit}&offset=${offset}`);
      const data = await res.json();
      allRows.push(...data.results);
  
      if (data.results.length < limit) break;
      offset += limit;
    }
  
    return allRows;
  }
  
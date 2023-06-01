async function api(end_url, method, payload) {
    const response = await fetch("http://localhost:8080/" + end_url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: method,
      body: JSON.stringify(payload),
    });

    return await response.json();
  }
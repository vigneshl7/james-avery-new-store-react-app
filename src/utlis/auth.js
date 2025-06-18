export const getToken = async () => {
  const url = import.meta.env.VITE_TOKEN_URL;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('scope', import.meta.env.VITE_CLIENT_SCOPE);

  const credentials = `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(credentials),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token request failed: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
};

export const callEngravingAPI = async (token) => {
  const url = import.meta.env.VITE_ENGRAVING_API_PATH;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "*/*",
      "Cache-Control": "no-cache",
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Engraving API request failed: ${error}`);
  }

  const data = await response.json();
  return data;
};

const base_url = "https://api.sampleapis.com";

const apiService = {
  get: async (endpoint: string): Promise<any> => {
    const response = await fetch(`${base_url}/${endpoint}`);
    const data = await response.json();
    return data;
  },

  post: async (endpoint: string, body: any) => {
    const response = await fetch(`${base_url}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${base_url}/${endpoint}`);
    const data = await response.json();
    return data;
  },
};

export default apiService;

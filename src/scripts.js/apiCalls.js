export const postData = async (data, url) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      data,
    }),
    headers: { 'Content-type': 'application/json' },
  });

  return response.json();
};

export const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

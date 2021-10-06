export const postData = async (data, url) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
    }),
    headers: { 'Content-type': 'application/json' },
  });

  return response.json();
};

export const postScoreData = async (data, url) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      user: data.user,
      score: data.score,
    }),
    headers: { 'Content-type': 'application/json' },
  });

  return response.json();
};

export const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

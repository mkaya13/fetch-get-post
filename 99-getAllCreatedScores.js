import fetch from "node-fetch";

async function fetchData() {
  const fetchedData = fetch(
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => data.result)
    .catch((error) => console.log(error));

  return fetchedData;
}

async function returnScoreData() {
  const responseData = await fetchData();
  console.log(responseData);
  return responseData;
}

returnScoreData();

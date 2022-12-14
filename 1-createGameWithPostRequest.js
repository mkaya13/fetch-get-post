import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL || "";

async function createGame(gameName) {
  const object = {
    name: gameName,
  };
  const sentData = fetch(BASE_URL + "games/", {
    method: "post",
    body: JSON.stringify(object),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));

  return sentData;
}

let gameIdObject = {};

async function getCreateGameResponse() {
  const responseData = await createGame("BC");
  gameIdObject = { gameID: responseData.result.slice(14, 34) };
  console.log(responseData);
  console.log(JSON.stringify(gameIdObject));
}

function storeGameIdData() {
  fs.writeFile("gameIdConfig.json", JSON.stringify(gameIdObject), (err) => {
    if (err) throw err;

    console.log(
      `.gameIdConfig.json file was succesfully created and gameID ${gameIdObject.gameID} was stored inside!`
    );
  });
}

await getCreateGameResponse();
storeGameIdData();

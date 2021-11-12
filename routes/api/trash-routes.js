//this is using https
function edamamv2() {https.get('https://api.edamam.com/api/food-database/v2/parser?app_id=64a0e39a&app_key=90e521d5fd7b9f2ee89888aaa573e898&ingr=mexican&nutrition-type=cooking&category=fast-foods&calories=500', (resp) => {
  let data = '';
  let parsedData;

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  return resp.on('end', () => {
    // console.log(JSON.parse(data).explanation);
    return JSON.parse(data);
    parsedData = JSON.parse(data);
  });

  console.log("parsedData hints>>>>", parsedData)

}).on("error", (err) => {
  console.log("Error: " + err.message);
});}
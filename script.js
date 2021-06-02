/** The script to run the program on the webpage */

async function loadData () {

    let data = await d3.csv("numberofswipes.csv");

    return data;
}

let preProcessData = loadData();

Promise.all([preProcessData]).then(data => {

    let preData = data[0];

    let bars = new visuals(preData);
})
/** The script to run the program on the webpage */

async function loadData () {

    let data = await d3.csv("numberofswipes.csv");

    return data;
}

let preProcessData = loadData();

Promise.all([preProcessData]).then(data => {

    let preData = data[0];
    this.activeNumber = 1;

    let that = this;

    function updateNumber (number) {
        that.activeNumber = number;
        bars.updateChart(number);
    }

    let bars = new visuals(preData, updateNumber);
})
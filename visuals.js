class DataClass {

    constructor (numberOfSwipes, zions, other) {
        this.numberOfSwipes = +numberOfSwipes;
        this.zions = +zions;
        this.other = +other;
    }

}

class visuals {

    constructor (data, updateNumber) {

        this.data = data;
        this.updateNumber = updateNumber;
        this.slider = false;
        this.dataValues = [];
        this.amountList = [];
        this.companies = ["Zions", "Others"];

        for (let i = 0; i < this.data.length; i++) {
            let node = new DataClass(this.data[i].num_swipes, this.data[i].Zions,
                this.data[i].Others);
            this.dataValues.push(node);
            this.amountList.push(i);
        }

        this.drawYearBar();

    }

    drawYearBar () {
        let that = this;
        this.slider = false;

        let amountScale = d3.scaleLinear()
                            .domain([0, 999])
                            .range([90, 200]);
        
        let amountSlider = d3.select('#slider')
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 0)
            .attr('max', 999)
            .attr('value', this.activeNumber);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg').attr("id", "slider-text");

        if (this.activeNumber !== null || this.reset === true || this.activeNumber === null) {
        let sliderText = sliderLabel.append('text')
            .text(this.activeNumber);

            sliderText.attr('x', amountScale(this.activeNumber));
            sliderText.attr('y', 25);

        amountSlider.on('input', function () {
            that.slider = true;

            sliderText
                .text(this.value)
                .attr('x', amountScale(this.value))
                .attr('y', 25); 

            that.updateNumber(this.value);

        })
        }
    }

    drawBars (number, newBars) {
        if (newBars === true) {
            let divBar = document.getElementById("bar")
            while (divBar.firstChild) {
                divBar.removeChild(divBar.firstChild);
            }
        }


        let dataBar = [];

        for (let i = 0; i < this.dataValues.length; i++) {
            if (this.dataValues[i]["numberOfSwipes"] === number) {
                let node = {
                    "numberOfSwipes": i,
                    "Zions": this.dataValues[i]["zions"],
                    "Others": this.dataValues[i]["other"]
                };
                dataBar.push(node);
            }
        }

        let margin = {top: 10, right: 20, bottom: 10, left: 20};
        
        let w = 500 - margin.right - margin.left;
        let h = 400 - margin.bottom - margin.top;

        let var_id = "numberOfSwipes";
        let that = this;

        let xlargeScale = d3.scaleBand()
                .domain(dataBar.map(d => d[var_id]))
                .range([margin.left, w - margin.right])
                .paddingInner(0.5);

        let xcatsScale = d3.scaleBand()
                .domain(["Zions", "Others"])
                .range([0, xlargeScale.bandwidth()])
                .paddingInner(0.5);

        let yScale = d3.scaleLinear()
                .domain([d3.max([dataBar[0]["Zions"], dataBar[0]["Others"]]),0])
                .range([0,h-5]);

        let svg = d3.select("#bar")
                .append("svg")
                .attr("id", "bars")
                .attr("width", w + margin.right + margin.left)
                .attr("height", h + margin.top + margin.bottom);

        svg.append("g")
            .selectAll("g")
            .data(dataBar)
            .join("g")
            .attr("transform", d => `translate(${xlargeScale(d[var_id])+25},0)`)
            .selectAll("rect")
            .data(d => that.companies.map(key => ({key, value: d[key], variable_name: d["var"]})))
            .join("rect")
            .attr("x", d => xcatsScale(d.key) + 5)
            .attr("y", function(d,i) {
               return yScale(d.value);
            })
            .attr("width", xcatsScale.bandwidth())
            .attr("height", function(d,i) {
               return yScale(0) - yScale(d.value);
            })
            .attr("fill", "steelblue")
            .attr("id", (d,i) => d.key+"");
    
        let yaxis = svg.append("g")
                    .attr("id", "y-axis");
        
        yaxis.append("text")
                .attr("class", "axis-label")
                .attr("transform", "translate(0, 0)")
                .attr("text-anchor", "middle")
                .attr("class", "y-label");
        
        yaxis.call(d3.axisLeft(yScale).ticks(3))
                .attr("transform", "translate(" + 30 + "," + "0)")
                .attr("class", "axis_line");

        let xaxis = svg.append("g")
                    .attr("id", "x-axis")
                    .attr("transform", "translate(" +3*margin.left+ "," +h+")")
                    .call(d3.axisBottom(xcatsScale));

    }

    updateChart (number) {
        let that = this;

        this.shotData = this.resetData;

        d3.selectAll("#tooltip").remove();

        let new_num = +number;

        this.drawBars(new_num);

    }

}
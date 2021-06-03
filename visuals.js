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

    drawBars (number) {

        d3.selectAll("#bars").remove();

        let dataBar = [];

        for (let i = 0; i < this.dataValues.length; i++) {
            if (this.dataValues[i]["numberOfSwipes"] === number) {
                let node = {
                    "NumberOfSwipes": i,
                    "Zions": this.dataValues[i]["zions"],
                    "Others": this.dataValues[i]["others"]
                };
                dataBar.push(node);
            }
        }

        let margin = {top: 10, right: 20, bottom: 10, left: 20};
        
        let w = 500 - margin.right - margin.left;
        let h = 400 - margin.bottom - margin.top;
        let barpadding = 1;





        let x_lab = d3.scaleBand()
                        .domain(["Zions", "Others"])
                        .range([0,w-5])

        let yScale = d3.scaleLinear()
            .domain([d3.max([dataBar[0]["zions"], dataBar[0]["others"]]),0])
            .range([0,h-5]);

        let svg = d3.select("#bars")
            .append("svg")
            .classed("plot-svg", true)
            .attr("id", "bars")
            .attr("width", w + margin.right + margin.left)
            .attr("height", h + margin.top + margin.bottom);

        svg.selectAll("rect")
            .data(dataBar)
            .enter()
            .append("rect")
            .attr("x", function (d,i) {
                return i * (w/state_data.length)
            })
            .attr("y", function(d,i) {
                return yScale(d);
            })
            .attr("width", w/state_data.length - barpadding)
            .attr("height", function(d) {
                return h-yScale(d);
            })
            .attr("fill","pink")
            .attr("transform", "translate(" + 3*margin.left +
            "," + 0+")");
    
        let yaxis = svg.append("g")
                    .attr("id", "y-axis");
        
            yaxis.append("text")
                .attr("class", "axis-label")
                .attr("transform", "translate(" + 0
                    + "," + 0)
                .attr("text-anchor", "middle")
                .attr("class", "y-label");
        
            yaxis.call(d3.axisLeft(yScale).ticks(5))
                .attr("transform", "translate(" + 3*margin.left + "," + "5)")
                .attr("class", "axis_line");

        let xaxis = svg.append("g")
                    .attr("id", "x-axis")
                    .attr("transform", "translate(" +3*margin.left+ "," +h+")")
                    .call(d3.axisBottom(x_lab));

    }

    updateChart (number) {
        let that = this;

        this.shotData = this.resetData;

        d3.selectAll("#tooltip").remove();

        this.drawBars(number);

    }

}
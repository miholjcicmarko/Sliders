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
        

        
    }

    updateChart (number) {
        let that = this;

        this.shotData = this.resetData;

        d3.selectAll("#tooltip").remove();

        this.drawBars(number);

    }

}
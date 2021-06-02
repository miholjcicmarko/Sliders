/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
 function staircase() {
    // ****** TODO: PART II ******
    let bar = document.getElementById("aBarChart");
  
    let barChart = bar.getElementsByTagName("rect");
  
    let arr = [];
  
    for (let i = 0; i < barChart.length; i++){
        arr.push(barChart[i].attributes.width.nodeValue);
    }
    //sort all the bars by width to put them in order
    var sorter = new Intl.Collator(undefined, {numeric:true})
    arr.sort(sorter.compare);
  
    // set the bar chart to the sorter array
    for (let k = 0; k < barChart.length; k++){
      barChart[k].attributes.width.nodeValue = arr[k];
    }
  
  }
  
  /**
   * Render the visualizations
   * @param data
   */
  function update(data) {
    /**
     * D3 loads all CSV data as strings. While Javascript is pretty smart
     * about interpreting strings as numbers when you do things like
     * multiplication, it will still treat them as strings where it makes
     * sense (e.g. adding strings will concatenate them, not add the values
     * together, or comparing strings will do string comparison, not numeric
     * comparison).
     *
     * We need to explicitly convert values to numbers so that comparisons work
     * when we call d3.max()
     **/
  
    for (let d of data) {
      d.cases = +d.cases; //unary operator converts string to number
      d.deaths = +d.deaths; //unary operator converts string to number
    }
  
    // Set up the scales
    let barChart_width = 345;
    let areaChart_width = 295;
    let maxBar_width = 240;
    let data_length = 15;
    let aScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.cases)])
      .range([0, maxBar_width]);
    let bScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.deaths)])
      .range([0, maxBar_width]);
    let iScale_line = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([10, 500]);
    let iScale_area = d3
      .scaleLinear()
      .domain([0, data_length])
      .range([0, 260]);
    
    // Draw axis for Bar Charts, Line Charts and Area Charts (You don't need to change this part.)
    d3.select("#aBarChart-axis").attr("transform", "translate(0,210)").call(d3.axisBottom(d3.scaleLinear().domain([0, d3.max(data, d => d.cases)]).range([barChart_width, barChart_width-maxBar_width])).ticks(5));
    d3.select("#aAreaChart-axis").attr("transform", "translate(0,245)").call(d3.axisBottom(d3.scaleLinear().domain([0, d3.max(data, d => d.cases)]).range([areaChart_width, areaChart_width-maxBar_width])).ticks(5));
    d3.select("#bBarChart-axis").attr("transform", "translate(5,210)").call(d3.axisBottom(bScale).ticks(5));
    d3.select("#bAreaChart-axis").attr("transform", "translate(5,245)").call(d3.axisBottom(bScale).ticks(5));
    let aAxis_line = d3.axisLeft(aScale).ticks(5);
    d3.select("#aLineChart-axis").attr("transform", "translate(50,15)").call(aAxis_line);
    d3.select("#aLineChart-axis").append("text").text("New Cases").attr("transform", "translate(50, -3)");
    let bAxis_line = d3.axisRight(bScale).ticks(5);
    d3.select("#bLineChart-axis").attr("transform", "translate(550,15)").call(bAxis_line);
    d3.select("#bLineChart-axis").append("text").text("New Deaths").attr("transform", "translate(-50, -3)");
  
    // ****** TODO: PART III (you will also edit in PART V) ******
  
    // TODO: Select and update the 'a' bar chart bars
    let achart = d3.selectAll("#aBarChart").selectAll("rect") 
        .data(data);
  
    achart.style("opacity", 1)
      .exit().remove()
      .transition()
      .duration(750)
      .style("opacity", 0);
    
    achart = achart.enter().append("rect")
      .merge(achart);
  
    achart.style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("width", function(d,i) { return aScale(d.cases)})
        .attr("height", "12")
        .attr("transform", (d,i) => {return "translate(" +0+ "," + 14*i + ") scale(-1, 1)"})
        .style("opacity", 1);
  
    // TODO: Select and update the 'b' bar chart bars
    let bchart = d3.selectAll("#bBarChart").selectAll("rect")
          .data(data);
  
    bchart.style("opacity", 1)
      .exit().remove()
      .transition()
      .duration(750)
      .style("opacity", 0);
  
    bchart = bchart.enter().append("rect").merge(bchart);      
    
    bchart.style("opacity", 0)
      .transition()
      .duration(1000)
      .attr("width", function(d,i) { return bScale(d.deaths)})
      .attr("height", "12")
      .attr("transform", (d,i) => {return "translate(" +0+ "," + 14*(i+1) + ") scale(1, -1)"})
      .style("opacity", 1);
  
    // TODO: Select and update the 'a' line chart path using this line generator
    let aLineGenerator = d3
      .line()
      .x((d, i) => iScale_line(i))
      .y((d,i) => aScale(d.cases));
  
    let aLineC = d3.selectAll("#aLineChart")
      .datum(data);
  
    aLineC
      .style("opacity", 0)
      .transition()
      .duration(750)
      .style("opacity", 1)
      .attr("d", aLineGenerator);
  
    // TODO: Select and update the 'b' line chart path (create your own generator)
    let bLineGenerator = d3
      .line()
      .x((d, i) => iScale_line(i))
      .y((d,i) => bScale(d.deaths));
  
    let bLineC = d3.selectAll("#bLineChart")
      .datum(data);
  
    bLineC
      .style("opacity", 0)
      .transition()
      .duration(750)
      .style("opacity", 1)
      .attr("d", bLineGenerator);
  
    // TODO: Select and update the 'a' area chart path using this area generator
    let aAreaGenerator = d3
      .area()
      .x((d, i) => iScale_area(i))
      .y0(0)
      .y1((d,i) => aScale(d.cases));
  
    let aAreaC = d3.selectAll("#aAreaChart")
      .datum(data);
  
    aAreaC
      .style("opacity", 0)
      .transition()
      .duration(750)
      .style("opacity", 1)
      .attr("d", aAreaGenerator);
  
    // TODO: Select and update the 'b' area chart path (create your own generator)
    let bAreaGenerator = d3
      .area()
      .x((d, i) => iScale_area(i))
      .y0(0)
      .y1((d,i) => bScale(d.deaths));
  
    let bAreaC = d3.selectAll("#bAreaChart")
      .datum(data);
  
    bAreaC.attr("d", bAreaGenerator)
    .style("opacity", 0)
    .transition()
    .duration(750)
    .style("opacity", 1)
    .attr("d", bAreaGenerator);
  
    // TODO: Select and update the scatterplot points
    // Make axis for scatter plot
    d3.select("#x-axis").attr("transform", "translate(10,250)").call(d3.axisBottom(aScale).ticks(5));
    let yAxis_line = d3.axisLeft(bScale).ticks(5);
    d3.select("#y-axis").attr("transform", "translate(10,10)").call(yAxis_line);
  
  // make scatter plot
  let scatter = d3.selectAll("#scatterplot").selectAll("circle")
      .data(data);
  
  scatter.style("opacity", 1)
    .exit().remove()
    .transition()
    .duration(750)
    .style("opacity", 0);
  
  scatter = scatter.enter().append("circle").merge(scatter);
  
  scatter.style("opacity", 0)
      .transition()
      .duration(750)
      .attr("cx", (d,i) => aScale(d.cases))
      .attr("cy", (d,i) => bScale(d.deaths))
      .attr("r", 5)
      .style("opacity", 1);
  
    // ****** TODO: PART IV ******
    // change color of bars when there is interaction with the user
    let rects = achart;
  
    rects.on("mouseover", function(d) {
        d3.select(this).attr('class', 'bar-chart hovered');
      })
    
    rects.on("mouseout", function(d) {
      d3.select(this).attr('class', 'bar-chart-x rect');
    })
  
    bchart.on("mouseover", function(d) {
        d3.select(this).attr('class', 'bar-chart hovered');
      })
    
    bchart.on("mouseout", function(d) {
        d3.select(this).attr('class', 'bar-chart-x rect');
    })  
  
    // display coordinates in console
    let coor = d3.selectAll("#scatterplot").selectAll("circle");
  
    coor.on("click", function(d) {
      let xcor = d.cases  
      let ycor = d.deaths
      let coordinates = "x: " + xcor + ", y: " + ycor;
        console.log(coordinates);
      })
    // create a tool tip
    let tooltip = d3.selectAll("#scatterplot").selectAll("circle");
  
    tooltip.on("mouseover", function(d) {
      var x_pos = d.cases;
      var y_pos = d.deaths;
  
      d3.select(this).append("title")
        .attr("id", "tooltip")
        .attr("x", x_pos)
        .attr("y", y_pos)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(function (d) { return "(x: " + x_pos + ", y:" + y_pos +")"});
    })
    
    tooltip.on("mouseout", function() { d3.select("#tooltip").remove()});
  
  }
  
  /**
   * Update the data according to document settings
   */
  async function changeData() {
    //  Load the file indicated by the select menu
    let dataFile = document.getElementById("dataset").value;
    try {
      const data = await d3.csv("data/" + dataFile + ".csv");
      if (document.getElementById("random").checked) {
        // if random
        update(randomSubset(data)); // update w/ random subset of data
      } else {
        // else
        update(data); // update w/ full data
      }
    } catch (error) {
      console.log(error)
      alert("Could not load the dataset!");
    }
  }
  
  /**
   *  Slice out a random chunk of the provided in data
   *  @param data
   */
  function randomSubset(data) {
    return data.filter(d => Math.random() > 0.5);
  }
  
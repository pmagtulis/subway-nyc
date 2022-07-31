function d3waffle() {
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        icon = "&#9632;",
        scale = 1,
        rows = 15,
        adjust = 0.8,
        colorscale = d3.scale.category20(),
        appearancetimes = function(d, i){ return 500; },
        height = 800,
        magic_padding = 5;
       
    function chart(selection) {
      
      selection.each(function(data) {
  
        selection.selectAll("*").remove();
    
        /* setting parameters and data */
        var idcontainer = selection[0][0].id; // I need to change thiz plz
        var total = d3.sum(data, function(d) { return d.value; });
  
        /* updating data */
        data.forEach(function(d, i){
          data[i].class = slugify(d.name);
          data[i].scalevalue = Math.round(data[i].value*scale);
          data[i].percent = data[i].value/total;
        });
  
        var totalscales = d3.sum(data, function(d){ return d.scalevalue; })
        var cols = Math.ceil(totalscales/rows);
        var griddata = cartesianprod(d3.range(cols), d3.range(rows));
        var detaildata = [];
  
        data.forEach(function(d){
          d3.range(d.scalevalue).forEach(function(e){
            detaildata.push({ name: d.name, class: d.class })
          });
        });
  
        detaildata.forEach(function(d, i){
          detaildata[i].col = griddata[i][0];
          detaildata[i].row = griddata[i][1];
        })
  
        /*console.log("detail data length: ", detaildata.length)*/
        
        var gridSize = ((height - margin.top - margin.bottom) / rows)
  
        /* setting the container */
        var svg = selection.append("svg")
              .attr("width",  "100%")
              .attr("height", height + "px")
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .style("cursor", "default");
  
        var nodes = svg.selectAll(".node")
              .data(detaildata)
              .enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + (d.col)*gridSize + "," + (rows - d.row - 1)*gridSize  + ")"; });
  
        /* this is necesary, when the icons are small/thin activate mouseout */
        nodes.append("text")
              .style("opacity", 0)
              .html(icon)
              .attr('class', function(d){ return d.class; })
              .attr('font-family', 'Roboto')
              .attr("transform", function(d) { return "translate(" + gridSize/2 + "," + 5/6*gridSize  + ")"; })
              .style("text-anchor", "middle")
              .style('fill', function(d){ return colorscale(d.class); })
              .style("font-size", function(d) {
                val = 9;
                val2 = 2.5;
                textsize = Math.min(val2 * gridSize, (val2 * gridSize - val) / this.getComputedTextLength() * val);
                return textsize * adjust + "px";
              })
              .transition()
              .duration(appearancetimes)
              .style("opacity", 1);
  
        var legend = svg.selectAll('.legend')
            .data(data)
            .enter().append('g')
            .attr('class', function(d){ return "legend" + " " + d.class; })
            .attr("transform", function(d) { return "translate(" + (cols*gridSize + magic_padding) + "," + magic_padding + ")"; })
        
        legend.append('rect')
            .attr("width", 12)
            .attr("x", 50)
            .attr("y", 30)
            .attr("height", 12)
            .style("fill", function(d) { return icon;})
          
        legend.append('text')
              .attr("x", 70)
              .attr("y", 42)
              //.attr('class', function(d){ return "waffle-legend-text" + " " + d.class; })
              .attr('font-family', 'Roboto')
              .html(function(d){ return d.name; })
              //.attr("transform", function(d) { return "translate(" + gridSize/2 + "," + 5/6*gridSize  + ")"; })
  
      });
    }
    
  
    chart.width = function(_) {
      if (!arguments.length) return width;
      width = _;
      return chart;
    };
  
    chart.height = function(_) {
      if (!arguments.length) return height;
      height = _;
      return chart;
    };
  
    chart.rows = function(_) {
      if (!arguments.length) return rows;
      rows = _;
      return chart;
    };
  
    chart.icon = function(_) {
      if (!arguments.length) return icon;
      icon = _;
      return chart;
    };
  
    chart.scale = function(_) {
      if (!arguments.length) return scale;
      scale = _;
      return chart;
    };
  
    chart.colorscale = function(_) {
      if (!arguments.length) return colorscale;
      colorscale = _;
      return chart;
    };
  
  chart.appearancetimes = function(_) {
      if (!arguments.length) return appearancetimes;
      appearancetimes = _;
      return chart;
    };
  
  chart.adjust = function(_) {
      if (!arguments.length) return adjust;
      adjust = _;
      return chart;
    };
  
    return chart;
  
  }
  
  function slugify(text){
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .trim();                        // Trim - from end of text
  }
  
  /* http://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript */
  function cartesianprod(paramArray) {
  
    function addTo(curr, args) {
  
      var i, copy, 
          rest = args.slice(1),
          last = !rest.length,
          result = [];
  
      for (i = 0; i < args[0].length; i++) {
  
        copy = curr.slice();
        copy.push(args[0][i]);
  
        if (last) {
          result.push(copy);
  
        } else {
          result = result.concat(addTo(copy, rest));
        }
      }
  
      return result;
    }
  
  
    return addTo([], Array.prototype.slice.call(arguments));
  }
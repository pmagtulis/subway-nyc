var data = [
    { "name": "Crime rate (0.53)", "value": 1},
    { "name": "Riders (99,999)", "value": 99999}
  ]
  
  var domain = data.map(function(d){ return slugify(d.name); })
  var range = ["#780f49", "#e3e3e3"]
  var palette = d3.scale.ordinal().domain(domain).range(range);


  // var chart = d3waffle()
  //                 .rows(50)
  //                 .scale(1/5)
  //                 .colorscale(palette)
  //                 // .appearancetimes(function(d, i){ return i*10 + Math.random()*250;})
  //                 .height(800);
  // d3.select("#chart-waffle-1")
  //   .datum(data)
  //   .call(chart); 

waffleChart("#chart-waffle-1", data, palette, 1);

var data = [
    { "name": "Riders (100K)", "value": 100000},
    { "name": "Crime rate (0.53)", "value": 1}
  ]
  
  var domain = data.map(function(d){ return slugify(d.name); })
  var range = ["#4a4a4a","#efd046"]
  var palette = d3.scale.ordinal().domain(domain).range(range);


  var chart = d3waffle()
                  .rows(10)
                  .scale(1/220)
                  .colorscale(palette)
                  .appearancetimes(function(d, i){ return i*10 + Math.random()*250;})
                  .height(400);
  
  d3.select("#chart-waffle-1")
    .datum(data)
    .call(chart); 
Footer

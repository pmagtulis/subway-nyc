function slugify(text){
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.trim();                        // Trim - from end of text
}
function waffleChart(selector, data, colorScale, _scaleValue) {
	const width = Math.min(660, window.innerWidth);
	const squareSize = 7;
	const squareMargin = 1;
	const chartMargin = 5;
	const numCols = Math.floor((width - chartMargin) / (squareSize + squareMargin));
	const scaleValue = _scaleValue || 1;
	
	const detailData = [];
	data.forEach((d) => {
		d.class = slugify(d.name);
		d.scaleValue = d.value*scaleValue;
		d3.range(d.scaleValue).forEach(function(e){
			detailData.push({ name: d.name, class: d.class })
		});
	})
	const height = Math.ceil(detailData.length / numCols) * (squareSize + squareMargin) + chartMargin;

	const svg = d3.select(selector)
		.append("svg")
		.style("width", width)
		.style("height", height)

	const rectGroup = svg.append('g')
		.attr('transform', `translate(${chartMargin}, ${chartMargin})`)

	rectGroup.selectAll('rect')
		.data(detailData)
		.enter()
		.append('rect')
		.attr('x', (d, i) => {
			return (i % numCols) * (squareSize + squareMargin)
		})
		.attr('y', (d, i) => {
			return Math.floor(i / numCols) * (squareSize + squareMargin)
		})
		.attr('width', squareSize)
		.attr('height', squareSize)
		.attr('stroke', d => {
			if (d.class == "crime-rate-053") {
				return "#000000"
			}
			return null;
		})
		.attr('fill', d => colorScale(d.class))
}

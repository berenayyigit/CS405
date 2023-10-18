const data = [
  { year: 2009, male_deaths: 203653, female_deaths: 166050 },
  { year: 2010, male_deaths: 200445, female_deaths: 166026 },
  { year: 2011, male_deaths: 206505, female_deaths: 169657 },
  { year: 2012, male_deaths: 207634, female_deaths: 168886 },
  { year: 2013, male_deaths: 205439, female_deaths: 167602 },
  { year: 2014, male_deaths: 213682, female_deaths: 177409 },
  { year: 2015, male_deaths: 222029, female_deaths: 183499 },
  { year: 2016, male_deaths: 231589, female_deaths: 191375 },
  { year: 2017, male_deaths: 233661, female_deaths: 193196 },
  { year: 2018, male_deaths: 233138, female_deaths: 193647 },
  { year: 2019, male_deaths: 238367, female_deaths: 198257 },
  { year: 2020, male_deaths: 285160, female_deaths: 223888 },
  { year: 2021, male_deaths: 309322, female_deaths: 257163 },
  { year: 2022, male_deaths: 275531, female_deaths: 229308 }];

  
  
  
  const svgWidth = 800;
  const svgHeight = 500;
  const margin = { top: 150, right: 90, bottom: 100, left: 80 }; // Adjusted margin for titles
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom -1;
  const barGap = 5; // Gap between the bars
  const yearGap = 60; // Gap between years
  
  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", svgWidth);
  svg.setAttribute("height", svgHeight);
  
  // Draw graph title
  const graphTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
  graphTitle.setAttribute("x", margin.left);
  graphTitle.setAttribute("y", margin.top - 130);
  graphTitle.setAttribute("text-anchor", "start");
  graphTitle.setAttribute("font-weight", "bold");
  graphTitle.setAttribute("font-size", "20px"); // Set the font size
  graphTitle.textContent = "Deaths of Males and Females, 2009-2022";
  svg.appendChild(graphTitle);
  
  // Draw y-axis title
  const yAxisTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yAxisTitle.setAttribute("x", 10); // Adjusted x position for y-axis title
  yAxisTitle.setAttribute("y", margin.top - 80);
  yAxisTitle.setAttribute("text-anchor", "start");
  yAxisTitle.setAttribute("font-weight", "bold");
  yAxisTitle.textContent = "(Number of Death)";
  svg.appendChild(yAxisTitle);
  
  // Calculate scaling factors for the data
  const maxDeaths = Math.max(
    ...data.map((yearData) => Math.max(yearData.male_deaths, yearData.female_deaths))
  );
  const yScale = chartHeight / maxDeaths;
  
  // Draw y-axis
  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", margin.left);
  yAxis.setAttribute("y1", svgHeight - margin.bottom);
  yAxis.setAttribute("x2", margin.left);
  yAxis.setAttribute("y2", margin.top - 33);
  yAxis.setAttribute("stroke", "black");
  svg.appendChild(yAxis);
  
  // Draw a short line at the zero point of the y-axis
  const zeroLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  zeroLine.setAttribute("x1", margin.left);
  zeroLine.setAttribute("y1", svgHeight - margin.bottom);
  zeroLine.setAttribute("x2", margin.left - 5);
  zeroLine.setAttribute("y2", svgHeight - margin.bottom);
  zeroLine.setAttribute("stroke", "black");
  svg.appendChild(zeroLine);
  
  // Draw y-axis labels and short lines
  const yLabels = [...Array.from({ length: Math.ceil(maxDeaths / 50000) }, (_, i) => (i + 1) * 50000)];
  yLabels.forEach((label) => {
    const yPosition = chartHeight - (label * yScale) + margin.top;
    
    // Draw short line on y-axis
    const yLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yLine.setAttribute("x1", margin.left - 5);
    yLine.setAttribute("y1", yPosition);
    yLine.setAttribute("x2", margin.left);
    yLine.setAttribute("y2", yPosition);
    yLine.setAttribute("stroke", "black");
    svg.appendChild(yLine);
  
    // Draw y-axis label
    const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yLabel.setAttribute("x", margin.left - 10);
    yLabel.setAttribute("y", yPosition);
    yLabel.setAttribute("dy", "0.3em"); // Adjust vertical alignment
    yLabel.setAttribute("text-anchor", "end");
    yLabel.textContent = label.toLocaleString(); // Format label
    svg.appendChild(yLabel);
  });
  
  // Draw x-axis
  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", margin.left);
  xAxis.setAttribute("y1", svgHeight - margin.bottom);
  xAxis.setAttribute("x2", chartWidth + margin.left + 57);
  xAxis.setAttribute("y2", svgHeight - margin.bottom);
  xAxis.setAttribute("stroke", "black");
  svg.appendChild(xAxis);
  
  // Add code to draw mini rectangles for male and female bar colors here
const rectWidth = 20;
const rectHeight = 10;
const rectTextOffset = 5; // Offset for the text

const maleColorRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
maleColorRect.setAttribute("x", svgWidth / 2 - rectWidth - 30);
maleColorRect.setAttribute("y", svgHeight - 35);
maleColorRect.setAttribute("width", rectWidth);
maleColorRect.setAttribute("height", rectHeight);
maleColorRect.setAttribute("fill", "blue");
svg.appendChild(maleColorRect);

const maleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
maleText.setAttribute("x", svgWidth / 2 - 25);
maleText.setAttribute("y", svgHeight - 25);
maleText.setAttribute("text-anchor", "start");
maleText.textContent = "Male";
svg.appendChild(maleText);

const femaleColorRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
femaleColorRect.setAttribute("x", svgWidth / 2 + 20);
femaleColorRect.setAttribute("y", svgHeight - 35);
femaleColorRect.setAttribute("width", rectWidth);
femaleColorRect.setAttribute("height", rectHeight);
femaleColorRect.setAttribute("fill", "red");
svg.appendChild(femaleColorRect);

const femaleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
femaleText.setAttribute("x", svgWidth / 2 + 45);
femaleText.setAttribute("y", svgHeight -25);
femaleText.setAttribute("text-anchor", "start");
femaleText.textContent = "Female";
svg.appendChild(femaleText);

  // Draw short lines and bars for each year
  data.forEach((yearData, index) => {
    const x = margin.left + index * ((chartWidth + yearGap) / data.length); // Adjusted x position
    const midpointX = x + (chartWidth / (2 * data.length));
  
    // Draw short line on x-axis
    const xLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xLine.setAttribute("x1", x);
    xLine.setAttribute("y1", svgHeight - margin.bottom);
    xLine.setAttribute("x2", x);
    xLine.setAttribute("y2", svgHeight - margin.bottom + 5);
    xLine.setAttribute("stroke", "black");
    svg.appendChild(xLine);
  
    // Draw male deaths bar 
    const maleHeight = yearData.male_deaths * yScale;
    const maleBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    maleBar.setAttribute("x", x + barGap ); // Adjusted x position
    maleBar.setAttribute("y", chartHeight - maleHeight + margin.top);
    maleBar.setAttribute("width", (chartWidth / (2 * data.length)) - barGap);
    maleBar.setAttribute("height", maleHeight);
    maleBar.setAttribute("fill", "blue");
    svg.appendChild(maleBar);
  
    // Display male deaths text vertically at the bottom center
    const maleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    maleText.setAttribute("x", x + (chartWidth / (2 * data.length)) - 9);
    maleText.setAttribute("y", chartHeight + margin.top - 45);
    maleText.setAttribute("dy", "01em");
    maleText.setAttribute("text-anchor", "middle");
    maleText.setAttribute("writing-mode", "tb"); // Vertical writing mode
    maleText.setAttribute("glyph-orientation-vertical", "0");
    maleText.setAttribute("fill", "white");  // Set fill color to white
    maleText.setAttribute("font-weight", "bold"); // Set font weight to bold
    maleText.setAttribute("font-size", "14px"); // Set the font size
    maleText.textContent = yearData.male_deaths.toLocaleString();
    svg.appendChild(maleText);
  
    // Draw female deaths bar starting from midpoint
    const femaleHeight = yearData.female_deaths * yScale;
    const femaleBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    femaleBar.setAttribute("x", midpointX + barGap / 10); // Adjusted x position
    femaleBar.setAttribute("y", chartHeight - femaleHeight + margin.top);
    femaleBar.setAttribute("width", (chartWidth / (2 * data.length)) - barGap);
    femaleBar.setAttribute("height", femaleHeight);
    femaleBar.setAttribute("fill", "red");
    svg.appendChild(femaleBar);
  
    // Display female deaths text vertically at the bottom center
    const femaleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    femaleText.setAttribute("x", midpointX + (chartWidth / (2 * data.length)) - 13);
    femaleText.setAttribute("y", chartHeight + margin.top - 45);
    femaleText.setAttribute("dy", "1em");
    femaleText.setAttribute("text-anchor", "middle");
    femaleText.setAttribute("writing-mode", "tb"); // Vertical writing mode
    femaleText.setAttribute("glyph-orientation-vertical", "0");
    femaleText.setAttribute("fill", "white");  // Set fill color to white
    femaleText.setAttribute("font-weight", "bold"); // Set font weight to bold
    femaleText.setAttribute("font-size", "14px"); // Set the font size
    femaleText.textContent = yearData.female_deaths.toLocaleString();
    svg.appendChild(femaleText);
  
    // Add year label
    const yearLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yearLabel.setAttribute("x", midpointX);
    yearLabel.setAttribute("y", svgHeight - 75);
    yearLabel.setAttribute("text-anchor", "middle");
    yearLabel.textContent = yearData.year;
    svg.appendChild(yearLabel);
  });
  
  // Append the SVG to the DOM
  document.body.appendChild(svg);
  
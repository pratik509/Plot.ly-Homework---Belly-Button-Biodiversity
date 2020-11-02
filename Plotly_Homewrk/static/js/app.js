
  
   d3.json("data/samples.json").then((data) => {

   
    data.metadata.forEach(d => {d3.select("#selDataset").append("option").attr("value", d.id).text(d.id);
    console.log(data.metadata);    
  
  });

})

    function chart(barchart) {
    
            var bar = [{
            type: 'bar',
            x: barchart.sample_values.slice(0, 9).reverse(),
            y: barchart.otu_ids.slice(0, 9).reverse().map(d => `OTU ${d}`),
            orientation: 'h',
          }];       
    
              Plotly.newPlot('bar', bar);

            var bubble = {
              x: barchart.otu_ids,
              y: barchart.sample_values,
             mode: 'markers',
             text: barchart.otu_labels,
             marker: {color: barchart.otu_ids,size: barchart.sample_values,
            
            }
          };
          
          var sample = [bubble];
          
          var bubble_layout = {
            xaxis: { title: "OTU ID" },
            showlegend: false,
          };
          
            Plotly.newPlot('bubble', sample, bubble_layout);

        }

        
function optionChanged(id) {

    d3.json("data/samples.json").then((data) =>{

        demgraphics = data.metadata.find(d => d.id == id);
        d3.select("#sample-metadata").html("");
        Object.entries(demgraphics).forEach(([key, values]) => {d3.select("#sample-metadata").append("p").text(`${key}: ${values}`)
      
        });
        
        var barchart = data.samples.find(d => d.id == id);
        chart(barchart);
        

    })}


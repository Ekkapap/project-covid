import React from 'react';
import { select } from 'd3';
import * as d3 from 'd3-geo';

function D3({ mapData }: any) {
  const rn = React.useRef(null);

  React.useEffect(() => {
    renderMap();
  }, [mapData]);

  const renderMap = () => {
    const node: any = rn.current;
    const width = node.width.animVal.value;
    const height = node.height.animVal.value;

    const projection = () => {
      return d3
        .geoMercator()
        .scale(260)
        .translate([width / 2, height / 2]);
    };
    select(node).append('g').classed('countries', true);
    const countries = select('g').selectAll('path').data(mapData);

    countries
      .enter()
      .append('path')
      .classed('country', true)
      .attr('fill', 'red')
      .attr('stroke', 'green')
      .attr('strokeWidth', 0.25)
      .each(function (d: any, i: any) {
        select(this).attr('d', d3.geoPath().projection(projection())(d));
      });
  };

  return <svg width={1000} height={500} ref={rn} />;
}

export default D3;

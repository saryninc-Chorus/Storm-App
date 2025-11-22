import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  radius: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number;
  source: string | Node;
  target: string | Node;
}

export const NetworkVisualizer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    
    // Initial setup delay to ensure container is rendered
    const timer = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const { width, height } = dimensions;

    // Generate Crystalline Nodes
    const nodes: Node[] = Array.from({ length: 40 }, (_, i) => ({
      id: `node-${i}`,
      group: i === 0 ? 1 : Math.floor(Math.random() * 3) + 2, // 1 is core, 2-4 are satellites
      radius: i === 0 ? 20 : Math.random() * 5 + 3,
      x: width / 2 + (Math.random() - 0.5) * 50,
      y: height / 2 + (Math.random() - 0.5) * 50
    }));

    // Generate Links
    const links: Link[] = [];
    
    // Connect everything to core (index 0) or sub-clusters
    nodes.forEach((node, i) => {
      if (i > 0) {
        // Connect to core
        if (Math.random() > 0.7) {
             links.push({ source: nodes[0].id, target: node.id, value: 1 });
        }
        // Connect to nearest neighbors
        const targetIndex = Math.floor(Math.random() * i);
        links.push({ source: nodes[targetIndex].id, target: node.id, value: 0.5 });
      }
    });

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 5));

    // Draw elements
    const link = svg.append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", (d: any) => d.source.id === nodes[0].id || d.target.id === nodes[0].id ? "#22d3ee" : "#4c1d95")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value) * 1.5);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => d.group === 1 ? "#06b6d4" : d.group === 2 ? "#c084fc" : "#f59e0b")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .style("cursor", "grab")
      .call(drag(simulation) as any);

    // Add pulse effect to core
    const corePulse = svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", 20)
      .attr("fill", "none")
      .attr("stroke", "#06b6d4")
      .attr("stroke-width", 2)
      .attr("opacity", 1);

    function pulse() {
      corePulse
        .transition()
        .duration(2000)
        .attr("r", 60)
        .attr("opacity", 0)
        .on("end", () => {
           corePulse.attr("r", 20).attr("opacity", 1);
           pulse();
        });
    }
    pulse();

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
        
      // Update pulse center if core moves (though forceCenter keeps it mostly middle)
      const core = nodes[0];
      if (core && core.x && core.y) {
        corePulse.attr("cx", core.x).attr("cy", core.y);
      }
    });

    function drag(sim: any) {
      function dragstarted(event: any) {
        if (!event.active) sim.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) sim.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };
  }, [dimensions]);

  return (
    <div className="h-full w-full glass-panel rounded-2xl overflow-hidden p-1 flex flex-col relative" ref={containerRef} style={{ minHeight: '600px' }}>
      <div className="absolute top-4 left-4 z-10 pointer-events-none select-none">
         <h2 className="text-xl font-bold text-white">Network Topology</h2>
         <p className="text-sm text-slate-400">Active Nodes: 40 | Harmonics: Stable</p>
      </div>
      <svg ref={svgRef} width="100%" height="100%" className="cursor-crosshair flex-1" style={{ minHeight: '600px' }}></svg>
    </div>
  );
};
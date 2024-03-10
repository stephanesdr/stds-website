// "use client";
import { cn } from "../../utils/cn";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import 'context-filter-polyfill';

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 450,
  backgroundFill = "#FF33EC",
  blur = 30,
  speed = "slow",
  waveOpacity = 0.6,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);



  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.00009;
      case "fast":
        return 0.0002;
      default:
        return 0.001;
    }
  };

  const init = () => {

    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
      location.reload();
    };
    render();
  };



//   // Define our viewportWidth variable
//   let viewportWidth: any;

//   // Set/update the viewportWidth value
//   let setViewportWidth = function () {
//       viewportWidth = window.innerWidth || document.documentElement.clientWidth;
//   }
  
//   // Log the viewport width into the console
//   let waveSize:any = function (e:number) {
//       if (viewportWidth <= 640) {
//           e = 900;
//       } else {
//           e = 10;
//       }
//   }
  
  
  
//   // Set our initial width and log it
//   setViewportWidth();
 

  const waveColors = colors ?? [
   
    "#FF3348",
    "#FF3388",
    "#FF4537"

  ];
  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 100;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 375;
        ctx.lineTo(x, y + h * .8); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    ctx.fillStyle = backgroundFill || "#FF3348";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(3);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);





  return (
    <div
      className={cn(
        "h-lvh flex flex-col items-center justify-start !bg-[#FF3348]",
        containerClassName
      )}
    >
      <canvas
        className="absolute max-w-full w-lvw inset-0 z-0 !bg-[#FF3348]"
        ref={canvasRef}
        id="canvas"
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

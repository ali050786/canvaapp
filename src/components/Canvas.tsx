import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const WORKSPACE_WIDTH = 1080;
const WORKSPACE_HEIGHT = 1800;

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const initWorkspace = (fabricCanvas: fabric.Canvas) => {
    const workspace = new fabric.Rect({
      width: WORKSPACE_WIDTH,
      height: WORKSPACE_HEIGHT,
      fill: 'white',
      selectable: false,
      name: 'workspace',
    });

    fabricCanvas.add(workspace);
    centerWorkspace(fabricCanvas, workspace);
  };

  const centerWorkspace = (fabricCanvas: fabric.Canvas, workspace: fabric.Object) => {
    const canvasWidth = fabricCanvas.width!;
    const canvasHeight = fabricCanvas.height!;
    const scale = Math.min(
      (canvasWidth * 0.9) / WORKSPACE_WIDTH,
      (canvasHeight * 0.9) / WORKSPACE_HEIGHT
    );

    fabricCanvas.setZoom(scale);
    workspace.set({
      left: (canvasWidth - WORKSPACE_WIDTH * scale) / 2 / scale,
      top: (canvasHeight - WORKSPACE_HEIGHT * scale) / 2 / scale,
    });

    fabricCanvas.renderAll();
  };

  useEffect(() => {
    const initCanvas = () => {
      if (!canvasRef.current) return;

      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#f0f0f0',
      });

      initWorkspace(fabricCanvas);
      setCanvas(fabricCanvas);
    };

    initCanvas();

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvas) {
        canvas.setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        const workspace = canvas.getObjects().find(obj => obj.name === 'workspace');
        if (workspace) {
          centerWorkspace(canvas, workspace);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvas]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
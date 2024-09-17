import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface MyBoard {
  brushColor: string;
  brushSize: number;
}

const Board: React.FC<MyBoard> = ({ brushColor, brushSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState(null);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  // Handle socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  // Handle canvas updates from other users
  useEffect(() => {
    if (socket) {
      socket.on('canvasImage', (data: string) => {
        const image = new Image();
        image.src = data;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        image.onload = () => {
          ctx?.drawImage(image, 0, 0);
        };
      });
    }
  }, [socket]);

  useEffect(() => {
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: { offsetX: number; offsetY: number; }) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const draw = (e: { offsetX: number; offsetY: number; }) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const endDrawing = () => {
      const canvas = canvasRef.current;
      const dataURL = canvas?.toDataURL();
      if (socket && dataURL) {
        socket.emit('canvasImage', dataURL);
      }
      isDrawing = false;
    };

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    canvas?.addEventListener('mousedown', startDrawing);
    canvas?.addEventListener('mousemove', draw);
    canvas?.addEventListener('mouseup', endDrawing);
    canvas?.addEventListener('mouseout', endDrawing);

    return () => {
      canvas?.removeEventListener('mousedown', startDrawing);
      canvas?.removeEventListener('mousemove', draw);
      canvas?.removeEventListener('mouseup', endDrawing);
      canvas?.removeEventListener('mouseout', endDrawing);
    };
  }, [brushColor, brushSize, socket]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={windowSize[0] > 600 ? 600 : 300}
      height={windowSize[1] > 400 ? 400 : 200}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default Board;

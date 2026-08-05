import React, { useEffect, useRef } from 'react';

const AudioBars: React.FC = () => {
  const barsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const smoothed = useRef(new Array(5).fill(0));

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let animationId: number;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 32;
        analyser.smoothingTimeConstant = 0.4;

        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const animate = () => {
          analyser.getByteFrequencyData(dataArray);

          const containerH = containerRef.current?.offsetHeight ?? 40;
          const maxVal = Math.max(...dataArray, 1);
          const isSilent = maxVal < 10;

          barsRef.current.forEach((bar, index) => {
            if (!bar) return;
            const target = isSilent ? 0 : (dataArray[index] || 0) / maxVal
            smoothed.current[index] += (target - smoothed.current[index]) * 0.2;
            const height = Math.max(4, smoothed.current[index] * containerH * 0.8);
            bar.style.height = `${height}px`;
          });

          animationId = requestAnimationFrame(animate);
        };

        animate();
      });

    return () => {
      cancelAnimationFrame(animationId);
      if (audioContext) audioContext.close();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', gap: 4, height: 32 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => { if (el) barsRef.current[index] = el; }}
          style={{ width: 3, height: 4, borderRadius: 999, background: '#0d6efd', transition: 'height 40ms linear' }}
        />
      ))}
    </div>
  );
};

export default AudioBars;
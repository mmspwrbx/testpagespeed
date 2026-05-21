import React, { useEffect, useState } from "react";
import "./Gallery.css";

const images = Array.from({ length: 30 }, (_, index) => {
  const fileName = String(index + 1).padStart(3, "0");
  return {
    id: index + 1,
    url: `/images/${fileName}.webp`,
    alt: `Демонстрационное изображение ${fileName}`,
  };
});

export const Gallery: React.FC = () => {
  const [loadTime, setLoadTime] = useState<string>("Загрузка...");

  useEffect(() => {
    // Функция для фиксации времени
    const measureLoadTime = () => {
      // performance.now() возвращает точное время в миллисекундах с начала загрузки
      const timeInSeconds = (performance.now() / 1000).toFixed(2);
      setLoadTime(`${timeInSeconds} сек.`);
    };

    // Проверяем, загрузилась ли страница. Если да — считаем сразу.
    if (document.readyState === "complete") {
      measureLoadTime();
    } else {
      // Иначе ждем события полной загрузки
      window.addEventListener("load", measureLoadTime);
      return () => window.removeEventListener("load", measureLoadTime);
    }
  }, []);

  const handleRefreshAndClearCache = () => {
    // Перезагружаем страницу с уникальным параметром, чтобы 100% обойти кэш браузера
    window.location.href = window.location.pathname + "?t=" + Date.now();
  };

  return (
    <div className="gallery-container">
      {/* Плавающий виджет */}
      <div className="performance-widget">
        <p className="timer-text">
          Время загрузки: <span>{loadTime}</span>
        </p>
        <button onClick={handleRefreshAndClearCache} className="refresh-button">
          Сбросить кэш и обновить
        </button>
      </div>

      <header className="gallery-header">
        <h1>Демонстрация производительности галереи</h1>
        <p>30 изображений загружаются без задержек интерфейса.</p>
      </header>

      <main className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-wrapper">
            <img
              src={image.url}
              alt={image.alt}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className="optimized-image"
            />
          </div>
        ))}
      </main>
    </div>
  );
};

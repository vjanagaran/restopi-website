// src/utils/generateOGImage.js
import { createCanvas, loadImage } from 'canvas';

export async function generateOGImage(data) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, '#2D2A6E');
  gradient.addColorStop(1, '#C2410C');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);
  
  // Add pattern overlay
  ctx.globalAlpha = 0.1;
  const pattern = await loadImage('/pattern.png');
  ctx.drawImage(pattern, 0, 0, 1200, 630);
  ctx.globalAlpha = 1;
  
  // Text content
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 72px Inter';
  ctx.fillText(data.city, 60, 150);
  
  ctx.font = 'bold 56px Inter';
  ctx.fillText(`${data.segment} Restaurants`, 60, 230);
  
  ctx.fillStyle = '#FF8C00';
  ctx.font = 'bold 84px Inter';
  ctx.fillText('Save ₹2 Lakhs Monthly', 60, 350);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '42px Inter';
  ctx.fillText('Home by 10 PM • Guaranteed', 60, 450);
  
  // Logo
  const logo = await loadImage('/logo-white.png');
  ctx.drawImage(logo, 1000, 500, 150, 75);
  
  return canvas.toBuffer('image/png');
}
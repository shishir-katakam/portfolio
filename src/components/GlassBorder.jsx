import './GlassBorder.css';

export default function GlassBorder({ children, color = 'blue', className = '' }) {
  const colorClass = color === 'blue' ? 'glass-border-blue' : color === 'pink' ? 'glass-border-pink' : '';
  
  return (
    <div className={`glass-border ${colorClass} ${className}`}>
      <div className="glass-border-content">
        {children}
      </div>
    </div>
  );
}



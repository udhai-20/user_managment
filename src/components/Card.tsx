export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={`rounded-lg border bg-white shadow-md p-4 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-2 ${className}`}>{children}</div>;
  }
  
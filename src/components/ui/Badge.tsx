import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'saffron' | 'gold';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {children}
    </span>
  );
}

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const variantMap = {
    Easy: 'success',
    Moderate: 'warning',
    Challenging: 'error',
  } as const;
  return <Badge variant={variantMap[difficulty]}>{difficulty}</Badge>;
}

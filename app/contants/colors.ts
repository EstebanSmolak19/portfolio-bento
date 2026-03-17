export type CardAccent = 'blue' | 'purple' | 'cyan' | 'amber' | 'rose'

export const CARD_COLORS: Record<CardAccent, any> = {
  blue: {
    border: 'rgba(99, 102, 241, 0.2)',
    borderHover: 'rgba(99, 102, 241, 0.5)',
    borderBottom: 'rgba(99, 102, 241, 0.2)',
    shadow: 'rgba(99, 102, 241, 0.3)',
    shadowNeon: 'rgba(99, 102, 241, 0.4)',
    headerGradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(79,70,229,0.08))',
  },
  purple: {
    border: 'rgba(139, 92, 246, 0.2)',
    borderHover: 'rgba(139, 92, 246, 0.5)',
    borderBottom: 'rgba(139, 92, 246, 0.2)',
    shadow: 'rgba(139, 92, 246, 0.3)',
    shadowNeon: 'rgba(139, 92, 246, 0.4)',
    headerGradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(109,40,217,0.08))',
  },
  cyan: {
    border: 'rgba(6, 182, 212, 0.2)',
    borderHover: 'rgba(6, 182, 212, 0.5)',
    borderBottom: 'rgba(6, 182, 212, 0.2)',
    shadow: 'rgba(6, 182, 212, 0.3)',
    shadowNeon: 'rgba(6, 182, 212, 0.4)',
    headerGradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(8,145,178,0.08))',
  },
  amber: {
    border: 'rgba(245, 158, 11, 0.2)',
    borderHover: 'rgba(245, 158, 11, 0.5)',
    borderBottom: 'rgba(245, 158, 11, 0.2)',
    shadow: 'rgba(245, 158, 11, 0.3)',
    shadowNeon: 'rgba(245, 158, 11, 0.4)',
    headerGradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.08))',
  },
  rose: {
    border: 'rgba(244, 63, 94, 0.2)',
    borderHover: 'rgba(244, 63, 94, 0.5)',
    borderBottom: 'rgba(244, 63, 94, 0.2)',
    shadow: 'rgba(244, 63, 94, 0.3)',
    shadowNeon: 'rgba(244, 63, 94, 0.4)',
    headerGradient: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(190,18,60,0.08))',
  },
}
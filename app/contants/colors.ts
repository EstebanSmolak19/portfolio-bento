export const CARD_COLORS = {
    blue: {
        base: 'rgba(99, 102, 241)',
        border: 'rgba(99, 102, 241, 0.3)',
        borderHover: 'rgba(99, 102, 241, 0.6)',
        shadow: 'rgba(99, 102, 241, 0.5)',
        shadowNeon: 'rgba(99, 102, 241, 0.7)',
        headerGradient: 'linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(79, 70, 229, 0.2))',
        borderBottom: 'rgba(99, 102, 241, 0.2)',
        text: 'rgba(199, 210, 254)'
    },
    purple: {
        base: 'rgba(124, 58, 237)',
        border: 'rgba(124, 58, 237, 0.3)',
        borderHover: 'rgba(124, 58, 237, 0.6)',
        shadow: 'rgba(124, 58, 237, 0.5)',
        shadowNeon: 'rgba(139, 92, 246, 0.7)',
        headerGradient: 'linear-gradient(to right, rgba(124, 58, 237, 0.2), rgba(109, 40, 217, 0.2))',
        borderBottom: 'rgba(124, 58, 237, 0.2)',
        text: 'rgba(196, 181, 253)'
    },
    cyan: {
        base: 'rgba(34, 211, 238)',
        border: 'rgba(34, 211, 238, 0.3)',
        borderHover: 'rgba(34, 211, 238, 0.6)',
        shadow: 'rgba(34, 211, 238, 0.5)',
        shadowNeon: 'rgba(34, 211, 238, 0.7)',
        headerGradient: 'linear-gradient(to right, rgba(34, 211, 238, 0.2), rgba(6, 182, 212, 0.2))',
        borderBottom: 'rgba(34, 211, 238, 0.2)',
        text: 'rgba(165, 243, 252)'
    },
    emerald: {
        base: 'rgba(16, 185, 129)',
        border: 'rgba(16, 185, 129, 0.3)',
        borderHover: 'rgba(16, 185, 129, 0.6)',
        shadow: 'rgba(16, 185, 129, 0.5)',
        shadowNeon: 'rgba(16, 185, 129, 0.7)',
        headerGradient: 'linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
        borderBottom: 'rgba(16, 185, 129, 0.2)',
        text: 'rgba(110, 231, 183)'
    },
    amber: {
        base: 'rgba(245, 158, 11)',
        border: 'rgba(245, 158, 11, 0.3)',
        borderHover: 'rgba(245, 158, 11, 0.6)',
        shadow: 'rgba(245, 158, 11, 0.5)',
        shadowNeon: 'rgba(245, 158, 11, 0.7)',
        headerGradient: 'linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2))',
        borderBottom: 'rgba(245, 158, 11, 0.2)',
        text: 'rgba(253, 230, 138)'
    },
    rose: {
        base: 'rgba(244, 63, 94)',
        border: 'rgba(244, 63, 94, 0.3)',
        borderHover: 'rgba(244, 63, 94, 0.6)',
        shadow: 'rgba(244, 63, 94, 0.5)',
        shadowNeon: 'rgba(244, 63, 94, 0.7)',
        headerGradient: 'linear-gradient(to right, rgba(244, 63, 94, 0.2), rgba(225, 29, 72, 0.2))',
        borderBottom: 'rgba(244, 63, 94, 0.2)',
        text: 'rgba(251, 207, 232)'
    }
} as const;

export type CardAccent = keyof typeof CARD_COLORS;
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./templates/**/*.html",  // Wszystkie szablony Django
        "./frontend/src/**/*.js", // Pliki JavaScript Reacta
        "./static/js/**/*.js", // Pliki JavaScript w static
        "./frontend/static/js/**/*.js" // Pliki JavaScript w build Reacta
    ],
    safelist: [
        'bg-green-700',
        'bg-red-700',
        'bg-blue-600',
        'bg-green-600',
        'bg-red-600',
        'bg-blue-500',
        'bg-green-500',
        'bg-red-500',
        'my-1',
        'w-full',
        'relative',
        'sticky',
        'border',
        'border-gray-300',
        'rounded',
        'px-3',
        'py-2',
        'focus:outline-none',
        'focus:border-blue-500',
        'text-sm',
        'text-gray-600',
        'mb-1',
        'flex',
        'flex-col',
        'gap-4',
        'object-contain',
        'filter',
        'contrast-125',
        "bg-black",
        "w-full",
        "text-white",
        "max-w-[1400px]",
        "mx-auto",
        "flex",
        "justify-between",
        "items-center",
        "py-4",
        "px-6"
    ],

    theme: {
        extend: {
            keyframes: {
                slideInDown: {
                    from: {transform: "translateY(-10px)", opacity: "0"},
                    to: {transform: "translateY(0)", opacity: "1"},
                },
                slideOutUp: {
                    from: {transform: "translateY(0)", opacity: "1"},
                    to: {transform: "translateY(-10px)", opacity: "0"},
                },
                spinSlow: {
                    from: {transform: "rotate(0deg)"},
                    to: {transform: "rotate(360deg)"},
                },
                blink: {
                    '0%, 100%': {backgroundColor: 'transparent'},
                    '50%': {backgroundColor: '#d1f7c4'} // Blady zielony
                },
                glow: {
                    '0%, 100%': {filter: 'brightness(1)'},
                    '50%': {filter: 'brightness(4.5)'},
                },
                heart: {
                    '0%': {filter: 'brightness(1)'},
                    '15%': {filter: 'brightness(4)'},
                    '30%': {filter: 'brightness(2)'},
                    '50%': {filter: 'brightness(4)'},
                    '70%': {filter: 'brightness(1.5)'},
                    '100%': {filter: 'brightness(1)'}
                }
            },
            animation: {
                slideInDown: "slideInDown 0.5s ease-in-out",
                slideOutUp: "slideOutUp 0.5s ease-in-out",
                glow: 'glow 5s infinite ease-in-out',
                heart: 'heart 2s infinite ease-in-out',
                'blink-green': 'blink 2s infinite', // Animacja co 2 sekundy
                "spin-slow": "spinSlow 3s linear infinite",
            },
            maxWidth: {
                '1250': '1250px', // Dodanie maksymalnej szerokości 1250px
            },
            borderWidth: {
                3: '3px',
            },
        },
        container: {
            center: true, // Automatyczne centrowanie kontenera
            padding: '1rem', // Dodaj opcjonalny padding, jeśli jest wymagany
        },
    },
    plugins: [],
};
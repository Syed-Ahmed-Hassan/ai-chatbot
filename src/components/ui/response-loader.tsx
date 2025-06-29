export default function ResponseLoader() {
  const text = "Thinking";

  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-block">
        {/* Base text */}
        <span className="text-gray-500 text-sm font-medium select-none">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="relative inline-block animate-character-highlight"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: "1.2s",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes character-highlight {
            0%, 12.5% { color: rgb(107 114 128); } /* gray-500 */
            25%, 37.5% { color: rgb(255 255 255); } /* white highlight */
            50%, 100% { color: rgb(107 114 128); } /* back to gray-500 */
          }
          .animate-character-highlight {
            animation: character-highlight 1.6s ease-in-out infinite;
          }
        `,
        }}
      />
    </div>
  );
}

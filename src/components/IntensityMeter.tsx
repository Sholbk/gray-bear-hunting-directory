interface IntensityMeterProps {
  level: number;
  showLabel?: boolean;
}

const labels = ["", "Easy", "Moderate", "Challenging", "Strenuous", "Extreme"];

export default function IntensityMeter({
  level,
  showLabel = true,
}: IntensityMeterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2.5 h-5 rounded-sm ${
              i <= level
                ? level <= 2
                  ? "bg-green-500"
                  : level <= 3
                  ? "bg-amber-brand"
                  : "bg-red-500"
                : "bg-gray-light"
            }`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-gray-muted">{labels[level]}</span>
      )}
    </div>
  );
}

interface IntensityMeterProps {
  level: number;
  showLabel?: boolean;
}

const labels = ["N/A", "Easy", "Moderate", "Challenging", "Strenuous", "Extreme"];

export default function IntensityMeter({
  level,
  showLabel = true,
}: IntensityMeterProps) {
  if (!level) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted">N/A</span>
      </div>
    );
  }

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
                  ? "bg-accent"
                  : "bg-red-500"
                : "bg-border"
            }`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-text-muted">{labels[level]}</span>
      )}
    </div>
  );
}

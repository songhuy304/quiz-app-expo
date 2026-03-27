type ProgressColorOptions = {
  safeThreshold?: number;
  warningThreshold?: number;
  safeColor?: string;
  warningColor?: string;
  dangerColor?: string;
};

const DEFAULT_PROGRESS_COLORS: Required<ProgressColorOptions> = {
  safeThreshold: 0.5,
  warningThreshold: 0.2,
  safeColor: "#4f46e5",
  warningColor: "#f59e0b",
  dangerColor: "#ef4444",
};

export function getProgressColorByRatio(
  ratio: number,
  options: ProgressColorOptions = {},
): string {
  const {
    safeThreshold,
    warningThreshold,
    safeColor,
    warningColor,
    dangerColor,
  } = {
    ...DEFAULT_PROGRESS_COLORS,
    ...options,
  };

  const normalizedRatio = Math.min(Math.max(ratio, 0), 1);

  if (normalizedRatio > safeThreshold) return safeColor;
  if (normalizedRatio > warningThreshold) return warningColor;

  return dangerColor;
}


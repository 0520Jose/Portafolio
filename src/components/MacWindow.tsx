import React from "react";
import { useCardTilt } from "../hooks/useCardTilt";
import { Lock, RefreshCw, Terminal, Layers } from "lucide-react";

interface MacWindowProps {
  title?: string;
  url?: string;
  icon?: "terminal" | "browser" | "code" | "default";
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  maxTiltAngle?: number;
  headerRight?: React.ReactNode;
  statusBadge?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  title,
  url,
  icon = "default",
  children,
  className = "",
  enableTilt = true,
  maxTiltAngle = 4,
  headerRight,
  statusBadge,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  const { ref, onMouseMove, onMouseLeave } = useCardTilt(enableTilt ? maxTiltAngle : 0);

  return (
    <div
      ref={enableTilt ? ref : undefined}
      onMouseMove={enableTilt ? onMouseMove : undefined}
      onMouseLeave={enableTilt ? onMouseLeave : undefined}
      className={`mac-window bg-surface/90 backdrop-blur-md border border-border group ${className}`}
    >
      {/* macOS Window Chrome Header */}
      <div className="mac-titlebar bg-surface-hover/60 border-b border-border/80 px-4 py-3 flex items-center justify-between gap-3">
        {/* Mac Traffic Light Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="mac-dot mac-dot-close cursor-pointer"
            title="Cerrar"
          />
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Minimizar ventana"
            className="mac-dot mac-dot-minimize cursor-pointer"
            title="Minimizar"
          />
          <button
            type="button"
            onClick={onMaximize}
            aria-label="Maximizar ventana"
            className="mac-dot mac-dot-maximize cursor-pointer"
            title="Maximizar"
          />
        </div>

        {/* URL Bar (if browser) or Centered Title */}
        {url ? (
          <div className="flex-1 max-w-md mx-auto flex items-center gap-2 px-3 py-1 rounded-md bg-surface border border-border/80 text-[11px] font-mono text-muted truncate">
            <Lock size={11} className="text-primary shrink-0" />
            <span className="truncate">{url}</span>
            <RefreshCw size={10} className="text-muted/60 ml-auto shrink-0" />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted truncate">
            {icon === "terminal" && <Terminal size={13} className="text-primary shrink-0" />}
            {icon === "code" && <Layers size={13} className="text-primary shrink-0" />}
            <span className="truncate text-neutral-700 dark:text-neutral-300 font-medium">
              {title || "bash — 80x24"}
            </span>
          </div>
        )}

        {/* Right Status or Action */}
        <div className="flex items-center gap-2 shrink-0">
          {statusBadge && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {statusBadge}
            </span>
          )}
          {headerRight}
        </div>
      </div>

      {/* Window Body */}
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
};

"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({ 
  className = "", 
  variant = "rectangular",
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClasses = "bg-dark-800 animate-pulse";
  
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded",
    card: "rounded border-4 border-dark-700",
  };

  const style = {
    width: width || "100%",
    height: height || (variant === "text" ? "1rem" : "100%"),
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            className={`${baseClasses} ${variantClasses.text}`}
            style={{ 
              ...style, 
              width: i === lines - 1 ? "75%" : "100%",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Skeleton Cards for specific use cases
export function FeatureCardSkeleton() {
  return (
    <div className="bg-dark-900 border-4 border-dark-700 p-6">
      <Skeleton variant="rectangular" width={48} height={48} className="mb-4" />
      <Skeleton variant="text" width="60%" className="mb-3" />
      <Skeleton variant="text" lines={3} />
    </div>
  );
}

export function ReleaseCardSkeleton() {
  return (
    <div className="bg-dark-900 border-4 border-dark-700 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton variant="text" width={80} height={28} />
            <Skeleton variant="rectangular" width={60} height={24} />
          </div>
          <Skeleton variant="text" width={150} className="mb-3" />
          <div className="space-y-2">
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="75%" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={36} height={36} />
          <Skeleton variant="rectangular" width={36} height={36} />
        </div>
      </div>
    </div>
  );
}

export function SubscriberRowSkeleton() {
  return (
    <tr className="border-b border-dark-700">
      <td className="py-3 px-4"><Skeleton variant="text" width={200} /></td>
      <td className="py-3 px-4"><Skeleton variant="text" width={100} /></td>
      <td className="py-3 px-4"><Skeleton variant="rectangular" width={70} height={24} /></td>
      <td className="py-3 px-4"><Skeleton variant="rectangular" width={32} height={32} /></td>
    </tr>
  );
}

export function DownloadCardSkeleton() {
  return (
    <div className="bg-dark-900 border-4 border-dark-700 p-6 text-center">
      <Skeleton variant="rectangular" width={64} height={64} className="mx-auto mb-4" />
      <Skeleton variant="text" width="60%" className="mx-auto mb-2" />
      <Skeleton variant="text" width="40%" className="mx-auto mb-4" />
      <Skeleton variant="rectangular" width="100%" height={48} />
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-dark-900 border-4 border-dark-700 p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Skeleton variant="rectangular" width={128} height={128} />
        <div className="flex-1 text-center md:text-left space-y-3">
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton variant="text" width={300} />
          <Skeleton variant="text" width={250} />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-dark-900 border-4 border-dark-700 p-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="rectangular" width={56} height={56} />
        <div className="space-y-2">
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={80} height={28} />
        </div>
      </div>
    </div>
  );
}

export function AuditLogSkeleton() {
  return (
    <tr className="border-b border-dark-800">
      <td className="py-2 px-2"><Skeleton variant="text" width={120} /></td>
      <td className="py-2 px-2"><Skeleton variant="rectangular" width={100} height={24} /></td>
      <td className="py-2 px-2"><Skeleton variant="text" width={80} /></td>
      <td className="py-2 px-2"><Skeleton variant="text" width={150} /></td>
    </tr>
  );
}

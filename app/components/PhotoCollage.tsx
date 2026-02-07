"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  tag?: string;
  customSize?: { width: number; height: number; className: string };
}

// Get all photos from personalityv2 folder (all PNG/JPG/JPEG files)
const getPersonalityPhotos = (): Photo[] => {
  // MANUAL LABELS: Edit this object to add/change labels for each photo
  // Use the base filename (without extension) as the key
  const photoTags: Record<string, string> = {
    // Example labels - update these with your actual photo labels
    '0071': 'One bite challenge',
    '0200': 'Santa Cruz Beach',
    'DSC03021': 'Saucin',
    'DSC06955': 'Summer 2025',
    '1658': 'MALATANG',
    '3018': 'Prime Langdon',
    '3706': 'Travel',
    '7700_Original': 'Cody Big Little Reveal',
    '70DEFB56': 'High School Soccer',
    '3J8A4081': 'High School Golf',
    '0435': '67',
    '0528': 'Pokemon Card Show',
    '0534': 'SLOWPOKE',
    '0850': 'Cal family',
    '1167': 'Poker with Friends',
    '1432': 'GBO in San Francisco',
    '1555': 'Minamino',
    '1598': 'Poker Tournament 2025',
    '1638': 'Me and Oski!',
    '1912': 'MUNCHLAX',
    '1937': 'Shopping in Tokyo',
    '2530': 'Beach',
    '2637': 'Skiing with Josh',
    '2722': 'Tahoe 2024',
    '2942': 'Golf with Dad',
    '3741': 'THe Weeknd',
    '5256': 'Climbing',
    '5587': 'Bingsoo in Korea',
    '6078': 'Golf with Renn',
    '6115': 'My Dynamic Duo',
    '6392': 'Summer Volleyball 2025',
    '6486': 'Justin my day one',
    '6822': 'Senior Ditch Day',
    '6948': 'Seoul, Korea',
    '7144': 'Steven and Justin',
    '8070': 'Airport before Korea',
    '8178': 'KKBQ in Korea',
    '8385': 'Korea Senior trip 2025',
    '8470': 'Waterfall Cafe in Korea',
    '8967': 'Korea Senior trip 2025',
    '9126': 'Asakusa, Tokyo',
    '9326': 'One Piece Store',
    '9332': 'Lots of Manga',
    '9346': 'Shibuya, Tokyo',
    '9984': 'Sushi in Japan',
    'DSCN0180_Original': 'Cody Retreat 2025',
  };

  // MANUAL DIMENSIONS: Edit this object to set custom dimensions for specific photos
  // Use the base filename (without extension) as the key
  // Landscape = wider than tall (e.g., 240x180)
  // Portrait = taller than wide (e.g., 180x240)
  // Square = equal dimensions (e.g., 200x200)
  const customDimensions: Record<string, { width: number; height: number; className: string }> = {
    '1555': { width: 240, height: 180, className: 'w-[240px] h-[180px]' }, // Minamino - horizontal
    'DSCN0180': { width: 280, height: 200, className: 'w-[280px] h-[200px]' }, // Cody Retreat 2025 - horizontal and bigger
    '2530': { width: 240, height: 300, className: 'w-[240px] h-[300px]' }, // Beach - bigger
  };

  // All image files from personalityv2 folder
  const photoFiles = [
    '3J8A4081.JPEG',
    '70DEFB56-B293-4825-B062-C8EC64F72DC7.JPG',
    'DSC03021.JPEG',
    'DSC06955.JPG',
    'DSCN0180_Original.jpg',
    'IMG_0071.PNG',
    'IMG_0200.png',
    'IMG_0435.png',
    'IMG_0528.png',
    'IMG_0534.png',
    'IMG_0850.png',
    'IMG_1167.png',
    'IMG_1432.png',
    'IMG_1555.png',
    'IMG_1598.png',
    'IMG_1638.png',
    'IMG_1658.jpg',
    'IMG_1912.png',
    'IMG_1937.png',
    'IMG_2530.png',
    'IMG_2637 (1).png',
    'IMG_2722.png',
    'IMG_2942.png',
    'IMG_3018.JPG',
    'IMG_3706.jpg',
    'IMG_3741.png',
    'IMG_5256.png',
    'IMG_5587.png',
    'IMG_6078.png',
    'IMG_6115 2.png',
    'IMG_6392.png',
    'IMG_6486.png',
    'IMG_6822.png',
    'IMG_6948.png',
    'IMG_7144.png',
    'IMG_7700_Original.jpg',
    'IMG_8070.png',
    'IMG_8178.png',
    'IMG_8385.png',
    'IMG_8470.png',
    'IMG_8967.png',
    'IMG_9126.png',
    'IMG_9326.png',
    'IMG_9332.png',
    'IMG_9346.png',
    'IMG_9984.png',
  ];

  return photoFiles.map((filename) => {
    // Extract base name for tagging
    let baseName = filename.split('.')[0];
    
    // Handle special cases
    if (baseName.startsWith('IMG_')) {
      baseName = baseName.split('_')[1].split(' ')[0]; // Get number part, remove (1) or "2" suffixes
    } else if (baseName.startsWith('DSC')) {
      baseName = baseName; // Keep full name for DSC files
    } else if (baseName.startsWith('70DEFB56')) {
      baseName = '70DEFB56';
    } else if (baseName.startsWith('3J8A')) {
      baseName = '3J8A4081';
    } else if (baseName === 'DSCN0180_Original') {
      baseName = 'DSCN0180';
    }
    
    const tag = photoTags[baseName] || 'Memories';
    const customSize = customDimensions[baseName];
    
    return {
      src: `/personalityv2/${filename}`,
      alt: `Photo ${baseName}`,
      tag,
      customSize,
    };
  });
};

// Get varied sizes for photos
const getPhotoSize = (
  index: number, 
  row: number, 
  customSize?: { width: number; height: number; className: string }
): { width: number; height: number; className: string } => {
  // Use custom size if provided, otherwise use default row-based sizing
  if (customSize) {
    return customSize;
  }

  // Different size patterns for each row
  const rowSizes = [
    // Row 1 - Small to medium
    [
      { width: 150, height: 200, className: 'w-[150px] h-[200px]' },
      { width: 180, height: 180, className: 'w-[180px] h-[180px]' },
      { width: 160, height: 220, className: 'w-[160px] h-[220px]' },
      { width: 170, height: 170, className: 'w-[170px] h-[170px]' },
      { width: 140, height: 190, className: 'w-[140px] h-[190px]' },
    ],
    // Row 2 - Medium
    [
      { width: 200, height: 200, className: 'w-[200px] h-[200px]' },
      { width: 180, height: 240, className: 'w-[180px] h-[240px]' },
      { width: 220, height: 180, className: 'w-[220px] h-[180px]' },
      { width: 190, height: 200, className: 'w-[190px] h-[200px]' },
      { width: 170, height: 220, className: 'w-[170px] h-[220px]' },
    ],
    // Row 3 - Medium to large
    [
      { width: 160, height: 200, className: 'w-[160px] h-[200px]' },
      { width: 200, height: 260, className: 'w-[200px] h-[260px]' },
      { width: 180, height: 180, className: 'w-[180px] h-[180px]' },
      { width: 210, height: 220, className: 'w-[210px] h-[220px]' },
      { width: 150, height: 210, className: 'w-[150px] h-[210px]' },
    ],
    // Row 4 - Small to medium
    [
      { width: 170, height: 180, className: 'w-[170px] h-[180px]' },
      { width: 190, height: 230, className: 'w-[190px] h-[230px]' },
      { width: 160, height: 210, className: 'w-[160px] h-[210px]' },
      { width: 200, height: 200, className: 'w-[200px] h-[200px]' },
      { width: 180, height: 190, className: 'w-[180px] h-[190px]' },
    ],
    // Row 5 - Small
    [
      { width: 140, height: 180, className: 'w-[140px] h-[180px]' },
      { width: 160, height: 200, className: 'w-[160px] h-[200px]' },
      { width: 150, height: 190, className: 'w-[150px] h-[190px]' },
      { width: 170, height: 170, className: 'w-[170px] h-[170px]' },
      { width: 160, height: 210, className: 'w-[160px] h-[210px]' },
    ],
    // Row 6 - Small to medium
    [
      { width: 150, height: 200, className: 'w-[150px] h-[200px]' },
      { width: 180, height: 180, className: 'w-[180px] h-[180px]' },
      { width: 160, height: 220, className: 'w-[160px] h-[220px]' },
      { width: 170, height: 170, className: 'w-[170px] h-[170px]' },
      { width: 140, height: 190, className: 'w-[140px] h-[190px]' },
    ],
  ];
  
  const sizes = rowSizes[row % rowSizes.length];
  return sizes[index % sizes.length];
};

export default function PhotoCollage() {
  const [photos] = useState<Photo[]>(getPersonalityPhotos());
  const [hoveredIndex, setHoveredIndex] = useState<{ row: number; index: number } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split photos into 4 rows
  const numRows = 4;
  const photosPerRow = Math.ceil(photos.length / numRows);
  const rows: Photo[][] = [];
  
  for (let i = 0; i < numRows; i++) {
    const start = i * photosPerRow;
    const end = Math.min(start + photosPerRow, photos.length);
    if (start < photos.length) {
      rows.push(photos.slice(start, end));
    }
  }

  return (
    <div className="relative w-full space-y-3 md:space-y-4">
      {/* Multiple Rows with Different Scroll Directions */}
      {rows.map((rowPhotos, rowIndex) => {
        // Duplicate photos multiple times for seamless infinite scroll
        // Using 6 copies to ensure smooth continuous scrolling with no visible reset
        const duplicatedRowPhotos = [...rowPhotos, ...rowPhotos, ...rowPhotos, ...rowPhotos, ...rowPhotos, ...rowPhotos];
        const isReverse = rowIndex % 2 === 1; // Alternate scroll directions
        
        return (
          <div 
            key={rowIndex}
            className="relative h-[240px] md:h-[320px] overflow-x-hidden overflow-y-visible"
          >
            <div 
              className={`flex gap-3 md:gap-4 h-full items-center ${
                isReverse ? 'animate-scroll-reverse' : 'animate-scroll-fast'
              }`}
              style={{
                width: 'fit-content',
              }}
            >
              {duplicatedRowPhotos.map((photo, index) => {
                const originalIndex = index % rowPhotos.length;
                const isHovered = hoveredIndex?.row === rowIndex && hoveredIndex?.index === originalIndex;
                const size = getPhotoSize(originalIndex, rowIndex, photo.customSize);
                
                return (
                  <div
                    key={`photo-${rowIndex}-${index}`}
                    className={`group relative flex-shrink-0 ${size.className} rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:border-white/40 hover:z-10 overflow-hidden`}
                    onMouseEnter={() => setHoveredIndex({ row: rowIndex, index: originalIndex })}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 180px, 220px"
                      onError={(e) => {
                        // Hide image if it fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Tag on Hover */}
                    {isHovered && photo.tag && (
                      <div className="absolute bottom-3 left-3 right-3 z-20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="rounded-lg bg-black/80 backdrop-blur-md border border-white/30 px-3 py-2 shadow-xl">
                          <p className="text-white text-sm font-semibold">{photo.tag}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Floating Tag Tooltip (for mobile tap) */}
      {hoveredIndex !== null && rows[hoveredIndex.row]?.[hoveredIndex.index]?.tag && (
        <div
          className="fixed pointer-events-none z-50 md:hidden"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y - 40}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="rounded-lg bg-black/90 backdrop-blur-md border border-white/30 px-3 py-2 shadow-xl">
            <p className="text-white text-sm font-semibold">{rows[hoveredIndex.row][hoveredIndex.index].tag}</p>
          </div>
        </div>
      )}
    </div>
  );
}

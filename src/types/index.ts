export interface MRIScan {
  id: string;
  filename: string;
  uploadedAt: Date;
  thumbnailUrl: string;
  fullImageUrl: string;
  format: 'DICOM' | 'JPG' | 'PNG';
  size: number;
  analysisStatus: 'pending' | 'analyzing' | 'completed' | 'failed';
  analysisResult?: AnalysisResult;
}

export interface AnalysisResult {
  id: string;
  scanId: string;
  timestamp: Date;
  findings: {
    summary: string;
    anatomy: AnatomySection[];
    abnormalities: Finding[];
    recommendations: string[];
  };
  segmentation?: {
    overlayUrl: string;
    regions: SegmentedRegion[];
  };
  confidence: number;
}

export interface AnatomySection {
  name: string;
  description: string;
  normalFindings: boolean;
}

export interface Finding {
  type: 'normal' | 'abnormal' | 'uncertain';
  location: string;
  description: string;
  severity?: 'mild' | 'moderate' | 'severe';
}

export interface SegmentedRegion {
  id: string;
  name: string;
  color: string;
  coordinates: number[][];
}

export interface TavilyAPIResponse {
  success: boolean;
  data?: {
    findings: {
      summary: string;
      details: any[];
    };
    segmentation?: {
      overlay_url: string;
      regions: any[];
    };
    confidence_score: number;
  };
  error?: string;
}

// Chat-related types
export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  scanId?: string;
}

export interface ChatSession {
  id: string;
  scanId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

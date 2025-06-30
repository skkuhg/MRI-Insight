'use client';

import React, { useState } from 'react';
import { UploadZone } from '@/components/upload/UploadZone';
import { ScanGallery } from '@/components/gallery/ScanGallery';
import { ResultsPanel } from '@/components/analysis/ResultsPanel';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Modal } from '@/components/ui/Modal';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';
import { MRIScan } from '@/types';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const [scans, setScans] = useState<MRIScan[]>([]);
  const [selectedScan, setSelectedScan] = useState<MRIScan | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleFilesAccepted = async (files: File[]) => {
    setIsAnalyzing(true);
    
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/analyze', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        // Parse dates from strings since JSON doesn't preserve Date objects
        if (result.scan) {
          result.scan.uploadedAt = new Date(result.scan.uploadedAt);
          if (result.scan.analysisResult) {
            result.scan.analysisResult.timestamp = new Date(result.scan.analysisResult.timestamp);
          }
        }
        
        if (result.success && result.scan) {
          setScans(prev => [...prev, result.scan]);
        } else if (result.scan && !result.success) {
          // Even failed scans should be added to show user what happened
          setScans(prev => [...prev, result.scan]);
        } else {
          console.error('Analysis failed:', result.error);
          // Add a generic failed scan for user feedback
          const failedScan: MRIScan = {
            id: crypto.randomUUID(),
            filename: file.name,
            uploadedAt: new Date(),
            thumbnailUrl: '',
            fullImageUrl: '',
            format: file.name.endsWith('.dcm') ? 'DICOM' : 
                    file.type.includes('png') ? 'PNG' : 'JPG',
            size: file.size,
            analysisStatus: 'failed',
          };
          setScans(prev => [...prev, failedScan]);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!selectedScan?.id) return;
    
    // For now, just show alert - PDF generation would be implemented here
    alert('PDF report generation would be implemented here');
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleFloatingChatClick = () => {
    // If there's a selected scan, keep it; otherwise use the most recent scan
    if (!selectedScan && scans.length > 0) {
      setSelectedScan(scans[scans.length - 1]);
    }
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-medical-dark transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                MRI Insight
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered MRI analysis platform
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Upload Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upload MRI Scans
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span>Upload scans to ask AI questions about them</span>
              </div>
            </div>
            <UploadZone onFilesAccepted={handleFilesAccepted} />
            
            {isAnalyzing && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-medical-primary border-t-transparent"></div>
                  <span className="text-gray-600 dark:text-gray-400">Analyzing scans...</span>
                </div>
              </div>
            )}
          </section>

          {/* Gallery Section */}
          {scans.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Your Scans
              </h2>
              <ScanGallery 
                scans={scans} 
                onScanSelect={setSelectedScan}
              />
            </section>
          )}
        </motion.div>
      </main>

      {/* Results Modal */}
      <Modal
        isOpen={!!selectedScan}
        onClose={() => setSelectedScan(null)}
        title="MRI Analysis"
      >
        {selectedScan ? (
          selectedScan.analysisResult ? (
            <ResultsPanel
              result={selectedScan.analysisResult}
              onDownloadReport={handleDownloadReport}
              onOpenChat={handleOpenChat}
              scanFilename={selectedScan.filename}
            />
          ) : (
            <div className="p-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {selectedScan.analysisStatus === 'failed' 
                  ? 'Analysis failed. Please try uploading again.'
                  : selectedScan.analysisStatus === 'analyzing'
                  ? 'Analysis in progress...'
                  : 'No analysis results available for this scan.'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Status: {selectedScan.analysisStatus}
              </p>
            </div>
          )
        ) : (
          <div className="p-4">
            <p>No scan selected</p>
          </div>
        )}
      </Modal>

      {/* Chat Modal */}
      {selectedScan && (
        <ChatInterface
          scanId={selectedScan.id}
          scanFilename={selectedScan.filename}
          isOpen={isChatOpen}
          onClose={handleCloseChat}
        />
      )}

      {/* Floating Chat Button */}
      <FloatingChatButton 
        onClick={handleFloatingChatClick}
        scansCount={scans.length}
      />
    </div>
  );
}

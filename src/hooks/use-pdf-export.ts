import { useState } from 'react';
import { PDFGenerator, generateCheatsheetContent, generateLabReportContent, ProfilePDFData } from '@/lib/pdf/generator';

export const usePDFExport = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const exportCheatsheet = async (cheatsheetData: any) => {
    setIsGenerating(true);
    try {
      const generator = new PDFGenerator();
      const content = generateCheatsheetContent(cheatsheetData);
      generator.generateCheatsheetPDF(content);
    } catch (error) {
      console.error('Error generating cheatsheet PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportLabReport = async (labData: any) => {
    setIsGenerating(true);
    try {
      const generator = new PDFGenerator();
      const content = generateLabReportContent(labData);
      generator.generateLabReportPDF(content);
    } catch (error) {
      console.error('Error generating lab report PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportProfile = async (profileData: ProfilePDFData) => {
    setIsGenerating(true);
    try {
      const generator = new PDFGenerator();
      generator.generateProfilePDF(profileData);
    } catch (error) {
      console.error('Error generating profile PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportDeepDive = async (deepDiveData: any) => {
    setIsGenerating(true);
    try {
      // Use window.print() for now as a simple PDF export
      window.print();
    } catch (error) {
      console.error('Error generating deep dive PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    exportCheatsheet,
    exportLabReport,
    exportProfile,
    exportDeepDive
  };
};

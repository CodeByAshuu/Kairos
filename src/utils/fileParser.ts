// Remove pdf-parse and use a different approach for PDF parsing
import * as mammoth from 'mammoth';

// For PDF parsing in the browser, we'll use a simple text extraction
export const parseFile = async (file: File): Promise<string> => {
  if (file.type === 'application/pdf') {
    return parsePdfBasic(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return parseDocx(file);
  } else if (file.type === 'text/plain') {
    return parseText(file);
  } else {
    throw new Error('Unsupported file type');
  }
};

const parsePdfBasic = async (file: File): Promise<string> => {
  // Simple text extraction using FileReader
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // Extract text content (this is a basic implementation)
      resolve(text.substring(0, 10000)); // Limit to avoid performance issues
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const parseDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const parseText = async (file: File): Promise<string> => {
  return await file.text();
};
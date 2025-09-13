// src/utils/fileParser.ts
import pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';

export const parseFile = async (file: File): Promise<string> => {
  if (file.type === 'application/pdf') {
    return parsePdf(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return parseDocx(file);
  } else if (file.type === 'text/plain') {
    return parseText(file);
  } else {
    throw new Error('Unsupported file type');
  }
};

const parsePdf = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  // Convert ArrayBuffer to Buffer for pdf-parse
  const buffer = Buffer.from(arrayBuffer);
  const result = await pdfParse(buffer);
  return result.text;
};

const parseDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const parseText = async (file: File): Promise<string> => {
  return await file.text();
};